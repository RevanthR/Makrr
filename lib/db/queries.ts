import { eq, desc, asc } from "drizzle-orm";
import { getDb } from "./index";
import { contacts, projects, testimonials } from "./schema";
import type { NewContact, NewProject, NewTestimonial } from "./schema";

export async function createContact(data: NewContact) {
  const db = getDb();
  const [row] = await db.insert(contacts).values(data).returning();
  return row;
}

export async function getContacts() {
  const db = getDb();
  return db
    .select()
    .from(contacts)
    .orderBy(desc(contacts.createdAt));
}

export async function getContactById(id: number) {
  const db = getDb();
  const [row] = await db.select().from(contacts).where(eq(contacts.id, id));
  return row;
}

export async function updateContact(
  id: number,
  data: { status?: string; isRead?: boolean }
) {
  const db = getDb();
  const [row] = await db
    .update(contacts)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(contacts.id, id))
    .returning();
  return row;
}

export async function getPublishedProjects() {
  const db = getDb();
  return db
    .select()
    .from(projects)
    .where(eq(projects.isPublished, true))
    .orderBy(asc(projects.displayOrder));
}

export async function getAllProjects() {
  const db = getDb();
  return db.select().from(projects).orderBy(asc(projects.displayOrder));
}

export async function getProjectById(id: number) {
  const db = getDb();
  const [row] = await db.select().from(projects).where(eq(projects.id, id));
  return row;
}

export async function createProject(data: NewProject) {
  const db = getDb();
  const [row] = await db.insert(projects).values(data).returning();
  return row;
}

export async function updateProject(id: number, data: Partial<NewProject>) {
  const db = getDb();
  const [row] = await db
    .update(projects)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(projects.id, id))
    .returning();
  return row;
}

export async function deleteProject(id: number) {
  const db = getDb();
  await db.delete(projects).where(eq(projects.id, id));
}

export async function getPublishedTestimonials() {
  const db = getDb();
  return db
    .select()
    .from(testimonials)
    .where(eq(testimonials.isPublished, true))
    .orderBy(asc(testimonials.displayOrder));
}

export async function getAllTestimonials() {
  const db = getDb();
  return db
    .select()
    .from(testimonials)
    .orderBy(asc(testimonials.displayOrder));
}

export async function getTestimonialById(id: number) {
  const db = getDb();
  const [row] = await db
    .select()
    .from(testimonials)
    .where(eq(testimonials.id, id));
  return row;
}

export async function createTestimonial(data: NewTestimonial) {
  const db = getDb();
  const [row] = await db.insert(testimonials).values(data).returning();
  return row;
}

export async function updateTestimonial(
  id: number,
  data: Partial<NewTestimonial>
) {
  const db = getDb();
  const [row] = await db
    .update(testimonials)
    .set({ ...data, updatedAt: new Date() })
    .where(eq(testimonials.id, id))
    .returning();
  return row;
}

export async function deleteTestimonial(id: number) {
  const db = getDb();
  await db.delete(testimonials).where(eq(testimonials.id, id));
}
