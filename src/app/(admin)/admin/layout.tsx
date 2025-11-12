import type { ReactNode } from "react";

import { SideNav } from "@/components/admin/side-nav";
import { TopBar } from "@/components/admin/top-bar";

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-[var(--surface-muted)]">
      <TopBar />
      <div className="flex min-h-[calc(100vh-4rem)]">
        <SideNav />
        <main className="flex-1 bg-white px-8 py-10">
          <div className="mx-auto max-w-5xl space-y-10">{children}</div>
        </main>
      </div>
    </div>
  );
}

