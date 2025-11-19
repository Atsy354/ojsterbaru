"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";

// Simplified admin section layout without external components

type Props = {
  children: ReactNode;
};

export default function AdminLayout({ children }: Props) {
  return (
    <div className="min-h-screen bg-white">
      <main className="flex-1 px-8 py-10">
        <div className="mx-auto max-w-5xl space-y-10">{children}</div>
      </main>
    </div>
  );
}
export const dynamic = "force-dynamic";

