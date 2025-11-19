import { PageHeader } from "@/components/admin/page-header";

export default function PublicationsStatisticsPage() {
  return (
    <section className="space-y-10">
      <PageHeader
        title="Publications Statistics"
        subtitle="Statistik publikasi untuk jurnal."
        crumbs={[
          { label: "HOME", href: "/editor/dashboard" },
          { label: "EDITORIAL", href: "/editor/dashboard" },
          { label: "STATISTICS" },
          { label: "PUBLICATIONS" },
        ]}
      />

      <div className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <p className="text-sm text-[var(--muted)]">Fitur statistik publikasi akan diimplementasikan kemudian.</p>
      </div>
    </section>
  );
}