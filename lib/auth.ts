import { cookies } from "next/headers";

const ADMIN_SESSION_COOKIE = "makrr_admin_session";
const SESSION_SECRET = "makrr-admin-2026";

export async function getSessionToken(): Promise<string | undefined> {
  const cookieStore = await cookies();
  return cookieStore.get(ADMIN_SESSION_COOKIE)?.value;
}

export async function isAuthenticated(): Promise<boolean> {
  const token = await getSessionToken();
  if (!token) return false;
  return token === SESSION_SECRET;
}

export async function setSession() {
  const cookieStore = await cookies();
  cookieStore.set(ADMIN_SESSION_COOKIE, SESSION_SECRET, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.delete(ADMIN_SESSION_COOKIE);
}

export async function verifyPassword(password: string): Promise<boolean> {
  const envPassword = process.env.ADMIN_PASSWORD;
  if (!envPassword) return false;
  return password === envPassword;
}
