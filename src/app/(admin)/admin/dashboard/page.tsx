import Link from "next/link";
import { ADMIN_NAV_SECTIONS } from "@/config/navigation";

export default function DashboardPage() {
  const siteManagement = ADMIN_NAV_SECTIONS.find(
    (section) => section.id === "site-management",
  );
  const adminFunctions = ADMIN_NAV_SECTIONS.find(
    (section) => section.id === "administrative-functions",
  );

  const siteLinks = (siteManagement?.items || []).filter((item) =>
    ["/admin/site-management/hosted-journals", "/admin/site-settings/site-setup"].includes(
      item.href,
    ),
  );

  return (
    <section className="space-y-8">
      <div className="rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-6 py-4 text-lg font-semibold text-[var(--foreground)]">
        Site Administration
      </div>

      <div className="rounded-md border border-[var(--border)] bg-white px-6 py-6">
        <div className="space-y-8">
          <div className="space-y-3">
            <h2 className="text-xl font-semibold text-[var(--foreground)]">Site Management</h2>
            <div className="space-y-2 text-[var(--primary)]">
              {siteLinks.map((item) => (
                <div key={item.href}>
                  <Link href={item.href} className="font-semibold hover:underline">
                    {item.label}
                  </Link>
                </div>
              ))}
            </div>
          </div>

          {adminFunctions && (
            <div className="space-y-3">
              <h2 className="text-xl font-semibold text-[var(--foreground)]">Administrative Functions</h2>
              <div className="space-y-2 text-[var(--primary)]">
                {adminFunctions.items.map((item) => (
                  <div key={item.href}>
                    <Link href={item.href} className="font-semibold hover:underline">
                      {item.label}
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}



