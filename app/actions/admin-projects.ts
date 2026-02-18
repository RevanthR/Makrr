"use server";

import { revalidateTag } from "next/cache";
import { put } from "@vercel/blob";
import {
  createProject as dbCreateProject,
  updateProject as dbUpdateProject,
  deleteProject as dbDeleteProject,
} from "@/lib/db/queries";
import type { NewProject } from "@/lib/db/schema";

export async function uploadProjectImage(formData: FormData): Promise<string | null> {
  const file = formData.get("file") as File | null;
  if (!file?.size) return null;
  const blob = await put(`projects/${Date.now()}-${file.name}`, file, {
    access: "public",
  });
  return blob.url;
}

export async function createProject(formData: FormData) {
  const projectName = formData.get("projectName") as string;
  const clientName = (formData.get("clientName") as string) || undefined;
  const projectType = formData.get("projectType") as string;
  const description = (formData.get("description") as string) || undefined;
  const resultMetric = (formData.get("resultMetric") as string) || undefined;
  const gradientColors = (formData.get("gradientColors") as string) || undefined;
  const displayOrder = parseInt(String(formData.get("displayOrder") || "0"), 10);
  const isPublished = formData.get("isPublished") === "on";
  const file = formData.get("image") as File | null;
  let imageUrl: string | null = null;
  if (file?.size) {
    const blob = await put(`projects/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    imageUrl = blob.url;
  }
  await dbCreateProject({
    projectName,
    clientName: clientName || null,
    projectType,
    description: description || null,
    resultMetric: resultMetric || null,
    gradientColors: gradientColors || null,
    imageUrl,
    isPublished,
    displayOrder,
  });
  revalidateTag("projects");
}

export async function updateProject(id: number, formData: FormData) {
  const projectName = formData.get("projectName") as string;
  const clientName = (formData.get("clientName") as string) || undefined;
  const projectType = formData.get("projectType") as string;
  const description = (formData.get("description") as string) || undefined;
  const resultMetric = (formData.get("resultMetric") as string) || undefined;
  const gradientColors = (formData.get("gradientColors") as string) || undefined;
  const displayOrder = parseInt(String(formData.get("displayOrder") || "0"), 10);
  const isPublished = formData.get("isPublished") === "on";
  const file = formData.get("image") as File | null;
  let imageUrl: string | undefined;
  if (file?.size) {
    const blob = await put(`projects/${Date.now()}-${file.name}`, file, {
      access: "public",
    });
    imageUrl = blob.url;
  }
  const data: Partial<NewProject> = {
    projectName,
    clientName: clientName || null,
    projectType,
    description: description || null,
    resultMetric: resultMetric || null,
    gradientColors: gradientColors || null,
    displayOrder,
    isPublished,
  };
  if (imageUrl !== undefined) data.imageUrl = imageUrl;
  await dbUpdateProject(id, data);
  revalidateTag("projects");
}

export async function deleteProject(id: number) {
  await dbDeleteProject(id);
  revalidateTag("projects");
}
