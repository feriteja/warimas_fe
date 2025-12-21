import "server-only";

// lib/auth.ts
import { jwtVerify, JWTPayload } from "jose";

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET is not defined");
}

const secretKey = new TextEncoder().encode(JWT_SECRET);

/**
 * Shape of JWT payload used in warimas
 */
export interface AuthPayload extends JWTPayload {
  user_id: number; // user id
  role: "USER" | "ADMIN" | "SELLER";
  email: string;
  seller_id?: string;
  exp: number;
}

/**
 * Verify and decode JWT
 * Throws error if invalid / expired
 */
export async function verifyToken(token: string): Promise<AuthPayload> {
  try {
    const { payload } = await jwtVerify<AuthPayload>(token, secretKey);
    return payload;
  } catch (error) {
    throw error;
  }
}

/**
 * Safe wrapper: returns null instead of throwing
 */
export async function getAuthPayload(
  token?: string
): Promise<AuthPayload | null> {
  if (!token) return null;

  try {
    return await verifyToken(token);
  } catch {
    return null;
  }
}

/**
 * Role helpers
 */
export function isAdmin(user: AuthPayload | null): boolean {
  return user?.role === "ADMIN";
}

export function isSeller(user: AuthPayload | null): boolean {
  return user?.role === "SELLER";
}
