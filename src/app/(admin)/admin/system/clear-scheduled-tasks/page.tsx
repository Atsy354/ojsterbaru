"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { FormMessage } from "@/components/ui/form-message";

const MOCK_LOGS = [
  { id: "log-1", name: "Reminder email", executedAt: "2025-03-10 02:00" },
  { id: "log-2", name: "Subscription renewal", executedAt: "2025-03-09 04:30" },
  { id: "log-3", name: "Usage statistics", executedAt: "2025-03-08 23:45" },
];

export default function ClearScheduledTaskLogsPage() {
  const [status, setStatus] = useState<"idle" | "success">("idle");

  return (
    <div className="space-y-6">
      <header className="space-y-2">
        <h2 className="text-xl font-semibold text-[var(--foreground)]">
          Clear Scheduled Task Execution Logs
        </h2>
        <p className="text-sm text-[var(--muted)]">
          Hapus file log eksekusi tugas terjadwal dari server. Anda dapat
          melakukan ini untuk menghemat ruang penyimpanan.
        </p>
      </header>

      {status === "success" && (
        <FormMessage tone="success">
          Log tugas terjadwal berhasil dihapus.
        </FormMessage>
      )}

      <div className="overflow-hidden rounded-lg border border-[var(--border)] bg-white shadow-sm">
        <table className="min-w-full divide-y divide-[var(--border)]">
          <thead className="bg-[var(--surface-muted)]">
            <tr>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                Nama tugas
              </th>
              <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                Eksekusi terakhir
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[var(--border)]">
            {MOCK_LOGS.map((log) => (
              <tr key={log.id}>
                <td className="px-4 py-3 text-sm text-[var(--foreground)]">
                  {log.name}
                </td>
                <td className="px-4 py-3 text-sm text-[var(--muted)]">
                  {log.executedAt}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <Button variant="danger" onClick={() => setStatus("success")}>
        Clear Logs
      </Button>
    </div>
  );
}

