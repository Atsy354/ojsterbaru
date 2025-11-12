import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { PageHeader } from "@/components/admin/page-header";

export default function DashboardPage() {
  return (
    <section className="space-y-6">
      <PageHeader
        title="Submissions"
        crumbs={[
          { label: "HOME", href: "/admin/site-management" },
          { label: "SUBMISSIONS" },
        ]}
      />

      <Tabs defaultValue="myQueue" className="w-full">
        <TabsList className="grid w-full grid-cols-4">
          <TabsTrigger value="myQueue">
            My Queue <span className="ml-2 rounded-full bg-[var(--primary)] px-2 py-0.5 text-xs text-white">0</span>
          </TabsTrigger>
          <TabsTrigger value="unassigned">
            Unassigned <span className="ml-2 rounded-full bg-[var(--primary)] px-2 py-0.5 text-xs text-white">0</span>
          </TabsTrigger>
          <TabsTrigger value="active">
            Active <span className="ml-2 rounded-full bg-[var(--primary)] px-2 py-0.5 text-xs text-white">0</span>
          </TabsTrigger>
          <TabsTrigger value="archive">
            Archive <span className="ml-2 rounded-full bg-[var(--primary)] px-2 py-0.5 text-xs text-white">0</span>
          </TabsTrigger>
        </TabsList>

        <TabsContent value="myQueue" className="mt-6">
          <div className="rounded-lg border border-[var(--border)] bg-white p-6">
            <p className="text-sm text-[var(--muted)]">
              Tidak ada submission di queue Anda saat ini.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="unassigned" className="mt-6">
          <div className="rounded-lg border border-[var(--border)] bg-white p-6">
            <p className="text-sm text-[var(--muted)]">
              Tidak ada submission yang belum ditugaskan.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="active" className="mt-6">
          <div className="rounded-lg border border-[var(--border)] bg-white p-6">
            <p className="text-sm text-[var(--muted)]">
              Tidak ada submission aktif saat ini.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="archive" className="mt-6">
          <div className="rounded-lg border border-[var(--border)] bg-white p-6">
            <p className="text-sm text-[var(--muted)]">
              Tidak ada submission yang diarsipkan.
            </p>
          </div>
        </TabsContent>
      </Tabs>
    </section>
  );
}



