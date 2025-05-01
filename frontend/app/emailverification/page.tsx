"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuthStore } from "../store/useAuthStore";

export default function EmailVerificationPage() {
  const [code, setCode] = useState<string[]>(Array(6).fill(""));
  const inputRefs = useRef<Array<HTMLInputElement | null>>(Array(6).fill(null));
  const router = useRouter();
  const { error, isLoading, verifyEmail } = useAuthStore();

  const handleInput = (index: number, value: string) => {
    const newCode = [...code];

    if (value.length > 1) {
      
      const pasted = value.slice(0, 6).split("");
      pasted.forEach((char, i) => (newCode[i] = char));
      const focusIndex = Math.min(pasted.length, 5);
      inputRefs.current[focusIndex]?.focus();
    } else {
      newCode[index] = value.slice(-1);
      if (value && index < 5) inputRefs.current[index + 1]?.focus();
    }

    setCode(newCode);
  };

  const handleKeyDown = (
    index: number,
    e: React.KeyboardEvent<HTMLInputElement>
  ) => {
    if (e.key === "Backspace" && !code[index] && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const submitCode = async () => {
    try {
      await verifyEmail(code.join(""));
      router.push("/dashboard");
    } catch (err) {
      console.error("Verification failed:", err);
    }
  };

  // auto-submit when all boxes are filled
  useEffect(() => {
    if (code.every((d) => d !== "")) {
      submitCode();
    }
  }, [code]);

  return (
    // full-screen flex container
    <div className="flex h-screen items-center justify-center bg-gray-900">
      {/* centered card */}
      <div className="max-w-md w-full bg-gray-800 bg-opacity-50 backdrop-blur-xl rounded-2xl p-8">
        <h2 className="text-3xl font-bold mb-6 text-center bg-gradient-to-r from-green-400 to-emerald-500 text-transparent bg-clip-text">
          Verify Your Email
        </h2>

        <p className="text-center text-gray-300 mb-6">
          Enter the 6-digit code sent to your email
        </p>

        <form
          onSubmit={(e) => {
            e.preventDefault();
            submitCode();
          }}
          className="space-y-6"
        >
          <div className="flex justify-between gap-2">
            {code.map((digit, index) => (
              <input
                key={index}
                ref={(el) => {
                  inputRefs.current[index] = el;
                }}
                type="text"
                inputMode="numeric"
                autoComplete="one-time-code"
                maxLength={1}
                value={digit}
                onChange={(e) => handleInput(index, e.target.value)}
                onKeyDown={(e) => handleKeyDown(index, e)}
                className="w-12 h-12 text-center text-2xl bg-gray-700 rounded-lg border-2 border-gray-600 focus:border-green-500 focus:outline-none"
              />
            ))}
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            type="submit"
            disabled={isLoading || code.some((d) => !d)}
            className="w-full bg-gradient-to-r from-green-500 to-emerald-600 text-white font-bold py-3 rounded-lg disabled:opacity-50 transition-opacity"
          >
            {isLoading ? "Verifying..." : "Verify Email"}
          </button>
        </form>
      </div>
    </div>
  );
}
