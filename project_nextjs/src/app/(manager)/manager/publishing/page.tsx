import { redirect } from "next/navigation";
import { getCurrentUserServer } from "@/lib/auth-server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ManagerPublishingPage() {
  const user = await getCurrentUserServer();

  if (!user) {
    redirect("/login");
  }

  const hasManagerRole = user.roles?.some((r) => {
    const rolePath = r.role_path?.toLowerCase();
    return rolePath === "manager" || rolePath === "admin";
  });

  if (!hasManagerRole) {
    redirect("/dashboard");
  }

  return (
    <div className="p-6 space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Publishing</h1>
        <p className="text-sm text-gray-600 mt-1">
          Configure how issues are scheduled, published, and displayed to readers, similar to OJS 3.3.
        </p>
      </div>

      {/* Publishing configuration cards */}
      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Publishing Schedule</CardTitle>
            <CardDescription>
              Control when and how new issues are published.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              No publishing schedule has been configured. You can publish issues as soon as they are ready,
              or on a fixed schedule.
            </p>
            <Button size="sm" className="bg-[#006798] hover:bg-[#00557b]">
              Configure Schedule
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Front‑End Display</CardTitle>
            <CardDescription>
              Choose which issue appears on the journal homepage.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              No current issue has been selected for the homepage. Once you publish an issue,
              you can mark it as the current issue to show it to readers.
            </p>
            <Button size="sm" variant="outline">
              Select Current Issue
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Ordering of Issues</CardTitle>
            <CardDescription>
              Control how back issues are ordered in lists and archives.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              Issues will be listed in reverse chronological order by default. You can change the
              ordering here to match your journal&apos;s policy.
            </p>
            <Button size="sm" variant="outline">
              Manage Ordering
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Published Issue Archive</CardTitle>
            <CardDescription>
              Provide readers with a browsable list of published issues.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              No issues have been published yet. Once issues are published, readers will be able
              to browse them via the issues archive.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dummy publishing schedule list */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-900">
            Example Publishing Schedule
          </CardTitle>
          <CardDescription>
            Sample data showing how a schedule might look when configured.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto text-sm">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 border-b text-left font-semibold text-gray-700">Issue</th>
                  <th className="px-3 py-2 border-b text-left font-semibold text-gray-700">Planned Date</th>
                  <th className="px-3 py-2 border-b text-left font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b">Vol 6, No 1 (2026)</td>
                  <td className="px-3 py-2 border-b">01 Jan 2026</td>
                  <td className="px-3 py-2 border-b text-orange-600">Planned</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b">Vol 5, No 2 (2025)</td>
                  <td className="px-3 py-2 border-b">01 Jul 2025</td>
                  <td className="px-3 py-2 border-b text-green-700">Published</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


