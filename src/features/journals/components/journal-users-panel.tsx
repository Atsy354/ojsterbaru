import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { HostedJournal } from "../types";

const MOCK_USERS = [
  {
    id: "u1",
    name: "Ariana Kusuma",
    email: "ariana@example.com",
    roles: ["Journal Manager", "Editor"],
  },
  {
    id: "u2",
    name: "Budi Santoso",
    email: "budi.santoso@example.com",
    roles: ["Section Editor"],
  },
  {
    id: "u3",
    name: "Clara Wijaya",
    email: "clara.wijaya@example.com",
    roles: ["Author", "Reader"],
  },
];

type Props = {
  journal: HostedJournal;
};

export function JournalUsersPanel({ journal }: Props) {
  return (
    <div className="space-y-6">
      <div>
        <p className="text-sm text-[var(--muted)]">
          Daftar user untuk{" "}
          <span className="font-semibold text-[var(--foreground)]">
            {journal.name}
          </span>
          . Gunakan panel ini untuk menambah atau mengubah peran.
        </p>
      </div>

      <div className="rounded-md border border-[var(--border)] bg-[var(--surface-muted)] p-4">
        <Tabs defaultValue="all" onValueChange={() => {}}>
          <TabsList>
            <TabsTrigger value="all">All Users</TabsTrigger>
            <TabsTrigger value="add">Add Existing User</TabsTrigger>
            <TabsTrigger value="invite">Invite</TabsTrigger>
          </TabsList>
        </Tabs>
      </div>

      <div className="space-y-4">
        <div className="flex flex-col justify-between gap-3 md:flex-row md:items-center">
          <Input placeholder="Cari nama atau email" className="md:max-w-xs" />
          <Button size="sm" variant="secondary">
            Tambah pengguna baru
          </Button>
        </div>

        <div className="overflow-hidden rounded-md border border-[var(--border)] bg-white shadow-sm">
          <table className="min-w-full divide-y divide-[var(--border)]">
            <thead className="bg-[var(--surface-muted)]">
              <tr>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Nama
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Email
                </th>
                <th className="px-4 py-3 text-left text-xs font-semibold uppercase tracking-wide text-[var(--muted)]">
                  Peran
                </th>
                <th className="px-4 py-3" />
              </tr>
            </thead>
            <tbody className="divide-y divide-[var(--border)]">
              {MOCK_USERS.map((user) => (
                <tr key={user.id}>
                  <td className="px-4 py-3 text-sm font-semibold text-[var(--foreground)]">
                    {user.name}
                  </td>
                  <td className="px-4 py-3 text-sm text-[var(--muted)]">
                    {user.email}
                  </td>
                  <td className="px-4 py-3">
                    <div className="flex flex-wrap gap-2">
                      {user.roles.map((role) => (
                        <span
                          key={role}
                          className="inline-flex rounded-full bg-[var(--surface-muted)] px-3 py-1 text-xs font-semibold text-[var(--foreground)]"
                        >
                          {role}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-4 py-3 text-right">
                    <Button size="sm" variant="ghost">
                      Kelola
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

