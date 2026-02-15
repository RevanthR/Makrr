"use client";

import { useState } from "react";
import { updateSubmissionStatus } from "@/app/actions/admin-submissions";
import { useRouter } from "next/navigation";
import type { Contact } from "@/lib/db/schema";

type SerializedContact = {
  [K in keyof Contact]: Contact[K] extends Date ? string : Contact[K];
};

const STATUS_OPTIONS = ["new", "contacted", "in_progress", "done"] as const;

export function SubmissionsTab({
  contacts,
  setContacts,
}: {
  contacts: SerializedContact[];
  setContacts: (fn: (prev: SerializedContact[]) => SerializedContact[]) => void;
}) {
  const [search, setSearch] = useState("");
  const [detailId, setDetailId] = useState<number | null>(null);
  const router = useRouter();

  const filtered = contacts.filter(
    (c) =>
      !search.trim() ||
      c.name.toLowerCase().includes(search.toLowerCase()) ||
      (c.serviceType || "").toLowerCase().includes(search.toLowerCase())
  );

  const selected = detailId ? contacts.find((c) => c.id === detailId) : null;

  async function handleStatusChange(id: number, status: string) {
    await updateSubmissionStatus(id, status);
    setContacts((prev) =>
      prev.map((c) =>
        c.id === id ? { ...c, status, isRead: true } : c
      )
    );
    router.refresh();
  }

  return (
    <div className="mt-6">
      <div className="mb-4">
        <input
          type="search"
          placeholder="Search by name or service..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-sm rounded border border-gray-300 px-3 py-2 text-sm text-gray-900"
        />
      </div>
      <div className="overflow-x-auto rounded border border-gray-200 bg-white">
        <table className="min-w-full text-left text-sm">
          <thead className="border-b border-gray-200 bg-gray-50">
            <tr>
              <th className="px-4 py-3 font-medium text-gray-900">Name</th>
              <th className="px-4 py-3 font-medium text-gray-900">Email</th>
              <th className="px-4 py-3 font-medium text-gray-900">WhatsApp</th>
              <th className="px-4 py-3 font-medium text-gray-900">Service</th>
              <th className="px-4 py-3 font-medium text-gray-900">Budget</th>
              <th className="px-4 py-3 font-medium text-gray-900">Date</th>
              <th className="px-4 py-3 font-medium text-gray-900">Status</th>
            </tr>
          </thead>
          <tbody>
            {filtered.map((c) => (
              <tr
                key={c.id}
                onClick={() => setDetailId(c.id)}
                className={`cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${
                  !c.isRead ? "font-semibold" : ""
                }`}
              >
                <td className="px-4 py-3 text-gray-900">{c.name}</td>
                <td className="px-4 py-3 text-gray-600">{c.email}</td>
                <td className="px-4 py-3 text-gray-600">{c.phone || "—"}</td>
                <td className="px-4 py-3 text-gray-600">{c.serviceType || "—"}</td>
                <td className="px-4 py-3 text-gray-600">{c.budgetRange || "—"}</td>
                <td className="px-4 py-3 text-gray-600">
                  {typeof c.createdAt === "string"
                    ? new Date(c.createdAt).toLocaleDateString()
                    : "—"}
                </td>
                <td className="px-4 py-3" onClick={(e) => e.stopPropagation()}>
                  <select
                    value={c.status || "new"}
                    onChange={(e) => handleStatusChange(c.id, e.target.value)}
                    className="rounded border border-gray-300 bg-white px-2 py-1 text-gray-900"
                  >
                    {STATUS_OPTIONS.map((s) => (
                      <option key={s} value={s}>
                        {s}
                      </option>
                    ))}
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      {selected && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4"
          onClick={() => setDetailId(null)}
        >
          <div
            className="max-h-[80vh] w-full max-w-lg overflow-auto rounded-lg bg-white p-6 shadow-xl"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="flex justify-between">
              <h3 className="font-heading text-lg font-semibold text-gray-900">
                {selected.name}
              </h3>
              <button
                type="button"
                onClick={() => setDetailId(null)}
                className="text-gray-500 hover:text-gray-900"
              >
                ×
              </button>
            </div>
            <dl className="mt-4 space-y-2 text-sm">
              <div>
                <dt className="text-gray-500">Email</dt>
                <dd className="text-gray-900">{selected.email}</dd>
              </div>
              <div>
                <dt className="text-gray-500">WhatsApp</dt>
                <dd className="text-gray-900">{selected.phone || "—"}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Service</dt>
                <dd className="text-gray-900">{selected.serviceType || "—"}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Budget</dt>
                <dd className="text-gray-900">{selected.budgetRange || "—"}</dd>
              </div>
              <div>
                <dt className="text-gray-500">Message</dt>
                <dd className="mt-1 whitespace-pre-wrap text-gray-900">
                  {selected.message || "—"}
                </dd>
              </div>
            </dl>
            <div className="mt-4 flex justify-end">
              <select
                value={selected.status || "new"}
                onChange={(e) => {
                  handleStatusChange(selected.id, e.target.value);
                  setDetailId(null);
                }}
                className="rounded border border-gray-300 px-3 py-2 text-gray-900"
              >
                {STATUS_OPTIONS.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
