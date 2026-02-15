"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { updateSettingsAction } from "@/app/actions/admin-settings";
import type { SiteSettings } from "@/lib/db/schema";

type SerializedSettings = SiteSettings | null;

export function SettingsTab({ initial }: { initial: SerializedSettings }) {
  const [state, setState] = useState<{ success?: boolean; error?: string } | null>(null);
  const [isPending, setIsPending] = useState(false);
  const router = useRouter();

  async function handleSubmit(formData: FormData) {
    setState(null);
    setIsPending(true);
    const result = await updateSettingsAction(formData);
    setState(result);
    setIsPending(false);
    if (result.success) router.refresh();
  }

  const s = initial;
  const defaultWhatsapp = s?.whatsappNumber ?? "";
  const defaultMessage = s?.whatsappMessage ?? "Hi, I'd like to discuss a project with Makrr.";
  const defaultEmail = s?.email ?? "hello@makrr.in";
  const defaultInstagram = s?.instagramUrl ?? "https://instagram.com/makrr.in";
  const defaultLinkedin = s?.linkedinUrl ?? "https://linkedin.com/company/makrr";

  return (
    <div className="mt-6 max-w-xl">
      <p className="mb-4 text-sm text-gray-600">
        These links appear in the footer and contact section. WhatsApp number and message are used to open a pre-filled chat when visitors click WhatsApp.
      </p>
      {state?.success && (
        <p className="mb-4 text-sm font-medium text-green-700">Settings saved.</p>
      )}
      {state?.error && (
        <p className="mb-4 text-sm text-red-600">{state.error}</p>
      )}
      <form
        onSubmit={async (e) => {
          e.preventDefault();
          await handleSubmit(new FormData(e.currentTarget));
        }}
        className="space-y-4"
      >
        <div>
          <label htmlFor="whatsappNumber" className="block text-sm font-medium text-gray-700">
            WhatsApp number
          </label>
          <input
            id="whatsappNumber"
            name="whatsappNumber"
            type="text"
            defaultValue={defaultWhatsapp}
            placeholder="919876543210 (country code + number, no + or spaces)"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="whatsappMessage" className="block text-sm font-medium text-gray-700">
            WhatsApp default message
          </label>
          <textarea
            id="whatsappMessage"
            name="whatsappMessage"
            rows={3}
            defaultValue={defaultMessage}
            placeholder="Pre-filled message when visitor clicks WhatsApp"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm font-medium text-gray-700">
            Email (mailto link)
          </label>
          <input
            id="email"
            name="email"
            type="text"
            defaultValue={defaultEmail}
            placeholder="hello@makrr.in"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="instagramUrl" className="block text-sm font-medium text-gray-700">
            Instagram URL
          </label>
          <input
            id="instagramUrl"
            name="instagramUrl"
            type="url"
            defaultValue={defaultInstagram}
            placeholder="https://instagram.com/makrr.in"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <div>
          <label htmlFor="linkedinUrl" className="block text-sm font-medium text-gray-700">
            LinkedIn URL
          </label>
          <input
            id="linkedinUrl"
            name="linkedinUrl"
            type="url"
            defaultValue={defaultLinkedin}
            placeholder="https://linkedin.com/company/makrr"
            className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-sm"
          />
        </div>
        <button
          type="submit"
          disabled={isPending}
          className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
        >
          {isPending ? "Saving…" : "Save settings"}
        </button>
      </form>
    </div>
  );
}
