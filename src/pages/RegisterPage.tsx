import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import GradientPanel from "../components/GradientPanel";

const RegisterPage = () => {
  const navigate = useNavigate();
  const [fullName, setFullName] = useState("");
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
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
    if (!fullName || !username || !email || !password || !confirm) {
      showNotification('error', 'Please fill in all fields');
      return;
    }

    if (password !== confirm) {
      showNotification('error', 'Passwords do not match');
      return;
    }

    if (password.length < 8) {
      showNotification('error', 'Password must be at least 8 characters');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/auth/register`, {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          email,
          password,
          fullName,
        }),
      });

      const data = await response.json();

      if (response.ok) {
        showNotification('success', 'Registration successful! Redirecting to login...');
        setTimeout(() => {
          navigate('/login');
        }, 2000);
      } else {
        showNotification('error', data.message || 'Registration failed. Please try again.');
      }
    } catch {
      showNotification('error', 'Network error. Please check your connection and try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen grid grid-cols-1 lg:grid-cols-2">
      {/* ── Left: form ── */}
      <div className="flex flex-col justify-center items-center px-6 py-12 sm:px-10 lg:px-16 xl:px-24 bg-gray-50">
        <div className="w-full max-w-sm mx-auto lg:mx-0">
          {/* Logo */}
          <div className="mb-10">
            <Logo />
          </div>

          {/* Heading */}
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-gray-900 mb-1">
              Create your account
            </h1>
            <p className="text-sm text-gray-500">
              Start scraping in under a minute.
            </p>
          </div>

          {/* Notification */}
          {notification && (
            <div
              className={`p-4 rounded-lg text-sm ${
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
              label="Full Name"
              id="reg-fullname"
              type="text"
              placeholder="John Doe"
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
            />
            <InputField
              label="Username"
              id="reg-username"
              type="text"
              placeholder="johndoe"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <InputField
              label="Email"
              id="reg-email"
              type="email"
              placeholder="you@company.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <InputField
              label="Password"
              id="reg-password"
              type="password"
              placeholder="At least 8 characters"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <InputField
              label="Confirm password"
              id="reg-confirm"
              type="password"
              placeholder=""
              value={confirm}
              onChange={(e) => setConfirm(e.target.value)}
            />
            <div className="mt-1">
              <button
                type="submit"
                disabled={loading}
                className="w-full py-3 px-4 bg-indigo-600 hover:bg-indigo-700 disabled:bg-indigo-400 text-white font-semibold rounded-lg transition duration-200 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:cursor-not-allowed"
              >
                {loading ? 'Creating account...' : 'Create account'}
              </button>
            </div>
          </form>

          {/* Footer link */}
          <p className="mt-6 text-center text-sm text-gray-500">
            Have an account?{" "}
            <Link
              to="/login"
              className="text-indigo-600 font-semibold hover:underline focus:outline-none"
            >
              Log in
            </Link>
          </p>
        </div>
      </div>

      {/* ── Right: gradient panel ── */}
      <GradientPanel>
        {/* top spacer */}
        <div />

        {/* Center content */}
        <div>
          <h2 className="text-white text-3xl font-bold leading-snug mb-5">
            One tool. Endless leads.
          </h2>
          <ul className="flex flex-col gap-2.5">
            {[
              "Search any city or niche",
              "Get rating, phone, website, address",
              "Export to Excel in one click",
            ].map((item) => (
              <li key={item} className="flex items-start gap-2 text-white/90 text-sm">
                <span className="mt-0.5">•</span>
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>

        {/* Copyright */}
        <p className="text-white/50 text-xs">© 2026 LocalFinder</p>
      </GradientPanel>
    </div>
  );
};

export default RegisterPage;
