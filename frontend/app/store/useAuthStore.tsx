import { create, StateCreator } from 'zustand';
import { AxiosError } from 'axios';
import { axiosInstance } from '../axios/axiosInstance';

interface User {
  id: string;
  email: string;
  name: string;
  isVerified?: boolean;
}

interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  error: string | null;
  isLoading: boolean;
  isCheckingAuth: boolean;
  message: string | null;
  clearError: () => void;
  
  signup: (email: string, password: string, name: string) => Promise<void>;
  login: (email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  verifyEmail: (code: string) => Promise<void>;
  checkAuth: () => Promise<void>;
  forgotPassword: (email: string) => Promise<void>;
  resetPassword: (token: string, password: string) => Promise<void>;
}

const authStoreCreator: StateCreator<AuthState> = (set:any) => ({
  user: null,
  isAuthenticated: false,
  error: null,
  isLoading: false,
  isCheckingAuth: true,
  message: null,

  clearError: () => set({ error: null }),

  signup: async (email:string, password:string, name:string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('api/auth/signup', { email, password, name });
      set({ 
        user: response.data.user, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({ 
        error: err.response?.data?.message || 'Error signing up', 
        isLoading: false 
      });
      throw error;
    }
  },

  login: async (email:string, password:string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('api/auth/login', { email, password });
      set({
        isAuthenticated: true,
        user: response.data.user,
        error: null,
        isLoading: false,
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({ 
        error: err.response?.data?.message || 'Error logging in', 
        isLoading: false 
      });
      throw error;
    }
  },

  logout: async () => {
    set({ isLoading: true, error: null });
    try {
      await axiosInstance.post('api/auth/logout');
      set({ 
        user: null, 
        isAuthenticated: false, 
        error: null, 
        isLoading: false 
      });
    } catch (error) {
      set({ 
        error: 'Error logging out', 
        isLoading: false 
      });
      throw error;
    }
  },

  verifyEmail: async (code:string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('api/auth/verify_email', { code });
      set({ 
        user: response.data.user, 
        isAuthenticated: true, 
        isLoading: false 
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({ 
        error: err.response?.data?.message || 'Error verifying email', 
        isLoading: false 
      });
      throw error;
    }
  },

  checkAuth: async () => {
    set({ isCheckingAuth: true, error: null });
    try {
      const response = await axiosInstance.get('api/auth/check-auth');
      set({ 
        user: response.data.user, 
        isAuthenticated: true, 
        isCheckingAuth: false 
      });
    } catch (error) {
      set({ 
        error: null, 
        isCheckingAuth: false, 
        isAuthenticated: false 
      });
    }
  },

  forgotPassword: async (email:string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post('api/auth/forgot_password', { email });
      set({ 
        message: response.data.message, 
        isLoading: false 
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({
        isLoading: false,
        error: err.response?.data?.message || 'Error sending reset password email',
      });
      throw error;
    }
  },

  resetPassword: async (token:string, password:string) => {
    set({ isLoading: true, error: null });
    try {
      const response = await axiosInstance.post(`api/auth/reset_password/${token}`, { password });
      set({ 
        message: response.data.message, 
        isLoading: false 
      });
    } catch (error) {
      const err = error as AxiosError<{ message: string }>;
      set({
        isLoading: false,
        error: err.response?.data?.message || 'Error resetting password',
      });
      throw error;
    }
  },
});

export const useAuthStore = create<AuthState>()(authStoreCreator);