import React from 'react';
    import { useForm } from 'react-hook-form';
    import { zodResolver } from '@hookform/resolvers/zod';
    import { z } from 'zod';
    import { Link, useNavigate, useLocation } from 'react-router-dom';
    import { Button } from '@/components/ui/Button';
    import { useAuth } from '@/contexts/AuthContext';
    import { toast } from 'sonner';

    const registerSchema = z.object({
      name: z.string().min(2, 'Name must be at least 2 characters'),
      email: z.string().email('Invalid email address'),
      password: z.string().min(6, 'Password must be at least 6 characters'),
      confirmPassword: z.string(),
    }).refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

    type RegisterForm = z.infer<typeof registerSchema>;

    export const RegisterPage: React.FC = () => {
      const navigate = useNavigate();
      const location = useLocation();
      const { signUp, error, registerLoading } = useAuth();
      
      const from = location.state?.from?.pathname || '/account';
      const redirect = new URLSearchParams(location.search).get('redirect') || from;

      const {
        register,
        handleSubmit,
        formState: { errors, isSubmitting },
      } = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
      });

      const onSubmit = async (data: RegisterForm) => {
        try {
          await signUp(data);
          navigate(redirect, { replace: true });
        } catch (error: any) {
          toast.error(error.message || 'Registration failed');
        }
      };

      return (
        <div className="min-h-screen bg-[#EBEBDA] flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
          <div className="max-w-md w-full space-y-8 bg-white p-8 rounded-lg shadow-md">
            <div>
              <h2 className="text-center text-3xl font-bold text-[#777A55]">
                Create your account
              </h2>
              <p className="mt-2 text-center text-sm text-gray-600">
                Already have an account?{' '}
                <Link 
                  to="/login" 
                  className="text-[#777A55] hover:text-[#777A55]/80"
                  state={{ from: location.state?.from }}
                >
                  Sign in
                </Link>
              </p>
            </div>

            <form className="mt-8 space-y-6" onSubmit={handleSubmit(onSubmit)}>
              <div className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                    Full Name
                  </label>
                  <input
                    {...register('name')}
                    type="text"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                  />
                  {errors.name && (
                    <p className="mt-1 text-sm text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                    Email address
                  </label>
                  <input
                    {...register('email')}
                    type="email"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                  />
                  {errors.email && (
                    <p className="mt-1 text-sm text-red-600">{errors.email.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                    Password
                  </label>
                  <input
                    {...register('password')}
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                  />
                  {errors.password && (
                    <p className="mt-1 text-sm text-red-600">{errors.password.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="confirmPassword" className="block text-sm font-medium text-gray-700">
                    Confirm Password
                  </label>
                  <input
                    {...register('confirmPassword')}
                    type="password"
                    className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-[#777A55] focus:ring focus:ring-[#777A55] focus:ring-opacity-50"
                  />
                  {errors.confirmPassword && (
                    <p className="mt-1 text-sm text-red-600">{errors.confirmPassword.message}</p>
                  )}
                </div>
              </div>

              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={isSubmitting || registerLoading}
              >
                {isSubmitting ? 'Creating account...' : 'Create account'}
              </Button>
              {error && <p className="text-red-500 text-center">{error}</p>}
            </form>
          </div>
        </div>
      );
    };
