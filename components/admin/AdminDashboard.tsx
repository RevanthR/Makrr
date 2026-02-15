"use client";

import { useState } from "react";
import { SubmissionsTab } from "./SubmissionsTab";
import { ProjectsTab } from "./ProjectsTab";
import { TestimonialsTab } from "./TestimonialsTab";
import type { Contact, Project, Testimonial } from "@/lib/db/schema";

type Tab = "submissions" | "projects" | "testimonials";

type Serialized<T> = {
  [K in keyof T]: T[K] extends Date ? string : T[K];
};

export function AdminDashboard({
  initialContacts,
  initialProjects,
  initialTestimonials,
}: {
  initialContacts: Serialized<Contact>[];
  initialProjects: Serialized<Project>[];
  initialTestimonials: Serialized<Testimonial>[];
}) {
  const [tab, setTab] = useState<Tab>("submissions");
  const [contacts, setContacts] = useState(initialContacts);
  const [projects, setProjects] = useState(initialProjects);
  const [testimonials, setTestimonials] = useState(initialTestimonials);

  return (
    <div className="p-6">
      <div className="flex gap-2 border-b border-gray-200">
        <button
          type="button"
          onClick={() => setTab("submissions")}
          className={`border-b-2 px-4 py-2 text-sm font-medium ${
            tab === "submissions"
              ? "border-gray-900 text-gray-900"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Submissions
        </button>
        <button
          type="button"
          onClick={() => setTab("projects")}
          className={`border-b-2 px-4 py-2 text-sm font-medium ${
            tab === "projects"
              ? "border-gray-900 text-gray-900"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Projects
        </button>
        <button
          type="button"
          onClick={() => setTab("testimonials")}
          className={`border-b-2 px-4 py-2 text-sm font-medium ${
            tab === "testimonials"
              ? "border-gray-900 text-gray-900"
              : "border-transparent text-gray-600 hover:text-gray-900"
          }`}
        >
          Testimonials
        </button>
      </div>
      {tab === "submissions" && (
        <SubmissionsTab
          contacts={contacts}
          setContacts={setContacts}
        />
      )}
      {tab === "projects" && (
        <ProjectsTab
          projects={projects}
          setProjects={setProjects}
        />
      )}
      {tab === "testimonials" && (
        <TestimonialsTab
          testimonials={testimonials}
          setTestimonials={setTestimonials}
        />
      )}
    </div>
  );
}
