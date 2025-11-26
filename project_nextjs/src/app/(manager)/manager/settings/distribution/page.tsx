import { redirect } from "next/navigation";
import { getCurrentUserServer } from "@/lib/auth-server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ManagerSettingsDistributionPage() {
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
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Distribution Settings</h1>
        <p className="text-sm text-gray-600 mt-1">
          Configure indexing, DOIs, access options, and open access policies, as in the Distribution tab of OJS 3.3.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Indexing</CardTitle>
            <CardDescription>
              Provide indexing metadata for search engines and databases.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              Indexing metadata (keywords, description) has not been defined yet. This information
              helps discovery services find your journal.
            </p>
            <Button size="sm" className="bg-[#006798] hover:bg-[#00557b]">
              Configure Indexing
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">DOIs</CardTitle>
            <CardDescription>
              Configure Digital Object Identifier (DOI) assignment for issues and articles.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              DOI settings are not yet configured. Once a DOI plugin is enabled, you can manage
              DOI patterns and registration here.
            </p>
            <Button size="sm" variant="outline">
              Configure DOIs
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Access</CardTitle>
            <CardDescription>
              Control open access policies and subscription settings.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              By default, all content is open access. Use this section to configure delayed open
              access or subscription access if required.
            </p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Payment / Fees</CardTitle>
            <CardDescription>
              (Optional) Configure submission or publication fees.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              Payment options are not enabled. If your journal charges fees, you can configure
              them here along with payment plugins.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


