 "use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";

export default function ExpireSessionsPage() {
  const [status, setStatus] = useState<"idle" | "success" | "error">("idle");

  return (
    <div className="space-y-6">
      <section className="space-y-4">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Expire User Sessions
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Mengakhiri seluruh sesi pengguna yang sedang aktif. Pengguna akan diminta
          login ulang. Gunakan sebelum melakukan upgrade sistem.
        </p>
      </section>

      {status === "success" && (
        <FormMessage tone="success">
          Seluruh sesi pengguna berhasil diakhiri. Pengguna harus login kembali.
        </FormMessage>
      )}
      {status === "error" && (
        <FormMessage tone="error">
          Terjadi kesalahan saat mengakhiri sesi. Silakan coba lagi.
        </FormMessage>
      )}

      <div className="rounded-lg border border-[var(--border)] bg-[var(--surface-muted)] p-5">
        <p className="text-sm text-[var(--muted)]">
          Tindakan ini bersifat langsung dan permanen. Tidak ada notifikasi yang
          dikirim ke pengguna.
        </p>
        <div className="mt-4 flex gap-3">
          <Button variant="danger" onClick={() => setStatus("success")}>
            Expire semua sesi sekarang
          </Button>
          <Button variant="secondary" onClick={() => setStatus("idle")}>
            Reset status
          </Button>
        </div>
      </div>
    </div>
  );
}

