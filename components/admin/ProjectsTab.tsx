"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createProject,
  updateProject,
  deleteProject,
} from "@/app/actions/admin-projects";
import type { Project } from "@/lib/db/schema";

type SerializedProject = {
  [K in keyof Project]: Project[K] extends Date ? string : Project[K];
};

const PROJECT_TYPES = [
  "Website",
  "Web App",
  "AI Agents + Content",
  "Website + Content",
  "MVP",
  "Content",
] as const;

export function ProjectsTab({
  projects,
  setProjects,
}: {
  projects: SerializedProject[];
  setProjects: (fn: (prev: SerializedProject[]) => SerializedProject[]) => void;
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isNew, setIsNew] = useState(false);
  const router = useRouter();

  const editing = editingId
    ? projects.find((p) => p.id === editingId)
    : null;

  async function handleSubmit(formData: FormData) {
    if (editingId) {
      await updateProject(editingId, formData);
      setEditingId(null);
    } else {
      await createProject(formData);
      setIsNew(false);
    }
    router.refresh();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this project?")) return;
    await deleteProject(id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
    setEditingId(null);
    router.refresh();
  }

  return (
    <div className="mt-6">
      <button
        type="button"
        onClick={() => {
          setIsNew(true);
          setEditingId(null);
        }}
        className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800"
      >
        Add project
      </button>
      <div className="mt-4 space-y-2">
        {projects.map((p) => (
          <div
            key={p.id}
            className="flex items-center justify-between rounded border border-gray-200 bg-white p-4"
          >
            <div>
              <span className="font-medium text-gray-900">{p.projectName}</span>
              <span className="ml-2 text-sm text-gray-500">{p.projectType}</span>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditingId(p.id);
                  setIsNew(false);
                }}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(p.id)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {(editing || isNew) && (
        <ProjectForm
          project={editing || undefined}
          onClose={() => {
            setEditingId(null);
            setIsNew(false);
          }}
          onSubmit={handleSubmit}
          onDelete={editingId ? () => handleDelete(editingId) : undefined}
        />
      )}
    </div>
  );
}

function ProjectForm({
  project,
  onClose,
  onSubmit,
  onDelete,
}: {
  project?: SerializedProject;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  onDelete?: () => void;
}) {
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    const form = e.currentTarget;
    await onSubmit(new FormData(form));
    setPending(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-lg bg-white p-6 shadow-xl">
        <h3 className="font-heading text-lg font-semibold text-gray-900">
          {project ? "Edit project" : "New project"}
        </h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Project name *
            </label>
            <input
              name="projectName"
              required
              defaultValue={project?.projectName}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client name
            </label>
            <input
              name="clientName"
              defaultValue={project?.clientName ?? ""}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Type *
            </label>
            <select
              name="projectType"
              required
              defaultValue={project?.projectType}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
            >
              {PROJECT_TYPES.map((t) => (
                <option key={t} value={t}>
                  {t}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Description
            </label>
            <textarea
              name="description"
              rows={3}
              defaultValue={project?.description ?? ""}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Result metric
            </label>
            <input
              name="resultMetric"
              defaultValue={project?.resultMetric ?? ""}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Gradient colors (e.g. from-amber-900/30 to-amber-700/20)
            </label>
            <input
              name="gradientColors"
              defaultValue={project?.gradientColors ?? ""}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Image
            </label>
            <input
              name="image"
              type="file"
              accept="image/*"
              className="mt-1 w-full text-sm text-gray-600"
            />
            {project?.imageUrl && (
              <p className="mt-1 text-xs text-gray-500">Current: {project.imageUrl}</p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Display order
            </label>
            <input
              name="displayOrder"
              type="number"
              defaultValue={project?.displayOrder ?? 0}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              name="isPublished"
              type="checkbox"
              defaultChecked={project?.isPublished ?? true}
              className="rounded border-gray-300"
            />
            <label className="text-sm text-gray-700">Published</label>
          </div>
          <div className="flex gap-2 pt-4">
            <button
              type="submit"
              disabled={pending}
              className="rounded bg-gray-900 px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 disabled:opacity-50"
            >
              {pending ? "Saving…" : "Save"}
            </button>
            <button
              type="button"
              onClick={onClose}
              className="rounded border border-gray-300 px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50"
            >
              Cancel
            </button>
            {onDelete && (
              <button
                type="button"
                onClick={onDelete}
                className="rounded border border-red-300 px-4 py-2 text-sm font-medium text-red-700 hover:bg-red-50"
              >
                Delete
              </button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}
