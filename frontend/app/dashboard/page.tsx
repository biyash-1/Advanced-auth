"use client";

import React from 'react';
import { useAuthStore } from '@/app/store/useAuthStore';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const { logout, isLoading: logoutLoading } = useAuthStore();
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await logout();
      router.push('/login');
    } catch (err) {
      console.error('Logout failed', err);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Top bar with Logout */}
      <header className="w-full bg-white bg-opacity-80 backdrop-blur-md p-4 shadow-md flex justify-end">
        <button
          onClick={handleLogout}
          disabled={logoutLoading}
          className={`px-4 py-2 font-medium rounded-lg transition \
            ${logoutLoading ? 'bg-red-300' : 'bg-red-500 hover:bg-red-600'} text-white`
          }
        >
          {logoutLoading ? 'Logging out...' : 'Logout'}
        </button>
      </header>

      {/* Main content */}
      <main className="flex-grow flex items-center justify-center bg-gradient-to-r from-purple-500 to-indigo-600 p-6">
        <div className="bg-white bg-opacity-80 backdrop-blur-md p-10 rounded-3xl shadow-2xl text-center">
          <h1 className="text-6xl font-extrabold text-gray-900 mb-4">
            Welcome to Your Dashboard
          </h1>
          <p className="text-xl text-gray-700 mb-8">
            Here’s a quick snapshot of your activity and insights.
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
              <h2 className="text-3xl font-bold mb-2">42</h2>
              <p className="text-gray-500">New Messages</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
              <h2 className="text-3xl font-bold mb-2">8</h2>
              <p className="text-gray-500">Pending Tasks</p>
            </div>
            <div className="p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition">
              <h2 className="text-3xl font-bold mb-2">15</h2>
              <p className="text-gray-500">New Notifications</p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
