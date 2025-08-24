import { z } from "zod";

export interface Person {
  person_key: string;
  person_email: string;
  person_username: string | null;
  person_is_paying: boolean;
  person_date_signed_up: Date;
  person_using_tagging: boolean;
}

export interface Session {
  session_key: string;
  session_person_key: string;
  session_created_at: Date;
  session_expires_at: Date;
}

export const SignUpSchema = z.object({
  email: z.string()
    .trim()
    .toLowerCase()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: z.string().min(8),
  username: z.string().optional(),
})

export type SignUpDTO = z.infer<typeof SignUpSchema>

export const SignInSchema = z.object({
  email: z.string()
    .trim()
    .toLowerCase()
    .regex(/^[^\s@]+@[^\s@]+\.[^\s@]+$/, "Invalid email address"),
  password: z.string().min(8),
})

export type SignInDTO = z.infer<typeof SignInSchema>
