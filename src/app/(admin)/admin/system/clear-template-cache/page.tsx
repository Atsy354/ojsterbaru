"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";

export default function ClearTemplateCachePage() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Clear Template Cache
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Hapus versi cache dari template HTML. Berguna setelah melakukan perubahan tampilan.
        </p>
      </header>

      {status === "success" && (
        <FormMessage tone="success">
          Template cache berhasil dibersihkan. Template terbaru akan dimuat saat permintaan berikutnya.
        </FormMessage>
      )}

      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-5">
        <p className="text-sm text-[var(--muted)]">
          Proses ini hanya memengaruhi file template. Tidak ada konten jurnal yang berubah.
        </p>
        <Button className="mt-4" onClick={() => setStatus("success")}>
          Clear Template Cache
        </Button>
      </div>
    </div>
  );
}

