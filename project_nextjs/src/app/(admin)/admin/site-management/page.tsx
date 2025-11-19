'use client'

import { PageHeader } from "@/components/admin/page-header";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { BookOpen, Users, Settings, Plus, Edit, Eye } from "lucide-react";
import { withAuth } from "@/lib/auth-client";

// Mock data for journals
const mockJournals = [
  {
    id: 1,
    path: "jcs",
    title: "Journal of Computer Science",
    description: "A peer-reviewed journal covering all aspects of computer science",
    status: "Enabled",
    submissions: 45,
    users: 12,
    created_date: "2024-01-15"
  },
  {
    id: 2,
    path: "jbiotech",
    title: "Journal of Biotechnology",
    description: "Research articles in biotechnology and related fields",
    status: "Enabled",
    submissions: 32,
    users: 8,
    created_date: "2024-02-01"
  },
  {
    id: 3,
    path: "jmath",
    title: "Journal of Mathematics",
    description: "Mathematical research and theoretical studies",
    status: "Disabled",
    submissions: 0,
    users: 0,
    created_date: "2024-02-15"
  }
];

function SiteManagementPage() {
  const getStatusBadgeVariant = (status: string) => {
    return status === "Enabled" ? "success" : "secondary";
  };

  return (
    <section className="space-y-6">
      <PageHeader
        title="Hosted Journals"
        subtitle="Manage journals hosted on this site"
        showBreadcrumbs={true}
      />

      {/* Journal Statistics */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Journals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-gray-900">{mockJournals.length}</div>
            <p className="text-xs text-gray-500 mt-1">Hosted on this site</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Active Journals</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">
              {mockJournals.filter(j => j.status === "Enabled").length}
            </div>
            <p className="text-xs text-gray-500 mt-1">Currently active</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Submissions</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {mockJournals.reduce((sum, j) => sum + j.submissions, 0)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Across all journals</p>
          </CardContent>
        </Card>

        <Card className="border border-gray-200">
          <CardHeader className="pb-3">
            <CardTitle className="text-sm font-medium text-gray-600">Total Users</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">
              {mockJournals.reduce((sum, j) => sum + j.users, 0)}
            </div>
            <p className="text-xs text-gray-500 mt-1">Across all journals</p>
          </CardContent>
        </Card>
      </div>

      {/* Create New Journal Button */}
      <div className="flex justify-end">
        <Button className="bg-[#006798] hover:bg-[#005687]">
          <Plus className="h-4 w-4 mr-2" />
          Create Journal
        </Button>
      </div>

      {/* Journals Table */}
      <Card className="border border-gray-200">
        <CardHeader>
          <div>
            <CardTitle className="text-lg font-semibold text-gray-900">
              Journal Management
            </CardTitle>
            <CardDescription>
              Manage journals hosted on this site
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Journal</TableHead>
                  <TableHead>Path</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Submissions</TableHead>
                  <TableHead>Users</TableHead>
                  <TableHead>Created Date</TableHead>
                  <TableHead>Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {mockJournals.map((journal) => (
                  <TableRow key={journal.id}>
                    <TableCell>
                      <div>
                        <div className="font-medium text-gray-900">{journal.title}</div>
                        <div className="text-sm text-gray-500 max-w-xs truncate">
                          {journal.description}
                        </div>
                      </div>
                    </TableCell>
                    <TableCell>
                      <code className="text-sm bg-gray-100 px-2 py-1 rounded">
                        {journal.path}
                      </code>
                    </TableCell>
                    <TableCell>
                      <Badge variant={getStatusBadgeVariant(journal.status)}>
                        {journal.status}
                      </Badge>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <BookOpen className="h-3 w-3 text-gray-400" />
                        <span>{journal.submissions}</span>
                      </div>
                    </TableCell>
                    <TableCell>
                      <div className="flex items-center space-x-1">
                        <Users className="h-3 w-3 text-gray-400" />
                        <span>{journal.users}</span>
                      </div>
                    </TableCell>
                    <TableCell>{journal.created_date}</TableCell>
                    <TableCell>
                      <div className="flex space-x-2">
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Eye className="h-3 w-3 mr-1" />
                          View
                        </Button>
                        <Button variant="ghost" size="sm" className="h-8 px-2">
                          <Settings className="h-3 w-3 mr-1" />
                          Settings
                        </Button>
                      </div>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}

export default withAuth(SiteManagementPage, 'admin')
