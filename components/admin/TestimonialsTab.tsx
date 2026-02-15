"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  createTestimonial,
  updateTestimonial,
  deleteTestimonial,
} from "@/app/actions/admin-testimonials";
import type { Testimonial } from "@/lib/db/schema";

type SerializedTestimonial = {
  [K in keyof Testimonial]: Testimonial[K] extends Date ? string : Testimonial[K];
};

export function TestimonialsTab({
  testimonials,
  setTestimonials,
}: {
  testimonials: SerializedTestimonial[];
  setTestimonials: (
    fn: (prev: SerializedTestimonial[]) => SerializedTestimonial[]
  ) => void;
}) {
  const [editingId, setEditingId] = useState<number | null>(null);
  const [isNew, setIsNew] = useState(false);
  const router = useRouter();

  const editing = editingId
    ? testimonials.find((t) => t.id === editingId)
    : null;

  async function handleSubmit(formData: FormData) {
    if (editingId) {
      await updateTestimonial(editingId, formData);
      setEditingId(null);
    } else {
      await createTestimonial(formData);
      setIsNew(false);
    }
    router.refresh();
  }

  async function handleDelete(id: number) {
    if (!confirm("Delete this testimonial?")) return;
    await deleteTestimonial(id);
    setTestimonials((prev) => prev.filter((t) => t.id !== id));
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
        Add testimonial
      </button>
      <div className="mt-4 space-y-2">
        {testimonials.map((t) => (
          <div
            key={t.id}
            className="flex items-center justify-between rounded border border-gray-200 bg-white p-4"
          >
            <div>
              <p className="font-medium text-gray-900">{t.clientName}</p>
              <p className="text-sm text-gray-600 line-clamp-1">{t.quote}</p>
            </div>
            <div className="flex gap-2">
              <button
                type="button"
                onClick={() => {
                  setEditingId(t.id);
                  setIsNew(false);
                }}
                className="text-sm text-gray-600 hover:text-gray-900"
              >
                Edit
              </button>
              <button
                type="button"
                onClick={() => handleDelete(t.id)}
                className="text-sm text-red-600 hover:text-red-800"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
      {(editing || isNew) && (
        <TestimonialForm
          testimonial={editing || undefined}
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

function TestimonialForm({
  testimonial,
  onClose,
  onSubmit,
  onDelete,
}: {
  testimonial?: SerializedTestimonial;
  onClose: () => void;
  onSubmit: (formData: FormData) => Promise<void>;
  onDelete?: () => void;
}) {
  const [pending, setPending] = useState(false);

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setPending(true);
    await onSubmit(new FormData(e.currentTarget));
    setPending(false);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="max-h-[90vh] w-full max-w-lg overflow-auto rounded-lg bg-white p-6 shadow-xl">
        <h3 className="font-heading text-lg font-semibold text-gray-900">
          {testimonial ? "Edit testimonial" : "New testimonial"}
        </h3>
        <form onSubmit={handleSubmit} className="mt-4 space-y-3">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Client name *
            </label>
            <input
              name="clientName"
              required
              defaultValue={testimonial?.clientName}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Title (e.g. Brew & Co.)
            </label>
            <input
              name="clientTitle"
              defaultValue={testimonial?.clientTitle ?? ""}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Quote *
            </label>
            <textarea
              name="quote"
              required
              rows={4}
              defaultValue={testimonial?.quote}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Avatar image
            </label>
            <input
              name="avatar"
              type="file"
              accept="image/*"
              className="mt-1 w-full text-sm text-gray-600"
            />
            {testimonial?.avatarUrl && (
              <p className="mt-1 text-xs text-gray-500">
                Current: {testimonial.avatarUrl}
              </p>
            )}
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Display order
            </label>
            <input
              name="displayOrder"
              type="number"
              defaultValue={testimonial?.displayOrder ?? 0}
              className="mt-1 w-full rounded border border-gray-300 px-3 py-2 text-gray-900"
            />
          </div>
          <div className="flex items-center gap-2">
            <input
              name="isPublished"
              type="checkbox"
              defaultChecked={testimonial?.isPublished ?? true}
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
