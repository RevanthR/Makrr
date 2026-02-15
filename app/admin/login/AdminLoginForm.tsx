"use client";

import { useFormState } from "react-dom";
import { loginAction } from "@/app/actions/admin-auth";

export function AdminLoginForm() {
  const [error, formAction] = useFormState(loginAction, null as string | null);

  return (
    <form action={formAction} className="mt-6 space-y-4">
      <div>
        <label htmlFor="password" className="block text-sm font-medium text-gray-700">
          Password
        </label>
        <input
          id="password"
          name="password"
          type="password"
          required
          autoComplete="current-password"
          className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900 focus:border-amber-500 focus:outline-none focus:ring-1 focus:ring-amber-500"
        />
      </div>
      {error && (
        <p className="text-sm text-red-600">{error}</p>
      )}
      <button
        type="submit"
        className="w-full rounded bg-gray-900 px-4 py-2 font-medium text-white hover:bg-gray-800"
      >
        Sign in
      </button>
    </form>
  );
}
