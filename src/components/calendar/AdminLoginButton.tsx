import React from 'react';
import { Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useSupabaseClient } from '@supabase/auth-helpers-react';

export default function AdminLoginButton() {
  const { isAdmin } = useAuth();
  const supabase = useSupabaseClient();

  const handleLogin = async () => {
    await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: `${window.location.origin}/admin`
      }
    });
  };

  if (isAdmin) return null;

  return (
    <button
      onClick={handleLogin}
      className="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50"
    >
      <Shield className="w-4 h-4" />
      Admin Login
    </button>
  );
}