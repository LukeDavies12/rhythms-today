'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import FullScreenModal from '@/components/ui/full-screen-modal';
import TextInput from '@/components/ui/text-input';
import { signIn } from '@/actions/auth';
import { SignInSchema, type SignInDTO } from '@/types/auth';
import { BrandButton } from '@/components/ui/brand-button';

interface LogBackInProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function LogBackIn({ isOpen, onClose }: LogBackInProps) {
  const router = useRouter();
  const [formData, setFormData] = useState<SignInDTO>({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setErrors({});

    try {
      // Validate with Zod
      const validatedData = SignInSchema.parse(formData);
      
      // Call sign in action
      await signIn(validatedData);
      
      // Redirect to app
      router.push('/app');
      onClose();
    } catch (error: any) {
      if (error.errors) {
        // Zod validation errors
        const fieldErrors: Record<string, string> = {};
        error.errors.forEach((err: any) => {
          fieldErrors[err.path[0]] = err.message;
        });
        setErrors(fieldErrors);
      } else {
        // Server or other errors
        setErrors({ general: error.message || 'Something went wrong' });
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <FullScreenModal
      isOpen={isOpen}
      onClose={onClose}
      title="Welcome back to rhythms.today"
    >
      <div className="max-w-md mx-auto mt-8">
        <form onSubmit={handleSubmit} className="space-y-6">
          <TextInput
            label="Email"
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
            placeholder="your@email.com"
            required
            error={errors.email}
          />

          <TextInput
            label="Password"
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
            placeholder="Enter your password"
            required
            error={errors.password}
          />

          {errors.general && (
            <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800">
              <p className="text-red-600 dark:text-red-400 font-medium">
                {errors.general}
              </p>
            </div>
          )}

          <BrandButton
            text={isLoading ? "Signing In..." : "Sign In"}
            type="submit"
            className="w-full"
          />
        </form>
      </div>
    </FullScreenModal>
  );
}