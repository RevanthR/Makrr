import { redirect } from "next/navigation";
import { isAuthenticated } from "@/lib/auth";
import { AdminLoginForm } from "./AdminLoginForm";

export default async function AdminLoginPage() {
  if (await isAuthenticated()) {
    redirect("/admin");
  }
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100 px-4">
      <div className="w-full max-w-sm rounded-lg border border-gray-200 bg-white p-8 shadow-sm">
        <h1 className="font-heading text-xl font-semibold text-gray-900">
          Makrr Admin
        </h1>
        <p className="mt-1 text-sm text-gray-500">Sign in to continue.</p>
        <AdminLoginForm />
      </div>
    </div>
  );
}
