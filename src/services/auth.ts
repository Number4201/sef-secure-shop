
// This is a temporary mock implementation that will be replaced with your actual backend
// The Supabase client is only included to prevent build errors until you connect your actual backend

import { createClient } from '@supabase/supabase-js';

// Temporary placeholder values to make the build work
const supabaseUrl = 'https://your-supabase-url.supabase.co';
const supabaseAnonKey = 'your-supabase-anon-key';

// Create a temporary client to avoid build errors
export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Mock user type to maintain TypeScript compatibility
export type User = {
  id: string;
  email?: string;
  user_metadata?: {
    full_name?: string;
    avatar_url?: string;
  };
};

// Authentication service functions that will be connected to your backend
export const signInWithEmail = async (email: string, password: string) => {
  console.log('Sign in with email would connect to your backend', { email });
  // TODO: Replace with actual backend call
  return { 
    data: { 
      user: {
        id: '1',
        email,
        user_metadata: {
          full_name: 'Test User',
          avatar_url: ''
        }
      } 
    }, 
    error: null 
  };
};

export const signUpWithEmail = async (email: string, password: string) => {
  console.log('Sign up with email would connect to your backend', { email });
  // TODO: Replace with actual backend call
  return { 
    data: { 
      user: {
        id: '1',
        email,
        user_metadata: {
          full_name: 'Test User',
          avatar_url: ''
        }
      } 
    }, 
    error: null 
  };
};

export const signInWithGoogle = async () => {
  console.log('Sign in with Google would connect to your backend');
  // TODO: Replace with actual OAuth implementation
  const redirectTo = `${window.location.origin}/auth/callback`;
  console.log('Would redirect to:', redirectTo);
  
  // For now, just redirect to callback to simulate the flow
  window.location.href = redirectTo;
  
  return { data: {}, error: null };
};

export const signOut = async () => {
  console.log('Sign out would connect to your backend');
  // TODO: Replace with actual backend call
  return { error: null };
};

export const getCurrentUser = async () => {
  console.log('Get current user would connect to your backend');
  // TODO: Replace with actual backend call
  
  // Check if we have a user in localStorage for demo purposes
  const storedUser = localStorage.getItem('demo_auth_user');
  if (storedUser) {
    return { user: JSON.parse(storedUser), error: null };
  }
  
  return { user: null, error: null };
};

