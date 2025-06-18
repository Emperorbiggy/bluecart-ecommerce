<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Order;
use App\Models\OrderItem;
use Illuminate\Support\Facades\DB;
use App\Services\PaymentService;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use App\Models\Payment;

class OrderController extends Controller
{
    /**
     * Store a new order (checkout)
     */
    public function store(Request $request, PaymentService $paymentService)
    {
        $request->validate([
            'items'              => 'required|array',
            'items.*.product_id' => 'required|integer|exists:products,id',
            'items.*.quantity'   => 'required|integer|min:1',
            'items.*.unit_price' => 'required|numeric|min:0',
            'total_price'        => 'required|numeric|min:0',
            'vat'                => 'required|numeric|min:0',
            'payment_method'     => 'required|in:cod,paystack',
        ]);

        $user = auth()->user();

        DB::beginTransaction();

        try {
            // Create order
            $order = Order::create([
                'order_id'        => strtoupper('ORD-' . Str::random(10)),
                'user_id'         => $user->id,
                'total_price'     => $request->total_price,
                'vat'             => $request->vat,
                'payment_status'  => $request->payment_method === 'cod' ? 'pending' : 'initiated',
                'payment_method'  => $request->payment_method,
            ]);

            // Create order items
            foreach ($request->items as $item) {
                OrderItem::create([
                    'order_id'    => $order->id,
                    'product_id'  => $item['product_id'],
                    'quantity'    => $item['quantity'],
                    'unit_price'  => $item['unit_price'],
                    'total_price' => $item['quantity'] * $item['unit_price'],
                ]);
            }

            // Handle payment method
            if ($request->payment_method === 'cod') {
                $paymentService->handleCOD($order);

                DB::commit();

                return response()->json([
                    'success' => true,
                    'message' => 'Order placed successfully (Cash on Delivery).',
                    'order'   => $order->load('items'),
                ]);
            }

            // Handle Paystack
            $result = $paymentService->initializePaystack($order);

            DB::commit();

            return response()->json([
                'success'      => true,
                'message'      => 'Proceed to Paystack payment.',
                'order'        => $order->load('items'),
                'payment'      => $result['payment'],
                'payment_url'  => $result['authorization_url'],
            ]);
        } catch (\Throwable $e) {
            DB::rollBack();

            return response()->json([
                'success' => false,
                'message' => 'Checkout failed: ' . $e->getMessage(),
            ], 500);
        }
    }

    /**
     * Get all orders for the authenticated user
     */
    public function index()
    {
        $orders = auth()->user()
            ->orders()
            ->with('items.product', 'payment')
            ->orderByDesc('created_at')
            ->get();

        return response()->json([
            'success' => true,
            'orders'  => $orders,
        ]);
    }

    /**
     * Verify Paystack payment
     */
    public function verify(Request $request, PaymentService $paymentService)
{
    $reference = $request->input('reference');

    if (!$reference) {
        return response()->json([
            'status' => false,
            'message' => 'Missing payment reference.',
        ], 400);
    }

    try {
        $result = $paymentService->verifyPaystack($reference);

        if (!$result['success']) {
            return response()->json([
                'status' => false,
                'message' => $result['message'] ?? 'Verification failed.',
            ], 400);
        }

        // Get the payment and associated order
        $payment = \App\Models\Payment::where('reference', $reference)->first();
        $order = $payment?->order;

        // ✅ If order exists and verification successful, update order status to Processing
        if ($order) {
            $order->update([
                'status' => 'Processing',
            ]);
        }

        return response()->json([
            'status'   => 'success',
            'message'  => $result['message'],
            'order_id' => $order->order_id ?? null,
            'payment'  => $payment,
            'order'    => $order,
        ]);
    } catch (\Throwable $e) {
        \Log::error('Error in payment verification controller', [
            'reference' => $reference,
            'error' => $e->getMessage(),
        ]);

        return response()->json([
            'status' => false,
            'message' => 'An error occurred during payment verification.',
        ], 500);
    }
}
public function allOrders()
{
    $orders = \App\Models\Order::with(['user', 'items.product'])->latest()->get();

    return response()->json([
        'success' => true,
        'orders' => $orders,
    ]);
}
public function updateStatus(Request $request, $orderId)
{
    // Validate status field
    $request->validate([
        'status' => 'required|string|in:pending,processing,completed,rejected,approved,refunded',
    ]);

    // Find the order by ID
    $order = Order::findOrFail($orderId);

    // Update the order status
    $order->status = $request->status;

    // If status is 'completed' and payment method is COD
    if ($request->status === 'completed' && $order->payment_method === 'cod') {
        // Update related payment status
        $payment = $order->payment; // Assumes you have $order->payment() relationship
        if ($payment) {
            $payment->status = 'completed';
            $payment->save();
        }

        // Also mark the order's payment_status as paid
        $order->payment_status = 'paid';
    }

    // Save the updated order
    $order->save();

    return response()->json([
        'success' => true,
        'message' => 'Order status updated successfully.',
        'order' => $order->load('items', 'user', 'payment'), // preload if needed
    ]);
}


public function all()
{
    $payments = \App\Models\Payment::with(['user:id,name', 'order:id,order_id'])
    ->latest()
    ->get()
    ->map(function ($payment) {
        return [
            'id'         => $payment->id,
            'reference'  => $payment->reference,
            'amount'     => $payment->amount,
            'status'     => $payment->status,
            'method'     => $payment->method,
            'date'       => $payment->created_at->toDateTimeString(),
            'user_name'  => $payment->user->name ?? 'Unknown',
            'order_id'   => $payment->order->order_id ?? 'N/A',
        ];
    });


    return response()->json([
        'success'  => true,
        'payments' => $payments,
    ]);
}


}
