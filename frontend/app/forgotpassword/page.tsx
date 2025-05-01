"use client";

import { useState, FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";
import toast from "react-hot-toast";

export default function ForgotPasswordPage() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { forgotPassword, error, isLoading } = useAuthStore();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    try {
      await forgotPassword(email);
      toast.success(
        "If an account with that email exists, you’ll receive a password reset link shortly."
      );
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Forgot password error", err);
      toast.error(err.message || "Unable to send reset link. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-gray-900">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-md">
        {!isSubmitted ? (
          <>
            <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
              Forgot Password
            </h2>
            <p className="text-gray-300 text-center mb-4">
              Enter your email address and we'll send you a link to reset your password.
            </p>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label htmlFor="email" className="block text-sm text-gray-200 mb-1">
                  Email address
                </label>
                <input
                  id="email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 bg-gray-700 border border-gray-600 placeholder-gray-400 text-gray-100 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"
                  placeholder="you@example.com"
                />
              </div>
              {error && <p className="text-red-500 text-center">{error}</p>}
              <button
                type="submit"
                disabled={isLoading}
                className={`w-full py-2 px-4 ${
                  isLoading ? 'bg-green-700' : 'bg-green-600 hover:bg-green-700'
                } text-white font-semibold rounded-lg transition disabled:opacity-50 disabled:cursor-not-allowed`}
              >
                {isLoading ? 'Sending...' : 'Send Reset Link'}
              </button>
            </form>
            <p className="mt-6 text-center text-sm text-gray-400">
              Remembered your password?{' '}
              <a href="/login" className="text-green-400 hover:underline">
                Sign in
              </a>
            </p>
          </>
        ) : (
          <div className="text-center">
            <h2 className="text-2xl font-bold text-gray-100 mb-4">
              Check Your Email
            </h2>
            <p className="text-gray-300 mb-6">
              If an account with <span className="font-medium text-gray-100">{email}</span> exists, you’ll receive an email with instructions to reset your password.
            </p>
            <button
              onClick={() => router.push('/login')}
              className="mt-4 w-full py-2 px-4 bg-green-600 hover:bg-green-700 text-white font-semibold rounded-lg transition"
            >
              Back to Sign In
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
