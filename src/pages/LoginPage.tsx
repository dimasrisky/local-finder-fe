import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import GradientPanel from "../components/GradientPanel";
import { authUtils } from "../utils/auth";

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [notification, setNotification] = useState<{
    type: 'success' | 'error';
    message: string;
  } | null>(null);

  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({ type, message });
    setTimeout(() => setNotification(null), 5000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!email || !password) {
      showNotification('error', 'Please fill in all fields');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/login`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email,
          password,
        }),
      });

      const data = await response.json();
      if (response.ok) {
        // Extract access token from response structure
        const token = data.data?.accessToken;

        // Store token in localStorage if provided
        if (token) {
          authUtils.setToken(token);
        }

        showNotification('success', 'Login successful! Redirecting to dashboard...');

        // Navigate to dashboard - ProtectedRoute will fetch user data
        navigate('/dashboard');
      } else {
        showNotification('error', data.message || 'Login failed. Please check your credentials.');
      }
    } catch {
      showNotification('error', 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2 items-stretch">
      {/* ── Left: gradient panel ── */}
      <GradientPanel>
        {/* Logo top-left */}
        <Logo light />

        {/* Testimonial center */}
        <div className="max-w-xs">
          <blockquote className="text-white text-2xl font-bold leading-snug mb-4">
            "From keyword to clean Excel sheet in 40 seconds. This replaced an
            entire afternoon."
          </blockquote>
          <p className="text-white/70 text-sm">— Maya R., Growth lead</p>
        </div>

        {/* Copyright */}
        <p className="text-white/50 text-xs">© 2026 LocalFinder</p>
      </GradientPanel>

      {/* ── Right: form ── */}
      <div className="flex flex-col justify-center items-center px-6 py-12 sm:px-10 lg:px-16 xl:px-24 bg-gray-50">
        <div className="w-full max-w-sm">
          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Welcome back
            </h1>
            <p className="text-sm text-gray-500">
              Log in to keep scraping leads.
            </p>
          </div>

          {/* Notification */}
          {notification && (
            <div
              className={`p-4 my-3 rounded-lg text-sm ${
                notification.type === 'success'
                  ? 'bg-green-50 text-green-800 border border-green-200'
                  : 'bg-red-50 text-red-800 border border-red-200'
              }`}
            >
              {notification.message}
            </div>
          )}

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <InputField
              label="Email"
              id="login-email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Password"
              id="login-password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <div className="mt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed"
              >
                {loading ? 'Logging in...' : 'Log in'}
              </button>
            </div>
          </form>

          {/* Footer link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            No account?{" "}
            <Link
              to="/register"
              className="text-indigo-600 font-semibold hover:underline focus:outline-none"
            >
              Create one
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
