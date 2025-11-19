import Link from "next/link";

import { AdminActionLink } from "@/components/admin/admin-action-link";
import { PageHeader } from "@/components/admin/page-header";

const SITE_MANAGEMENT_LINKS = [
  {
    label: "Hosted Journals",
    href: "/admin/site-management/hosted-journals",
  },
  {
    label: "Site Settings",
    href: "/admin/site-settings/site-setup",
  },
];

const ADMIN_FUNCTIONS_LINKS = [
  {
    label: "System Information",
    href: "/admin/system/system-information",
    actionType: "link" as const,
  },
  {
    label: "Expire User Sessions",
    href: "/admin/system/expire-sessions",
    actionType: "form" as const,
    confirmMessage: "Tindakan ini akan mengeluarkan seluruh pengguna. Lanjutkan?",
  },
  {
    label: "Clear Data Caches",
    href: "/admin/system/clear-data-caches",
    actionType: "form" as const,
  },
  {
    label: "Clear Template Cache",
    href: "/admin/system/clear-template-cache",
    actionType: "form" as const,
  },
  {
    label: "Clear Scheduled Task Execution Logs",
    href: "/admin/system/clear-scheduled-tasks",
    actionType: "form" as const,
  },
];

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Site Administration"
        subtitle="Kelola jurnal yang di-host dan akses fungsi administratif."
        showBreadcrumbs={false}
      />
      <div className="rounded-md border border-[var(--border)] bg-white px-6 py-5 shadow-sm">
        <div className="mb-4 rounded-md bg-[#eef2f7] px-4 py-3 text-base font-semibold text-[var(--foreground)]">
          Site Administration
        </div>
        <div className="space-y-6">
          <div>
            <h2 className="mb-3 text-base font-bold text-[var(--foreground)]">Site Management</h2>
            <div className="space-y-1">
              {SITE_MANAGEMENT_LINKS.map((link) => (
                <div key={link.href}>
                  <Link href={link.href} className="text-sm text-[var(--primary)] underline hover:no-underline">
                    {link.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="mb-3 text-base font-bold text-[var(--foreground)]">Administrative Functions</h2>
            <div className="space-y-1">
              {ADMIN_FUNCTIONS_LINKS.map((link) => (
                <div key={link.href}>
                  {link.actionType === "form" ? (
                    <AdminActionLink href={link.href} confirmMessage={link.confirmMessage}>
                      {link.label}
                    </AdminActionLink>
                  ) : (
                    <Link href={link.href} className="text-sm text-[var(--primary)] underline hover:no-underline">
                      {link.label}
                    </Link>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
