import { redirect } from "next/navigation";
import { getCurrentUserServer } from "@/lib/auth-server";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";

export const dynamic = "force-dynamic";

export default async function ManagerSettingsWorkflowPage() {
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
        <h1 className="text-2xl font-bold text-gray-900">Workflow Settings</h1>
        <p className="text-sm text-gray-600 mt-1">
          Configure submission, review, and production workflows as in the Workflow tab of OJS 3.3.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Submission</CardTitle>
            <CardDescription>
              Configure submission guidelines, checklists, and file requirements.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              No submission checklist items have been configured. These appear to authors during
              submission.
            </p>
            <Button size="sm" className="bg-[#006798] hover:bg-[#00557b]">
              Configure Submission
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Review</CardTitle>
            <CardDescription>
              Manage review settings, methods, and reviewer reminders.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              Review options (blind/anonymous, deadlines, reminders) have not yet been configured.
            </p>
            <Button size="sm" variant="outline">
              Configure Review
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Emails</CardTitle>
            <CardDescription>
              Customize editorial workflow emails sent to authors and reviewers.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              Default email templates are in use. You can edit templates to match your journal&apos;s
              communication style.
            </p>
            <Button size="sm" variant="outline">
              Manage Email Templates
            </Button>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-base font-semibold text-gray-900">Production</CardTitle>
            <CardDescription>
              Configure galleys, file formats, and publication workflows.
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-3 text-sm">
            <p className="text-gray-500">
              No production‑specific settings have been configured yet. Use this area to define
              how finalized articles are prepared and published.
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}


