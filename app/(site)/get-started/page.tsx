"use client"

import { signUp } from "@/actions/auth";
import PersonIcon from "@/components/icons/person-icon";
import LogoSite from "@/components/sections/brand/logo-site";
import { BrandButton } from "@/components/ui/brand-button";
import TextInput from "@/components/ui/text-input";
import { SignUpDTO, SignUpSchema } from "@/types/auth";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from 'next/navigation';
import { useState } from "react";

export default function GetStartedPage() {
 const router = useRouter();
 const [formData, setFormData] = useState<SignUpDTO>({
   email: '',
   password: '',
   username: '',
 });
 const [errors, setErrors] = useState<Record<string, string>>({});
 const [isLoading, setIsLoading] = useState(false);

 const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
   const { name, value } = e.target;
   setFormData(prev => ({ ...prev, [name]: value }));

   if (errors[name]) {
     setErrors(prev => ({ ...prev, [name]: '' }));
   }
 };

 const handleSubmit = async (e: React.FormEvent) => {
   e.preventDefault();
   setIsLoading(true);
   setErrors({});

   try {
     const validatedData = SignUpSchema.parse(formData);
     await signUp(validatedData);
     router.push('/app');
   } catch (error: any) {
     setIsLoading(false);
     
     if (error.errors) {
       const fieldErrors: Record<string, string> = {};
       error.errors.forEach((err: any) => {
         fieldErrors[err.path[0]] = err.message;
       });
       setErrors(fieldErrors);
     } else {
       setErrors({ general: error.message || 'Something went wrong' });
     }
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
             placeholder="At least 8 characters"
             required
             error={errors.password}
           />

           <TextInput
             label="Username (optional)"
             type="text"
             name="username"
             value={formData.username || ''}
             onChange={handleInputChange}
             placeholder="Choose a username"
             error={errors.username}
           />

           {errors.general && (
             <div className="p-4 bg-red-50 dark:bg-red-900/20 border-2 border-red-200 dark:border-red-800">
               <p className="text-red-600 dark:text-red-400 font-medium">
                 {errors.general}
               </p>
             </div>
           )}

           <BrandButton
             text={isLoading ? "Getting Started..." : "Get Started"}
             type="submit"
             className="w-full"
             icon={<PersonIcon/>}
           />

           <p className="text-sm text-neutral-500 dark:text-neutral-400 text-center">
             Already have an account?{' '}
             <Link href="/log-back-in" className="text-brand underline hover:text-brand-dark">
               Log Back In
             </Link>
           </p>
         </form>
       </div>
     </div>

     <div className="relative h-64 lg:h-full">
       <Image 
         src="/mtns2.jpg" 
         alt="Get Started" 
         fill
         className="object-cover"
         priority
       />
     </div>
   </div>
 );
}