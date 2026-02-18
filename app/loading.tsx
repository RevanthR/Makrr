export default function Loading() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-slate-50">
      <div className="text-center">
        <div className="mx-auto h-8 w-8 animate-spin rounded-full border-2 border-violet-600 border-t-transparent" />
        <p className="mt-4 text-sm text-slate-500">Loading…</p>
      </div>
    </div>
  );
}
