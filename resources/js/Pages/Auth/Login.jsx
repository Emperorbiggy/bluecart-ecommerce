import { Link } from '@inertiajs/react';
import { useState } from 'react';
import { Eye, EyeOff, Mail, Lock } from 'lucide-react';
import { login } from '@/utils/api';

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const togglePassword = () => setShowPassword(!showPassword);

  const [form, setForm] = useState({ email: '', password: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setErrors({});

    try {
      await login(form); // 🔥 Use the shared login logic
    } catch (err) {
      if (err.response?.data?.errors) {
        setErrors(err.response.data.errors);
      } else {
        setErrors({ general: 'Invalid credentials or server error' });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row font-sans">
      {/* Left Side */}
      <div
        className="hidden md:flex md:w-1/2 bg-cover bg-center relative"
        style={{
          backgroundImage:
            "url('https://images.unsplash.com/photo-1513094735237-8f2714d57c13?q=80&w=1935&auto=format&fit=crop')",
        }}
      >
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center text-center p-10">
          <div>
            <h2 className="text-white text-4xl font-bold mb-4">Welcome Back</h2>
            <p className="text-white text-lg">
              Log in to access exclusive deals and manage your account.
            </p>
          </div>
        </div>
      </div>

      {/* Right Side */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gradient-to-br from-[#eef4ff] via-[#f6faff] to-[#f0f7ff] p-8">
        <div className="bg-white/90 backdrop-blur-md shadow-xl rounded-2xl w-full max-w-md p-8 border border-blue-100">
          <h2 className="text-3xl font-bold text-osunblue mb-6 text-center">Log In</h2>

          <form onSubmit={handleSubmit} className="space-y-5">
            {errors.general && (
              <div className="text-red-500 text-sm text-center">{errors.general}</div>
            )}

            {/* Email */}
            <div className="relative">
              <Mail className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={form.email}
                onChange={handleChange}
                className="w-full pl-10 pr-4 py-3 rounded-lg border text-sm focus:ring-2 focus:ring-osunblue focus:outline-none bg-white"
              />
              {errors.email && (
                <div className="text-red-500 text-sm mt-1">{errors.email}</div>
              )}
            </div>

            {/* Password */}
            <div className="relative">
              <Lock className="absolute left-3 top-3.5 text-gray-400" size={20} />
              <input
                type={showPassword ? 'text' : 'password'}
                name="password"
                placeholder="Password"
                value={form.password}
                onChange={handleChange}
                className="w-full pl-10 pr-10 py-3 rounded-lg border text-sm focus:ring-2 focus:ring-osunblue focus:outline-none bg-white"
              />
              <span
                className="absolute right-3 top-3.5 text-gray-400 cursor-pointer"
                onClick={togglePassword}
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </span>
              {errors.password && (
                <div className="text-red-500 text-sm mt-1">{errors.password}</div>
              )}
            </div>

            {/* Forgot Password */}
            <div className="text-right text-sm">
              <Link href="/forgot-password" className="text-osunblue hover:underline font-medium">
                Forgot Password?
              </Link>
            </div>

            {/* Submit */}
            <button
              type="submit"
              disabled={loading}
              className="w-full bg-osunblue text-white py-3 rounded-lg hover:bg-osunblue-700 transition font-semibold"
            >
              {loading ? 'Logging in...' : 'Log In'}
            </button>
          </form>

          {/* Register */}
          <p className="text-center text-sm text-gray-600 mt-6">
            Don’t have an account?{' '}
            <Link href="/register" className="text-osunblue hover:underline font-medium">
              Sign Up
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
