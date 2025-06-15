import React, { useState, useEffect } from 'react';
import { FaGoogle, FaFacebookF } from 'react-icons/fa';
import { useCart } from '@/contexts/CartContext';
import AppLayout from '../Layouts/AppLayout';
import { fetchCurrentUser, createOrder, verifyPayment } from '@/utils/api';

export default function CheckoutPage() {
  const [paymentMethod, setPaymentMethod] = useState('paystack');
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const { cart, clearCart } = useCart();
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [showFailedModal, setShowFailedModal] = useState(false);
  const [orderId, setOrderId] = useState(null);

  const subtotal = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const vat = Math.round(subtotal * 0.075);
  const total = subtotal + vat;

  useEffect(() => {
    const searchParams = new URLSearchParams(window.location.search);
    const reference = searchParams.get('reference');
    if (reference) {
      (async () => {
        try {
          const result = await verifyPayment(reference);
          if (result.status === 'success') {
            setOrderId(result.order_id || 'N/A');
            setShowSuccessModal(true);
            clearCart();
          } else {
            setShowFailedModal(true);
          }
        } catch (err) {
          console.error('Payment verification failed:', err);
          setShowFailedModal(true);
        }
      })();
    }
  }, []);

  useEffect(() => {
    const getUser = async () => {
      try {
        const res = await fetchCurrentUser();
        setCurrentUser(res.user);
      } catch (error) {
        console.warn('No user logged in');
      } finally {
        setLoading(false);
      }
    };
    getUser();
  }, []);

  const handleCheckout = async () => {
  if (!currentUser) return alert('Please log in or register first.');
  if (cart.length === 0) return alert('Your cart is empty.');

  const items = cart.map(item => ({
    product_id: item.id,
    quantity: item.quantity,
    price: item.price,
  }));

  try {
    const response = await createOrder({
      items,
      paymentMethod,
      vat,
      totalPrice: total,
    });

    // Save order data to localStorage for post-payment reference
    localStorage.setItem('checkout_order', JSON.stringify({
      orderId: response?.order?.order_id || null,
      userEmail: currentUser.email,
      userPhone: currentUser.phone,
      timestamp: Date.now(),
    }));

    if (paymentMethod === 'paystack') {
      const paymentUrl = response?.payment_url || response?.data?.payment_url;

      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        alert('Failed to redirect to Paystack.');
        console.log('Payment URL not found in response:', response);
      }
    } else {
      setOrderId(response?.order?.order_id || 'N/A');
      setShowSuccessModal(true);
      clearCart();
    }
  } catch (err) {
    console.error(err);
    alert('An error occurred while placing the order.');
  }
};


  if (loading) return <div className="text-center py-20">Loading checkout...</div>;

  return (
    <section className="max-w-7xl mx-auto px-4 py-16">
      <h1 className="text-3xl font-bold text-[#130447] mb-10">Checkout</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
        <div className="lg:col-span-2 bg-white p-6 shadow rounded-md">
          {!currentUser ? (
            <div className="text-gray-600">Please log in to continue checkout.</div>
          ) : (
            <>
              <h2 className="text-xl font-semibold text-[#130447] mb-4">Billing Details</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input disabled className="w-full border px-4 py-2 rounded-md" value={currentUser.name || ''} />
                <input disabled className="w-full border px-4 py-2 rounded-md" value={currentUser.email || ''} />
                {(() => {
                  const parts = currentUser.billing_address?.split(',') || [];
                  const filteredAddress = parts.filter((_, i) => i !== 2).join(',').trim();
                  const removedState = parts[2]?.trim() || '';
                  return (
                    <>
                      <input
                        disabled
                        className="w-full border px-4 py-2 rounded-md md:col-span-2"
                        value={filteredAddress}
                      />
                      <input
                        disabled
                        className="w-full border px-4 py-2 rounded-md"
                        value={removedState}
                      />
                    </>
                  );
                })()}
                <input disabled className="w-full border px-4 py-2 rounded-md" value={currentUser.phone || ''} />
              </div>
            </>
          )}
        </div>

        <div className="bg-white p-6 shadow rounded-md">
          <h2 className="text-xl font-bold text-[#130447] mb-4">Order Summary</h2>
          <div className="space-y-3 text-gray-700">
            <div className="flex justify-between">
              <span>Subtotal</span>
              <span>₦{subtotal.toLocaleString()}</span>
            </div>
            <div className="flex justify-between">
              <span>VAT (7.5%)</span>
              <span>₦{vat.toLocaleString()}</span>
            </div>
            <hr />
            <div className="flex justify-between font-bold text-[#130447] text-lg">
              <span>Total</span>
              <span>₦{total.toLocaleString()}</span>
            </div>
          </div>

          <div className="mt-6">
            <label className="block text-sm font-medium text-gray-700 mb-1">Payment Method</label>
            <select
              value={paymentMethod}
              onChange={e => setPaymentMethod(e.target.value)}
              className="w-full border px-4 py-2 rounded-md"
            >
              <option value="paystack">Pay with Paystack</option>
              <option value="cod">Cash on Delivery</option>
            </select>
          </div>

          <button
            onClick={handleCheckout}
            className="mt-6 w-full bg-[#130447] text-white py-3 rounded-md hover:bg-[#0f0334] transition shadow-md text-lg font-semibold"
          >
            Confirm & Pay
          </button>
        </div>
      </div>

      {/* Success Modal */}
      {showSuccessModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-center">
            <h2 className="text-2xl font-bold text-green-600 mb-2">Order Placed Successfully!</h2>
            <p className="text-gray-700 mb-4">Thank you for your order.</p>
            <p className="text-sm mb-2"><strong>Order ID:</strong> {orderId}</p>
            <p className="text-sm mb-4">
              We will contact you at <strong>{currentUser?.email}</strong> or <strong>{currentUser?.phone}</strong>.
            </p>
            <button
              onClick={() => window.location.href = '/dashboard'}
              className="bg-[#130447] text-white px-4 py-2 rounded-md mt-4 hover:bg-[#0f0334]"
            >
              Go to Dashboard
            </button>
          </div>
        </div>
      )}

      {/* Failed Modal */}
      {showFailedModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-60">
          <div className="bg-white rounded-lg shadow-lg max-w-md w-full p-6 text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-2">Payment Failed!</h2>
            <p className="text-gray-700 mb-4">We couldn’t verify your payment. Please try again.</p>
            <button
              onClick={() => setShowFailedModal(false)}
              className="bg-red-600 text-white px-4 py-2 rounded-md mt-4 hover:bg-red-700"
            >
              Close
            </button>
          </div>
        </div>
      )}
    </section>
  );
}

CheckoutPage.layout = page => <AppLayout>{page}</AppLayout>;
