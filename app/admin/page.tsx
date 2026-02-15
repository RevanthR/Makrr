import { getContacts, getAllProjects, getAllTestimonials, getSiteSettings } from "@/lib/db/queries";
import { AdminDashboard } from "@/components/admin/AdminDashboard";
import { logoutAction } from "@/app/actions/admin-auth";
import Link from "next/link";

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  let contacts: Awaited<ReturnType<typeof getContacts>> = [];
  let projects: Awaited<ReturnType<typeof getAllProjects>> = [];
  let testimonials: Awaited<ReturnType<typeof getAllTestimonials>> = [];
  let settings: Awaited<ReturnType<typeof getSiteSettings>> | null = null;
  try {
    [contacts, projects, testimonials, settings] = await Promise.all([
      getContacts(),
      getAllProjects(),
      getAllTestimonials(),
      getSiteSettings(),
    ]);
  } catch (e) {
    console.error("Admin data load failed:", e);
  }
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="flex items-center justify-between border-b border-gray-200 bg-white px-6 py-4">
        <Link href="/" className="font-heading text-lg font-semibold text-gray-900">
          Makrr Admin
        </Link>
        <form action={logoutAction}>
          <button
            type="submit"
            className="text-sm text-gray-600 hover:text-gray-900"
          >
            Log out
          </button>
        </form>
      </header>
      <AdminDashboard
        initialContacts={contacts}
        initialProjects={projects}
        initialTestimonials={testimonials}
        initialSettings={settings}
      />
    </div>
  );
}
