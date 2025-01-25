import { useEffect, useState } from 'react';
    import { User } from '@supabase/supabase-js';
    import { supabase } from '@/lib/supabase';
    import { toast } from 'sonner';

    export function useAuth() {
      const [user, setUser] = useState<User | null>(null);
      const [loading, setLoading] = useState(true);

      useEffect(() => {
        // Get initial session
        supabase.auth.getSession().then(({ data: { session } }) => {
          setUser(session?.user ?? null);
          setLoading(false);
        });

        // Listen for auth changes
        const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
          setUser(session?.user ?? null);
        });

        return () => subscription.unsubscribe();
      }, []);

      const signUp = async ({ email, password, fullName }: { 
        email: string; 
        password: string;
        fullName: string;
      }) => {
        console.log('signUp email type:', typeof email);
        console.log('signUp password type:', typeof password);
        try {
          const { error } = await supabase.auth.signUp({
            email,
            password,
            options: {
              data: {
                full_name: fullName,
              },
            },
          });

          if (error) throw error;
          toast.success('Registration successful! Please check your email to verify your account.');
        } catch (error) {
          toast.error('Registration failed');
          throw error;
        }
      };

      const signIn = async ({ email, password }: { email: string; password: string }) => {
        console.log('signIn email type:', typeof email);
        console.log('signIn password type:', typeof password);
        try {
          const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
          });

          if (error) throw error;
          toast.success('Successfully signed in');
        } catch (error) {
          toast.error('Failed to sign in');
          throw error;
        }
      };

      const signOut = async () => {
        try {
          const { error } = await supabase.auth.signOut();
          if (error) throw error;
          toast.success('Successfully signed out');
        } catch (error) {
          toast.error('Failed to sign out');
          throw error;
        }
      };

      return {
        user,
        loading,
        signUp,
        signIn,
        signOut,
      };
    }
