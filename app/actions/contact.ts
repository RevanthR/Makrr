"use server";

import { createContact as dbCreateContact } from "@/lib/db/queries";

export type ContactFormState = {
  success?: boolean;
  error?: string;
};

export async function submitContactForm(formData: FormData): Promise<ContactFormState> {
  const name = formData.get("name") as string;
  const email = formData.get("email") as string;
  const phone = (formData.get("phone") as string) || undefined;
  const serviceType = (formData.get("serviceType") as string) || undefined;
  const budgetRange = (formData.get("budgetRange") as string) || undefined;
  const message = (formData.get("message") as string) || undefined;

  if (!name?.trim()) {
    return { error: "Your name is required." };
  }
  if (!email?.trim()) {
    return { error: "Email is required." };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email.trim())) {
    return { error: "Please enter a valid email." };
  }

  try {
    await dbCreateContact({
      name: name.trim(),
      email: email.trim(),
      phone: phone?.trim() || null,
      serviceType: serviceType || null,
      budgetRange: budgetRange || null,
      message: message?.trim() || null,
    });
    return { success: true };
  } catch (e) {
    console.error("Contact form error:", e);
    return { error: "Something went wrong. Please try again or message us on WhatsApp." };
  }
}
