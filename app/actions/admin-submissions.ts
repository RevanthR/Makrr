"use server";

import { updateContact } from "@/lib/db/queries";

export async function updateSubmissionStatus(
  id: number,
  status: string
) {
  await updateContact(id, { status, isRead: true });
}

export async function markSubmissionRead(id: number) {
  await updateContact(id, { isRead: true });
}
