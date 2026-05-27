import { useState } from "react";
import { Link } from "react-router-dom";
import Logo from "../components/Logo";
import InputField from "../components/InputField";
import PrimaryButton from "../components/PrimaryButton";
import GradientPanel from "../components/GradientPanel";

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");

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

          {/* Form */}
          <div className="flex flex-col gap-5">
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
              <PrimaryButton>Create account</PrimaryButton>
            </div>
          </div>

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
