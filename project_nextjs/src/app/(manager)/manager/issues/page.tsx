import { redirect } from "next/navigation";
import { getCurrentUserServer } from "@/lib/auth-server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ManagerIssuesPage() {
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
        <h1 className="text-2xl font-bold text-gray-900">Issues</h1>
        <p className="text-sm text-gray-600 mt-1">
          Manage future, current, and back issues for your journal (as in the Issues section of OJS 3.3).
        </p>
      </div>

      {/* Summary Cards */}
      <div className="grid gap-4 md:grid-cols-3">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Future Issues</CardTitle>
            <CardDescription>Plan upcoming issues before they are published.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">No future issues have been scheduled.</p>
            <Button size="sm" className="bg-[#006798] hover:bg-[#00557b]">
              Create New Issue
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Current Issue</CardTitle>
            <CardDescription>The issue that is currently visible to readers.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">No current issue has been assigned.</p>
            <p className="text-gray-500">
              Once an issue is published it will appear here and on the journal homepage.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Back Issues</CardTitle>
            <CardDescription>Previously published issues of the journal.</CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">There are no back issues yet.</p>
            <p className="text-gray-500">
              When you publish issues, they will be listed here for quick access and management.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dummy Issue List (example data) */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-900">
            Issues
          </CardTitle>
          <CardDescription>
            Example issues (Volume/Number/Year) similar to the Issues grid in OJS 3.3.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto text-sm">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 border-b text-left font-semibold text-gray-700">Issue</th>
                  <th className="px-3 py-2 border-b text-left font-semibold text-gray-700">Year</th>
                  <th className="px-3 py-2 border-b text-left font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b">Vol 5, No 1 (2025)</td>
                  <td className="px-3 py-2 border-b">2025</td>
                  <td className="px-3 py-2 border-b text-green-700">Published</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b">Vol 4, No 2 (2024)</td>
                  <td className="px-3 py-2 border-b">2024</td>
                  <td className="px-3 py-2 border-b text-green-700">Published</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b">Vol 6, No 1 (Upcoming)</td>
                  <td className="px-3 py-2 border-b">2026</td>
                  <td className="px-3 py-2 border-b text-orange-600">Scheduled</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


