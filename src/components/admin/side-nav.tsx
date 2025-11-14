"use client";
import Image from "next/image";
import { useEffect, useState } from "react";

export function SideNav() {
  const [hasLogo, setHasLogo] = useState(true);
  useEffect(() => {
    fetch("/images/logo.png", { method: "HEAD" })
      .then((r) => setHasLogo(r.ok))
      .catch(() => setHasLogo(false));
  }, []);
  return (
    <aside className="hidden w-72 flex-col border-r border-[var(--border)] bg-[#0a2d44] text-white lg:flex">
      <div className="px-6 py-6">
        <div className="flex flex-col items-start">
          {hasLogo ? (
            <Image
              src="/images/logo.png"
              alt="Open Journal Systems"
              width={150}
              height={110}
              priority
              style={{ height: "auto", width: "150px" }}
            />
          ) : (
            <svg width="160" height="130" viewBox="0 0 240 140" aria-hidden="true">
              <text x="120" y="76" fill="white" fontSize="72" fontFamily="serif" textAnchor="middle">OJS</text>
              <text x="120" y="106" fill="white" fontSize="14" fontFamily="serif" textAnchor="middle" letterSpacing="2">OPEN JOURNAL SYSTEMS</text>
              <rect x="40" y="112" width="160" height="3" fill="white" />
            </svg>
          )}
        </div>
      </div>

      <div className="px-6 pb-5 text-lg font-semibold tracking-wide">Administration</div>
    </aside>
  );
}

