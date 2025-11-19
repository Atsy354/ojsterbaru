import { PageHeader } from "@/components/admin/page-header";

export default function WebsiteSettingsPage() {
  return (
    <section className="space-y-10">
      <PageHeader
        title="Settings: Website"
        subtitle="Kelola pengaturan website jurnal."
        crumbs={[
          { label: "HOME", href: "/editor/dashboard" },
          { label: "EDITORIAL", href: "/editor/dashboard" },
          { label: "SETTINGS" },
          { label: "WEBSITE" },
        ]}
      />

      <div className="rounded-lg border border-[var(--border)] bg-white p-6 shadow-sm">
        <p className="text-sm text-[var(--muted)]">Fitur pengaturan website akan diimplementasikan kemudian.</p>
      </div>
    </section>
  );
}