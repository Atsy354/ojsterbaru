import { PageHeader } from "@/components/admin/page-header";

export default function UsersStatisticsPage() {
  return (
    <section className="space-y-10">
      <PageHeader
        title="Users Statistics"
        subtitle="Statistik pengguna untuk jurnal."
        crumbs={[
          { label: "HOME", href: "/editor/dashboard" },
          { label: "EDITORIAL", href: "/editor/dashboard" },
          { label: "STATISTICS" },
          { label: "USERS" },
        ]}
      />

      <div className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <p className="text-sm text-[var(--muted)]">Fitur statistik pengguna akan diimplementasikan kemudian.</p>
      </div>
    </section>
  );
}