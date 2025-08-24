"use client"

import { signIn } from "@/actions/auth";
import LogoSite from "@/components/sections/brand/logo-site";
import { BrandButton } from "@/components/ui/brand-button";
import TextInput from "@/components/ui/text-input";
import { SignInDTO, SignInSchema } from "@/types/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function LogBackInPage() {
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
    <div className="lg:grid lg:grid-cols-2 min-h-screen">
      <div className="flex flex-col justify-center px-6 py-12 lg:px-20 lg:py-24">
        <div className="w-full max-w-md mx-auto lg:mx-0">
          <div className="mb-12">
            <LogoSite url={"/"} />
          </div>
          
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
              <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800 rounded-lg">
                <p className="text-red-600 dark:text-red-400 font-medium">
                  {errors.general}
                </p>
              </div>
            )}

            <BrandButton
              text={isLoading ? "Logging Back In..." : "Log Back In"}
              type="submit"
              className="w-full"
            />

            <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
              Need to create an account?{' '}
              <Link href="/get-started" className="text-brand underline hover:text-brand-dark">
                Get Started
              </Link>
            </p>
          </form>
        </div>
      </div>

      <div className="relative h-64 lg:h-full -mr-4">
        <Image 
          src="/mtns.jpg" 
          alt="Log Back In" 
          fill
          className="object-cover"
          priority
        />
      </div>
    </div>
  );
}