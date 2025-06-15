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
    public function verify(Request $request)
    {
        $reference = $request->query('reference');

        if (!$reference) {
            return redirect('/')->with('error', 'Missing payment reference.');
        }

        $response = Http::withToken(env('PAYSTACK_SECRET_KEY'))
            ->get("https://api.paystack.co/transaction/verify/{$reference}");

        $data = $response->json();

        if (!$data['status']) {
            return redirect('/')->with('error', 'Payment verification failed.');
        }

        $orderReference = $data['data']['metadata']['order_id'] ?? null;

        if (!$orderReference) {
            return redirect('/')->with('error', 'Order reference missing in metadata.');
        }

        $order = Order::where('order_id', $orderReference)->first();

        if (!$order) {
            return redirect('/')->with('error', 'Order not found.');
        }

        $order->update([
            'payment_status' => 'paid',
        ]);

        // Optionally record the payment
        Payment::create([
            'order_id'         => $order->id,
            'reference'        => $reference,
            'amount'           => $data['data']['amount'] / 100, // kobo to Naira
            'channel'          => $data['data']['channel'],
            'currency'         => $data['data']['currency'],
            'status'           => $data['data']['status'],
            'paid_at'          => $data['data']['paid_at'],
        ]);

        return redirect('/thank-you')->with('success', 'Payment successful!');
    }
}
