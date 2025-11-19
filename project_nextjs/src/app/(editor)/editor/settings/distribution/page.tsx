import { PageHeader } from "@/components/admin/page-header";

export default async function SettingsDistributionPage() {
  return (
    <section className="space-y-8">
      <PageHeader title="Settings • Distribution" subtitle="Pengaturan distribusi yang diizinkan untuk Editor." showBreadcrumbs={false} />
      <div className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <p className="text-sm text-[var(--muted)]">Placeholder Distribution Settings. Akan mencakup: indexing, terms, privacy.</p>
      </div>
    </section>
  );
}