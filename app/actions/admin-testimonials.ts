"use server";

import { revalidateTag } from "next/cache";
import { put } from "@vercel/blob";
import {
  createTestimonial as dbCreateTestimonial,
  updateTestimonial as dbUpdateTestimonial,
  deleteTestimonial as dbDeleteTestimonial,
} from "@/lib/db/queries";

export async function createTestimonial(formData: FormData) {
  const clientName = formData.get("clientName") as string;
  const clientTitle = (formData.get("clientTitle") as string) || undefined;
  const quote = formData.get("quote") as string;
  const displayOrder = parseInt(String(formData.get("displayOrder") || "0"), 10);
  const isPublished = formData.get("isPublished") === "on";
  const file = formData.get("avatar") as File | null;
  let avatarUrl: string | null = null;
  if (file?.size) {
    const blob = await put(`testimonials/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    avatarUrl = blob.url;
  }
  await dbCreateTestimonial({
    clientName,
    clientTitle: clientTitle || null,
    quote,
    avatarUrl,
    isPublished,
    displayOrder,
  });
  revalidateTag("testimonials");
}

export async function updateTestimonial(id: number, formData: FormData) {
  const clientName = formData.get("clientName") as string;
  const clientTitle = (formData.get("clientTitle") as string) || undefined;
  const quote = formData.get("quote") as string;
  const displayOrder = parseInt(String(formData.get("displayOrder") || "0"), 10);
  const isPublished = formData.get("isPublished") === "on";
  const file = formData.get("avatar") as File | null;
  let avatarUrl: string | undefined;
  if (file?.size) {
    const blob = await put(`testimonials/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    avatarUrl = blob.url;
  }
  const data: {
    clientName: string;
    clientTitle: string | null;
    quote: string;
    displayOrder: number;
    isPublished: boolean;
    avatarUrl?: string;
  } = {
    clientName,
    clientTitle: clientTitle || null,
    quote,
    displayOrder,
    isPublished,
  };
  if (avatarUrl !== undefined) data.avatarUrl = avatarUrl;
  await dbUpdateTestimonial(id, data);
  revalidateTag("testimonials");
}

export async function deleteTestimonial(id: number) {
  await dbDeleteTestimonial(id);
  revalidateTag("testimonials");
}
