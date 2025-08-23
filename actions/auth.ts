"use server";

import { sql } from "@/db/db";
import { cookies } from "next/headers";
import bcrypt from "bcryptjs";
import crypto from "crypto";
import {
  Person,
  Session,
  SignInDTO,
  SignInSchema,
  SignUpDTO,
  SignUpSchema,
} from "@/types/auth";

const SESSION_DURATION_MS = 1000 * 60 * 60 * 24 * 30; // 30 days

// Type for session validation result with person
type SessionValidationResult =
  | { session: Session; person: Person }
  | { session: null; person: null };

// Helpers for session cookie
async function setSessionTokenCookie(token: string, expiresAt: Date): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("session", token, {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    expires: expiresAt,
    path: "/",
  });
}

async function deleteSessionTokenCookie(): Promise<void> {
  const cookieStore = await cookies();
  cookieStore.set("session", "", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    maxAge: 0,
    path: "/",
  });
}

// Core session validation function with person data
async function validateSessionToken(token: string): Promise<SessionValidationResult> {
  const result = await sql`
    SELECT 
      s.session_key,
      s.session_person_key,
      s.session_created_at,
      s.session_expires_at,
      p.person_key as p_key,
      p.person_email,
      p.person_username,
      p.person_date_signed_up
    FROM session s
    JOIN person p ON s.session_person_key = p.person_key
    WHERE s.session_key = ${token}
  `;

  if (!result || result.length === 0) {
    return { session: null, person: null };
  }

  const row = result[0];

  const session: Session = {
    session_key: row.session_key,
    session_person_key: row.session_person_key,
    session_created_at: new Date(row.session_created_at),
    session_expires_at: new Date(row.session_expires_at),
  };

  const person: Person = {
    person_key: row.p_key,
    person_email: row.person_email,
    person_username: row.person_username,
    person_date_signed_up: new Date(row.person_date_signed_up),
  };

  // Expiry check
  if (Date.now() >= session.session_expires_at.getTime()) {
    await sql`SELECT sp_invalidate_session(${session.session_key});`;
    await deleteSessionTokenCookie();
    return { session: null, person: null };
  }

  // Auto-refresh if within 15 days
  const fifteenDaysBeforeExpiry = session.session_expires_at.getTime() - 1000 * 60 * 60 * 24 * 15;
  if (Date.now() >= fifteenDaysBeforeExpiry) {
    const newExpiresAt = new Date(Date.now() + SESSION_DURATION_MS);
    await sql`
      UPDATE session
      SET session_expires_at = ${newExpiresAt}
      WHERE session_key = ${session.session_key}
    `;
    session.session_expires_at = newExpiresAt;
  }

  return { session, person };
}

// Sign Up
export async function signUp(data: SignUpDTO): Promise<void> {
  const parsed = SignUpSchema.parse(data);
  const hashed = await bcrypt.hash(parsed.password, 10);

  // Create person (account)
  const [person] = await sql`
    SELECT * FROM sp_create_person(
      ${parsed.email},
      ${hashed},
      ${parsed.username ?? null}
    );
  ` as Person[];

  // Create session
  const sessionKey = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  const [session] = await sql`
    SELECT * FROM sp_create_session(
      ${sessionKey},
      ${person.person_key},
      ${expiresAt}
    );
  ` as Session[];

  // Set session cookie
  await setSessionTokenCookie(session.session_key, expiresAt);
}

// Sign In
export async function signIn(data: SignInDTO): Promise<void> {
  const parsed = SignInSchema.parse(data);

  // Get person
  const [person] = await sql`
    SELECT * FROM person WHERE person_email = ${parsed.email};
  ` as Person[];

  if (!person) {
    throw new Error('Invalid email or password');
  }

  // Get stored hash as Buffer from bytea
  const [pw] = await sql`
    SELECT person_hashed_password FROM person WHERE person_key = ${person.person_key};
  ` as { person_hashed_password: Buffer }[];

  // Convert Buffer to string for bcrypt comparison
  const hashString = pw.person_hashed_password.toString('utf8');

  const valid = await bcrypt.compare(parsed.password, hashString);
  if (!valid) {
    throw new Error('Invalid email or password');
  }

  // Create session
  const sessionKey = crypto.randomUUID();
  const expiresAt = new Date(Date.now() + SESSION_DURATION_MS);

  const [session] = await sql`
  SELECT * FROM sp_create_session(
    ${sessionKey},
    ${person.person_key},
    ${expiresAt}
  );
` as Session[];

  await setSessionTokenCookie(session.session_key, expiresAt);
}

// Sign Out with proper cleanup
export async function signOut(): Promise<void> {
  const currentSession = await getCurrentSession();

  if (currentSession.session?.session_key) {
    await sql`SELECT sp_invalidate_session(${currentSession.session.session_key});`;
  }

  await deleteSessionTokenCookie();
}

// Delete session (alias for signOut for consistency)
export async function deleteSession(): Promise<void> {
  await signOut();
}

// Session validation
export const getCurrentSession = async (): Promise<SessionValidationResult> => {
  const cookieStore = await cookies();
  const token = cookieStore.get("session")?.value ?? null;
  if (!token) return { session: null, person: null };
  return validateSessionToken(token);
};

// Convenience functions for easier usage
export async function getCurrentPerson(): Promise<Person | null> {
  const { person } = await getCurrentSession();
  return person;
}

export async function getCurrentSessionOnly(): Promise<Session | null> {
  const { session } = await getCurrentSession();
  return session;
}

// Check if user is authenticated (boolean)
export async function isAuthenticated(): Promise<boolean> {
  const { session } = await getCurrentSession();
  return session !== null;
}

// Require authentication - throws if not authenticated
export async function requireAuth(): Promise<{ session: Session; person: Person }> {
  const result = await getCurrentSession();

  if (!result.session || !result.person) {
    throw new Error("Authentication required");
  }

  return result;
}