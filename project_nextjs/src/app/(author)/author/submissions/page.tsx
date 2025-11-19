'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Calendar, Eye, Download } from 'lucide-react';

import { withAuth } from '@/lib/auth-client'

function AuthorSubmissions() {
  const { user } = useAuth();
  const [submissions] = useState([
    {
      id: 1,
      title: 'The Impact of Social Media on Academic Performance: A Meta-Analysis',
      stage: 'Review',
      status: 'Under Review',
      date_submitted: '2024-01-15',
      days_in_stage: 12,
      decision: null
    },
    {
      id: 2,
      title: 'Machine Learning Approaches in Educational Technology',
      stage: 'Copyediting',
      status: 'Revision Required',
      date_submitted: '2024-01-10',
      days_in_stage: 5,
      decision: 'Minor Revision'
    },
    {
      id: 3,
      title: 'Digital Literacy in Higher Education: Challenges and Opportunities',
      stage: 'Production',
      status: 'Accepted',
      date_submitted: '2023-12-20',
      days_in_stage: 8,
      decision: 'Accept'
    },
    {
      id: 4,
      title: 'Online Learning Effectiveness During Pandemic',
      stage: 'Submission',
      status: 'Submitted',
      date_submitted: '2024-01-20',
      days_in_stage: 2,
      decision: null
    }
  ]);

  const getStageColor = (stage: string) => {
    switch (stage.toLowerCase()) {
      case 'submission': return 'bg-red-100 text-red-800';
      case 'review': return 'bg-orange-100 text-orange-800';
      case 'copyediting': return 'bg-blue-100 text-blue-800';
      case 'production': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status.toLowerCase()) {
      case 'submitted': return 'bg-gray-100 text-gray-800';
      case 'under review': return 'bg-yellow-100 text-yellow-800';
      case 'revision required': return 'bg-orange-100 text-orange-800';
      case 'accepted': return 'bg-green-100 text-green-800';
      case 'rejected': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">My Submissions</h1>
        <Button>
          <FileText className="h-4 w-4 mr-2" />
          New Submission
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissions.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Under Review</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{submissions.filter(s => s.stage === 'Review').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accepted</CardTitle>
            <FileText className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{submissions.filter(s => s.decision === 'Accept').length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Review Time</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">8.5 days</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Submission History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Stage</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Date Submitted</TableHead>
                <TableHead>Days in Stage</TableHead>
                <TableHead>Decision</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {submissions.map((submission) => (
                <TableRow key={submission.id}>
                  <TableCell className="font-medium">{submission.id}</TableCell>
                  <TableCell className="max-w-md">
                    <div className="font-medium truncate">{submission.title}</div>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStageColor(submission.stage)}>
                      {submission.stage}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className={getStatusColor(submission.status)}>
                      {submission.status}
                    </Badge>
                  </TableCell>
                  <TableCell>{submission.date_submitted}</TableCell>
                  <TableCell>{submission.days_in_stage} days</TableCell>
                  <TableCell>
                    {submission.decision ? (
                      <Badge className={submission.decision === 'Accept' ? 'bg-green-100 text-green-800' : 'bg-orange-100 text-orange-800'}>
                        {submission.decision}
                      </Badge>
                    ) : (
                      <span className="text-gray-500">-</span>
                    )}
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(AuthorSubmissions, 'author')