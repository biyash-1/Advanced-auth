'use client';
import Link from 'next/link';
import { useAuthStore } from '../store/useAuthStore';
import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';

export default function LoginPage() {
  const router = useRouter();
  const {login,isLoading,error} = useAuthStore();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const handleSubmit = async(e: FormEvent) => {
    e.preventDefault();
    try{

      console.log({ email, password });
       await login(email,password);
       toast.success("login sucesfull")
      
      router.push('/dashboard')
    }
    
    catch(error) {

      console.log("error comes is",error);
      

    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center px-4 bg-black">
      <div className="w-full max-w-md bg-gray-800 p-8 rounded-2xl shadow-md">
        <h2 className="text-2xl font-bold text-gray-100 mb-6 text-center">
          Sign in to your account
        </h2>
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
              onChange={e => setEmail(e.target.value)}
              className="
                w-full px-4 py-2
                bg-gray-700 border border-gray-600
                placeholder-gray-400 text-gray-100
                rounded-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              "
              placeholder="you@example.com"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm text-gray-200 mb-1">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={e => setPassword(e.target.value)}
              className="
                w-full px-4 py-2
                bg-gray-700 border border-gray-600
                placeholder-gray-400 text-gray-100
                rounded-lg
                focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500
              "
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="
              w-full py-2 px-4
              bg-indigo-600 hover:bg-indigo-700
              text-white font-semibold
              rounded-lg transition
            "
          >
            Sign In
          </button>
        </form>
        <div className="mt-4 flex justify-between text-sm text-gray-400">
          <Link href="/signup" className="hover:underline text-indigo-400">
            Create account
          </Link>
          <Link href="/forgotpassword" className="hover:underline text-indigo-400">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
