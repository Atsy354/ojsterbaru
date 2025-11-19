"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

type Props = { children: ReactNode };

export default function SiteSettingsLayout({ children }: Props) {
  const pathname = usePathname();

  const tabs = [
    { href: "/admin/site-settings/site-setup", label: "Setup" },
    { href: "/admin/site-settings/site-setup/languages", label: "Languages" },
    { href: "/admin/site-settings/site-setup/bulk-emails", label: "Bulk Emails" },
    { href: "/admin/site-settings/site-setup/navigation", label: "Navigation" },
  ];

  return (
    <div className="bg-white rounded p-6">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Site Settings</h1>
      </div>
      <nav className="space-x-4 mb-6 text-sm">
        {tabs.map((t) => {
          const active = pathname === t.href;
          return (
            <Link
              key={t.href}
              href={t.href}
              className={`${active ? "text-[#006798] font-semibold" : "text-[#006798] hover:underline"}`}
            >
              {t.label}
            </Link>
          );
        })}
      </nav>
      {children}
    </div>
  );
}