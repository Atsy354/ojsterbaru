"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import type { ReactNode } from "react";

const SYSTEM_LINKS = [
  { href: "/admin/system/system-information", label: "System Information" },
  { href: "/admin/system/expire-sessions", label: "Expire User Sessions" },
  { href: "/admin/system/clear-data-caches", label: "Clear Data Caches" },
  { href: "/admin/system/clear-template-cache", label: "Clear Template Cache" },
  {
    href: "/admin/system/clear-scheduled-tasks",
    label: "Clear Scheduled Task Execution Logs",
  },
];

type Props = {
  children: ReactNode;
};

export default function SystemLayout({ children }: Props) {
  const pathname = usePathname();

  return (
    <div className="bg-white rounded p-6">
      <div className="border-b border-gray-200 pb-4 mb-6">
        <h1 className="text-2xl font-bold text-gray-900">Administrative Functions</h1>
      </div>
      <div className="grid gap-4 md:grid-cols-[250px_1fr]">
        <aside className="space-y-2 rounded border border-gray-200 bg-white p-4">
          {SYSTEM_LINKS.map((link) => {
            const active = pathname === link.href;
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`block px-3 py-2 text-sm ${
                  active ? "text-[#006798] font-semibold" : "text-[#006798] hover:underline"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
        </aside>
        <div className="rounded border border-gray-200 bg-white p-6">
          {children}
        </div>
      </div>
    </div>
  );
}