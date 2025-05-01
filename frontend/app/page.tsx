"use client";

import React from 'react';
import { useRouter } from 'next/navigation';

export default function Home() {
  const router = useRouter();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-600 to-green-400 p-8">
      <h1 className="text-5xl font-extrabold text-white mb-4 drop-shadow-lg">
        Welcome to Advanced Auth
      </h1>
      <p className="text-lg text-white/90 mb-8 max-w-md text-center">
        You’re diving into advanced authentication flows: email verification, password resets,
        secure cookies, and more. Let’s master secure user management together!
      </p>
      <div className="space-x-4">
        <button
          onClick={() => router.push('/signup')}
          className="px-6 py-3 bg-white text-blue-600 font-semibold rounded-lg shadow hover:bg-gray-100 transition"
        >
          Get Started
        </button>
        <button
          onClick={() => router.push('/docs')}
          className="px-6 py-3 bg-transparent border border-white text-white font-semibold rounded-lg hover:bg-white hover:text-blue-600 transition"
        >
          Learn More
        </button>
      </div>
    </div>
  );
}