import { redirect } from "next/navigation";
import { getCurrentUserServer } from "@/lib/auth-server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ManagerSettingsWebsitePage() {
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
        <h1 className="text-2xl font-bold text-gray-900">Website Settings</h1>
        <p className="text-sm text-gray-600 mt-1">
          Configure the journal website identity, appearance, and navigation, as in the Website tab in OJS 3.3.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Journal Identity</CardTitle>
            <CardDescription>
              Set the journal name, acronym, ISSN, and other identity details.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              Identity information has not been configured yet. These details appear on the journal
              homepage and in metadata.
            </p>
            <Button size="sm" className="bg-[#006798] hover:bg-[#00557b]">
              Configure Identity
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Appearance</CardTitle>
            <CardDescription>
              Manage logo, colours, and layout for the journal website.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              No appearance settings have been saved. You can upload a logo, choose a theme, and
              customize the header and footer.
            </p>
            <Button size="sm" variant="outline">
              Customize Appearance
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Navigation Menus</CardTitle>
            <CardDescription>
              Configure menu items that appear in the site navigation.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              No custom navigation menus have been defined. Use this section to add links to policies,
              about pages, and other important resources.
            </p>
            <Button size="sm" variant="outline">
              Manage Navigation
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Languages</CardTitle>
            <CardDescription>
              Enable site languages and locale options.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              Only the primary locale is currently enabled. Additional locales can be activated
              for multilingual journals.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


