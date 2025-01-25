import { create } from 'zustand';
    import { persist } from 'zustand/middleware';
    import { jwtDecode } from 'jwt-decode';
    import type { AuthState, LoginCredentials, RegisterData, User } from '@/types/auth';
    import { supabase } from '@/lib/supabase';
    import { toast } from 'sonner';

    interface AuthStore extends AuthState {
      login: (credentials: LoginCredentials) => Promise<void>;
      register: (data: RegisterData) => Promise<void>;
      logout: () => void;
      updateProfile: (data: Partial<User>) => Promise<void>;
      loginLoading: boolean;
      registerLoading: boolean;
      profileLoading: boolean;
      logoutLoading: boolean;
    }

    export const useAuthStore = create<AuthStore>()(
      persist(
        (set) => ({
          user: null,
          token: null,
          isLoading: false,
          error: null,
          loginLoading: false,
          registerLoading: false,
          profileLoading: false,
          logoutLoading: false,

          login: async (credentials) => {
            set({ loginLoading: true, error: null });
            console.log('signInWithPassword credentials:', credentials);
            console.log('signInWithPassword credentials.email type:', typeof credentials.email);
            console.log('signInWithPassword credentials.password type:', typeof credentials.password);
            try {
              const payload = {
                email: `${credentials.email}`,
                password: `${credentials.password}`,
              };
              console.log('signInWithPassword payload:', payload);
              console.log('signInWithPassword JSON.stringify(payload):', JSON.stringify(payload));
              const { data, error } = await supabase.auth.signInWithPassword(JSON.parse(jsonPayload));
              if (error) {
                set({ error: error.message, loginLoading: false });
                throw error;
              }
              if (!data?.session) {
                set({ error: 'No session found', loginLoading: false });
                throw new Error('No session found');
              }
              const decodedToken = jwtDecode(data.session.access_token) as any;
              const user: User = {
                id: decodedToken.sub,
                email: decodedToken.email,
                name: decodedToken.full_name,
                role: decodedToken.role,
              };
              set({ user, token: data.session.access_token, loginLoading: false });
              toast.success('Successfully signed in');
            } catch (error: any) {
              set({ error: error.message || 'Login failed', loginLoading: false });
              throw error;
            }
          },

          register: async (data) => {
            set({ registerLoading: true, error: null });
            try {
              const { data: authData, error } = await supabase.auth.signUp({
                email: data.email,
                password: data.password,
                options: {
                  data: {
                    full_name: data.name,
                  },
                },
              });
              console.log('signUp data:', authData);
              console.log('signUp error:', error);
              if (error) {
                 set({ error: error.message, registerLoading: false });
                throw error;
              }
              if (!authData?.session) {
                set({ error: 'No session found', registerLoading: false });
                throw new Error('No session found');
              }
              const decodedToken = jwtDecode(authData.session.access_token) as any;
              const user: User = {
                id: decodedToken.sub,
                email: decodedToken.email,
                name: decodedToken.full_name,
                role: decodedToken.role,
              };
              set({ user, token: authData.session.access_token, registerLoading: false });
              toast.success('Registration successful! Please check your email to verify your account.');
            } catch (error: any) {
              set({ error: error.message || 'Registration failed', registerLoading: false });
              throw error;
            }
          },

          updateProfile: async (data) => {
            set({ profileLoading: true, error: null });
            try {
              if (!supabase.auth.currentUser) {
                set({ error: 'No user found', profileLoading: false });
                throw new Error('No user found');
              }
              const { data: profileData, error: profileError } = await supabase
                .from('profiles')
                .update(data)
                .eq('id', supabase.auth.currentUser.id)
                .select()
                .single();
              console.log('updateProfile data:', profileData);
              console.log('updateProfile error:', profileError);
              if (profileError) {
                set({ error: profileError.message, profileLoading: false });
                throw profileError;
              }
              set((state) => ({
                user: state.user ? { ...state.user, ...profileData } : null,
                profileLoading: false,
              }));
              toast.success('Profile updated successfully!');
            } catch (error: any) {
              set({ error: error.message || 'Profile update failed', profileLoading: false });
              throw error;
            }
          },

          logout: async () => {
            set({ logoutLoading: true, error: null });
            try {
              await supabase.auth.signOut();
              set({ user: null, token: null, error: null, logoutLoading: false });
              toast.success('Successfully signed out');
            } catch (error: any) {
              set({ error: error.message || 'Sign out failed', logoutLoading: false });
              throw error;
            }
          },
        }),
        {
          name: 'auth-storage',
        }
      )
    );
