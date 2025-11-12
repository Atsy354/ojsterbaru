"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { ADMIN_NAV_SECTIONS } from "@/config/navigation";
import { cn } from "@/lib/utils";

export function SideNav() {
  const pathname = usePathname();

  return (
    <aside className="hidden w-72 flex-col border-r border-[var(--border)] bg-[#0a2d44] text-white lg:flex">
      <div className="px-6 py-5 text-lg font-semibold tracking-wide">
        Administration
      </div>
      <nav className="flex-1 space-y-6 px-2 pb-8">
        {ADMIN_NAV_SECTIONS.map((section) => (
          <div key={section.id} className="space-y-2">
            <div className="px-4 text-xs font-bold uppercase tracking-wider text-white/60">
              {section.label}
            </div>
            <ul className="space-y-1">
              {section.items.map((item) => {
                const isActive =
                  pathname === item.href ||
                  (pathname.startsWith(item.href) && item.href !== "/admin/dashboard") ||
                  (item.href === "/admin/site-management/hosted-journals" &&
                    pathname === "/admin/site-management");

                return (
                  <li key={item.href}>
                    <Link
                      href={item.href}
                      className={cn(
                        "block rounded-md px-4 py-2 text-sm font-semibold transition-colors hover:bg-white/10",
                        isActive && "bg-white/15 text-white",
                        !isActive && "text-white/80",
                      )}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

