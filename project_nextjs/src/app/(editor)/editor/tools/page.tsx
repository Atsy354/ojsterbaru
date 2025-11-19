import { PageHeader } from "@/components/admin/page-header";

export default async function ToolsPage() {
  return (
    <section className="space-y-8">
      <PageHeader title="Tools" subtitle="Perkakas editor sesuai OJS (placeholder)." showBreadcrumbs={false} />
      <div className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <p className="text-sm text-[var(--muted)]">Placeholder Editor Tools. Contoh: impor/ekspor, laporan, utilitas workflow.</p>
      </div>
    </section>
  );
}