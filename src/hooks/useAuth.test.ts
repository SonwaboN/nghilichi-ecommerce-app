import { renderHook, act } from '@testing-library/react';
    import { useAuth } from './useAuth';
    import { supabase } from '@/lib/supabase';

    jest.mock('@/lib/supabase', () => ({
      supabase: {
        auth: {
          getSession: jest.fn(() => Promise.resolve({ data: { session: null } })),
          onAuthStateChange: jest.fn(() => ({ data: { subscription: { unsubscribe: jest.fn() } } })),
          signInWithPassword: jest.fn(() => Promise.resolve({ data: { user: { id: 'test-user' } } })),
          signUp: jest.fn(() => Promise.resolve({ data: { user: { id: 'test-user' } } })),
          signOut: jest.fn(() => Promise.resolve()),
        },
      },
    }));

    describe('useAuth', () => {
      it('should initialize with loading state', () => {
        const { result } = renderHook(() => useAuth());
        expect(result.current.loading).toBe(true);
      });

      it('should set user on successful sign in', async () => {
        const { result } = renderHook(() => useAuth());
        await act(async () => {
          await result.current.signIn({ email: 'test@example.com', password: 'password' });
        });
        expect(result.current.user).toEqual({ id: 'test-user' });
      });

      it('should set user on successful sign up', async () => {
        const { result } = renderHook(() => useAuth());
        await act(async () => {
          await result.current.signUp({ email: 'test@example.com', password: 'password', name: 'Test User' });
        });
        expect(result.current.user).toEqual({ id: 'test-user' });
      });

      it('should set user to null on sign out', async () => {
        const { result } = renderHook(() => useAuth());
        await act(async () => {
          await result.current.signOut();
        });
        expect(result.current.user).toBeNull();
      });
    });
