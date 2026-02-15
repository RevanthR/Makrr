"use server";

import { updateSiteSettings } from "@/lib/db/queries";

export type SettingsFormState = { success?: boolean; error?: string };

export async function updateSettingsAction(formData: FormData): Promise<SettingsFormState> {
  const whatsappNumber = (formData.get("whatsappNumber") as string)?.trim() || null;
  const whatsappMessage = (formData.get("whatsappMessage") as string)?.trim() || null;
  const email = (formData.get("email") as string)?.trim() || null;
  const instagramUrl = (formData.get("instagramUrl") as string)?.trim() || null;
  const linkedinUrl = (formData.get("linkedinUrl") as string)?.trim() || null;

  try {
    await updateSiteSettings({
      whatsappNumber,
      whatsappMessage,
      email,
      instagramUrl,
      linkedinUrl,
    });
    return { success: true };
  } catch (e) {
    console.error("Settings update error:", e);
    return { error: "Failed to save settings. Please try again." };
  }
}
