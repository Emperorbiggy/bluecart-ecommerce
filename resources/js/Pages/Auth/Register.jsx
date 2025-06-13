import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock, User, MapPin, Phone } from 'lucide-react';

export default function Register() {
  const [step, setStep] = useState(1);
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
    phone: '',
    address: '',
    state: '',
    city: '',
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleNext = (e) => {
    e.preventDefault();
    if (step === 1) {
      // Optional validation before moving to step 2
      if (!form.name || !form.email || !form.password || !form.confirmPassword) {
        alert('Please fill in all personal details.');
        return;
      }
      if (form.password !== form.confirmPassword) {
        alert('Passwords do not match.');
        return;
      }
      setStep(2);
    } else {
      // Submit the form
      alert('Form submitted: ' + JSON.stringify(form, null, 2));
      // You can replace this with Inertia post call
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Left Side Image */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://plus.unsplash.com/premium_photo-1683121263622-664434494177?q=80&w=1976&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center p-10">
          <div>
            <h2 className="text-white text-4xl font-bold mb-4">Welcome to BlueCart</h2>
            <p className="text-white text-lg">Shop the best deals at your fingertips!</p>
          </div>
        </div>
      </div>

      {/* Right Side Form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-gray-100">
        <div className="bg-white shadow-lg rounded-xl w-full max-w-md p-8">
          <h2 className="text-3xl font-bold text-osunblue mb-6 text-center">
            {step === 1 ? 'Create Your Account' : 'Billing Information'}
          </h2>

          <form onSubmit={handleNext} className="space-y-5">
            {step === 1 && (
              <>
                {/* Full Name */}
                <div className="relative">
                  <User className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="name"
                    value={form.name}
                    onChange={handleChange}
                    placeholder="Full Name"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm focus:ring-2 focus:ring-osunblue focus:outline-none"
                  />
                </div>

                {/* Email */}
                <div className="relative">
                  <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="email"
                    name="email"
                    value={form.email}
                    onChange={handleChange}
                    placeholder="Email Address"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm focus:ring-2 focus:ring-osunblue focus:outline-none"
                  />
                </div>

                {/* Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="password"
                    value={form.password}
                    onChange={handleChange}
                    placeholder="Password"
                    className="w-full pl-10 pr-10 py-3 rounded-lg border text-sm focus:ring-2 focus:ring-osunblue focus:outline-none"
                  />
                  <span
                    className="absolute right-3 top-3.5 text-gray-400 cursor-pointer"
                    onClick={togglePassword}
                  >
                    {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                  </span>
                </div>

                {/* Confirm Password */}
                <div className="relative">
                  <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    name="confirmPassword"
                    value={form.confirmPassword}
                    onChange={handleChange}
                    placeholder="Confirm Password"
                    className="w-full pl-10 pr-10 py-3 rounded-lg border text-sm focus:ring-2 focus:ring-osunblue focus:outline-none"
                  />
                </div>
              </>
            )}

            {step === 2 && (
              <>
                {/* Phone */}
                <div className="relative">
                  <Phone className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="tel"
                    name="phone"
                    value={form.phone}
                    onChange={handleChange}
                    placeholder="Phone Number"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm focus:ring-2 focus:ring-osunblue focus:outline-none"
                  />
                </div>

                {/* Address */}
                <div className="relative">
                  <MapPin className="absolute left-3 top-3.5 text-gray-400" size={20} />
                  <input
                    type="text"
                    name="address"
                    value={form.address}
                    onChange={handleChange}
                    placeholder="Address"
                    className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm focus:ring-2 focus:ring-osunblue focus:outline-none"
                  />
                </div>

                {/* State & City */}
                <div className="flex gap-4">
                  <input
                    type="text"
                    name="state"
                    value={form.state}
                    onChange={handleChange}
                    placeholder="State"
                    className="w-1/2 px-4 py-3 rounded-lg border text-sm focus:ring-2 focus:ring-osunblue focus:outline-none"
                  />
                  <input
                    type="text"
                    name="city"
                    value={form.city}
                    onChange={handleChange}
                    placeholder="City"
                    className="w-1/2 px-4 py-3 rounded-lg border text-sm focus:ring-2 focus:ring-osunblue focus:outline-none"
                  />
                </div>
              </>
            )}

            {/* Submit/Next Button */}
            <button
              type="submit"
              className="w-full bg-osunblue text-white py-3 rounded-lg hover:bg-osunblue-700 transition font-semibold"
            >
              {step === 1 ? 'Next' : 'Register'}
            </button>
          </form>

          <p className="text-center text-sm text-gray-600 mt-6">
            Already have an account?{' '}
            <Link href="/login" className="text-osunblue hover:underline font-medium">
              Sign in
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
