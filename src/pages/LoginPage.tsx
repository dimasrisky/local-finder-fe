import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import GradientPanel from "../components/GradientPanel";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

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

          {/* Form */}
          <div className="flex flex-col gap-5">
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
              <PrimaryButton>Log in</PrimaryButton>
            </div>
          </div>

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
