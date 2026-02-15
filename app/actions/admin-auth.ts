"use server";

import { redirect } from "next/navigation";
import { verifyPassword, setSession, clearSession } from "@/lib/auth";

export async function loginAction(
  _prev: string | null,
  formData: FormData
): Promise<string | null> {
  const password = formData.get("password") as string;
  if (!password) return "Password is required.";
  const ok = await verifyPassword(password);
  if (!ok) return "Invalid password.";
  await setSession();
  redirect("/admin");
}

export async function logoutAction() {
  await clearSession();
  redirect("/admin/login");
}
