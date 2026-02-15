import {
  pgTable,
  serial,
  varchar,
  text,
  timestamp,
  boolean,
  integer,
} from "drizzle-orm/pg-core";

export const contacts = pgTable("contacts", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  email: varchar("email", { length: 255 }).notNull(),
  phone: varchar("phone", { length: 30 }),
  serviceType: varchar("service_type", { length: 100 }),
  budgetRange: varchar("budget_range", { length: 50 }),
  message: text("message"),
  status: varchar("status", { length: 20 }).default("new"),
  isRead: boolean("is_read").default(false),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const projects = pgTable("projects", {
  id: serial("id").primaryKey(),
  projectName: varchar("project_name", { length: 255 }).notNull(),
  clientName: varchar("client_name", { length: 255 }),
  projectType: varchar("project_type", { length: 50 }).notNull(),
  description: text("description"),
  resultMetric: varchar("result_metric", { length: 255 }),
  gradientColors: varchar("gradient_colors", { length: 100 }),
  imageUrl: text("image_url"),
  isPublished: boolean("is_published").default(true),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const testimonials = pgTable("testimonials", {
  id: serial("id").primaryKey(),
  clientName: varchar("client_name", { length: 255 }).notNull(),
  clientTitle: varchar("client_title", { length: 255 }),
  quote: text("quote").notNull(),
  avatarUrl: text("avatar_url"),
  isPublished: boolean("is_published").default(true),
  displayOrder: integer("display_order").default(0),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export type Contact = typeof contacts.$inferSelect;
export type NewContact = typeof contacts.$inferInsert;
export type Project = typeof projects.$inferSelect;
export type NewProject = typeof projects.$inferInsert;
export type Testimonial = typeof testimonials.$inferSelect;
export type NewTestimonial = typeof testimonials.$inferInsert;
