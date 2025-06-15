<?php

namespace App\Services;

use App\Models\Order;
use App\Models\Payment;
use Illuminate\Support\Str;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Log;

class PaymentService
{
    protected $paystackSecret;

    public function __construct()
    {
        $this->paystackSecret = config('services.paystack.secret');
    }

    /**
     * Initialize Paystack payment
     */
    public function initializePaystack(Order $order)
    {
        $reference = Str::uuid()->toString();

        $payment = Payment::create([
            'order_id' => $order->id,
            'user_id' => $order->user_id,
            'amount' => $order->total_price,
            'status' => 'pending',
            'reference' => $reference,
        ]);

        try {
            $payload = [
                'email' => $order->user->email,
                'amount' => $order->total_price * 100,
                'reference' => $reference,
                'callback_url' => route('payments.verify'),
                'metadata' => [
                    'order_id' => $order->order_id,
                    'user_id' => $order->user_id,
                ],
            ];

            Log::info('Initializing Paystack payment', ['payload' => $payload]);

            $response = Http::withToken($this->paystackSecret)
                ->post('https://api.paystack.co/transaction/initialize', $payload);

            Log::info('Paystack initialize response', ['response' => $response->json()]);

            if (!$response->ok()) {
                $payment->update(['status' => 'failed']);
                Log::error('Paystack initialization failed', ['response' => $response->body()]);
                throw new \Exception('Paystack Initialization Failed.');
            }

            $data = $response->json();

            return [
                'payment' => $payment,
                'authorization_url' => $data['data']['authorization_url'],
            ];
        } catch (\Throwable $e) {
            Log::error('Exception during Paystack initialization', [
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw $e;
        }
    }

    /**
     * Verify a Paystack payment
     */
    public function verifyPaystack(string $reference)
    {
        try {
            Log::info('Verifying Paystack payment', ['reference' => $reference]);

            $payment = Payment::where('reference', $reference)->firstOrFail();

            $response = Http::withToken($this->paystackSecret)
                ->get("https://api.paystack.co/transaction/verify/{$reference}");

            Log::info('Paystack verify response', ['response' => $response->json()]);

            if (!$response->ok()) {
                Log::error('Paystack verification failed', ['response' => $response->body()]);
                throw new \Exception('Payment verification failed.');
            }

            $data = $response->json();

            if ($data['data']['status'] !== 'success') {
                $payment->update(['status' => 'failed']);
                Log::warning('Payment was not successful', ['status' => $data['data']['status']]);
                return ['success' => false, 'message' => 'Payment not successful'];
            }

            $payment->update([
                'status' => 'completed',
                'payment_reference' => $data['data']['reference'],
                'paid_at' => $data['data']['paid_at'] ?? now(),
            ]);

            $payment->order->update(['payment_status' => 'paid']);

            Log::info('Payment verified and order marked as paid', [
                'payment_id' => $payment->id,
                'order_id' => $payment->order->id,
            ]);

            return ['success' => true, 'message' => 'Payment verified successfully'];
        } catch (\Throwable $e) {
            Log::error('Exception during Paystack verification', [
                'reference' => $reference,
                'error' => $e->getMessage(),
                'trace' => $e->getTraceAsString(),
            ]);
            throw $e;
        }
    }

    /**
     * Handle Cash on Delivery (COD)
     */
    public function handleCOD(Order $order)
    {
        return Payment::create([
            'order_id' => $order->id,
            'user_id' => $order->user_id,
            'amount' => $order->total_price,
            'status' => 'cod',
            'reference' => 'COD-' . Str::random(10),
        ]);
    }
}
