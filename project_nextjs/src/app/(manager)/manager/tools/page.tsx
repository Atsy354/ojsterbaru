import { redirect } from "next/navigation";
import { getCurrentUserServer } from "@/lib/auth-server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ManagerToolsPage() {
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
        <h1 className="text-2xl font-bold text-gray-900">Tools</h1>
        <p className="text-sm text-gray-600 mt-1">
          Access management tools such as import/export and statistics reports, similar to the Tools
          area in OJS 3.3.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Import/Export</CardTitle>
            <CardDescription>
              Import or export data such as users, issues, or articles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              No import/export plugins are configured yet. When available, they will appear here as a
              list of tools.
            </p>
            <Button size="sm" variant="outline">
              View Import/Export Tools
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Reports</CardTitle>
            <CardDescription>
              Generate usage and workflow statistics reports.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              Report plugins (e.g. COUNTER, article reports) will be listed here when enabled.
            </p>
            <Button size="sm" variant="outline">
              View Reports
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Statistics</CardTitle>
            <CardDescription>
              Access quick links to statistics and analytics.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              Detailed statistics are available from the Statistics section. Use this area for tools
              that export or summarize usage data.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Administrative Tools</CardTitle>
            <CardDescription>
              Additional tools for housekeeping and maintenance.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              When available, tools such as log viewers or cleanup scripts will be listed here.
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Dummy tools list */}
      <Card className="border border-gray-200">
        <CardHeader>
          <CardTitle className="text-base font-semibold text-gray-900">
            Installed Tools (Example)
          </CardTitle>
          <CardDescription>
            Sample list of tools similar to what appears in the Tools grid of OJS 3.3.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto text-sm">
            <table className="min-w-full border border-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-3 py-2 border-b text-left font-semibold text-gray-700">Name</th>
                  <th className="px-3 py-2 border-b text-left font-semibold text-gray-700">Type</th>
                  <th className="px-3 py-2 border-b text-left font-semibold text-gray-700">Status</th>
                </tr>
              </thead>
              <tbody>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b">Article Report</td>
                  <td className="px-3 py-2 border-b">Report Plugin</td>
                  <td className="px-3 py-2 border-b text-green-700">Enabled</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b">User XML Import/Export</td>
                  <td className="px-3 py-2 border-b">Import/Export Plugin</td>
                  <td className="px-3 py-2 border-b text-green-700">Enabled</td>
                </tr>
                <tr className="hover:bg-gray-50">
                  <td className="px-3 py-2 border-b">Usage Statistics Report</td>
                  <td className="px-3 py-2 border-b">Report Plugin</td>
                  <td className="px-3 py-2 border-b text-orange-600">Pending Setup</td>
                </tr>
              </tbody>
            </table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}


