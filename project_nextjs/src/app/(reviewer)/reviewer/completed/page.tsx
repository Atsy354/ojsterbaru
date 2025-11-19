'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { FileText, Calendar, Eye, Download, CheckCircle, XCircle, Clock, Star } from 'lucide-react';
import { withAuth } from '@/lib/auth-client';

function ReviewerCompleted() {
  const { user } = useAuth();
  const [completedReviews] = useState([
    {
      id: 1,
      title: 'Artificial Intelligence in Educational Assessment: A Systematic Review',
      authors: 'Thompson, A., Martinez, C., Rodriguez, L.',
      journal: 'Educational Technology Research',
      submission_date: '2023-12-01',
      completion_date: '2023-12-28',
      decision: 'Accept',
      recommendation: 'Accept with minor revisions',
      quality: 4,
      originality: 5,
      significance: 4,
      presentation: 4,
      review_time: 27
    },
    {
      id: 2,
      title: 'Blockchain Technology in Academic Credential Verification',
      authors: 'Kim, H., Park, J., Chen, S.',
      journal: 'Journal of Educational Innovation',
      submission_date: '2023-11-15',
      completion_date: '2023-12-20',
      decision: 'Minor Revision',
      recommendation: 'Minor revision required',
      quality: 3,
      originality: 4,
      significance: 3,
      presentation: 3,
      review_time: 35
    },
    {
      id: 3,
      title: 'Virtual Reality Applications in Science Education',
      authors: 'Anderson, M., White, K., Davis, R.',
      journal: 'International Journal of Science Education',
      submission_date: '2023-10-20',
      completion_date: '2023-11-25',
      decision: 'Major Revision',
      recommendation: 'Major revision required',
      quality: 2,
      originality: 4,
      significance: 4,
      presentation: 2,
      review_time: 36
    }
  ]);

  const getDecisionColor = (decision: string) => {
    switch (decision.toLowerCase()) {
      case 'accept': return 'bg-green-100 text-green-800';
      case 'minor revision': return 'bg-blue-100 text-blue-800';
      case 'major revision': return 'bg-orange-100 text-orange-800';
      case 'reject': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < rating ? 'text-yellow-400 fill-current' : 'text-gray-300'}`}
      />
    ));
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Completed Reviews</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Completed</CardTitle>
            <CheckCircle className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{completedReviews.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accept Rate</CardTitle>
            <CheckCircle className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">
              {Math.round((completedReviews.filter(r => r.decision === 'Accept').length / completedReviews.length) * 100)}%
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Review Time</CardTitle>
            <Clock className="h-4 w-4 text-orange-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-orange-600">
              {Math.round(completedReviews.reduce((sum, r) => sum + r.review_time, 0) / completedReviews.length)} days
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">
              {(completedReviews.reduce((sum, r) => sum + (r.quality + r.originality + r.significance + r.presentation), 0) / (completedReviews.length * 4)).toFixed(1)}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Reviews Table */}
      <Card>
        <CardHeader>
          <CardTitle>Review History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Authors</TableHead>
                <TableHead>Journal</TableHead>
                <TableHead>Completion Date</TableHead>
                <TableHead>Decision</TableHead>
                <TableHead>Quality</TableHead>
                <TableHead>Review Time</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {completedReviews.map((review) => (
                <TableRow key={review.id}>
                  <TableCell className="max-w-md">
                    <div className="font-medium">{review.title}</div>
                  </TableCell>
                  <TableCell className="max-w-xs">
                    <div className="text-sm">{review.authors}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{review.journal}</Badge>
                  </TableCell>
                  <TableCell>{review.completion_date}</TableCell>
                  <TableCell>
                    <Badge className={getDecisionColor(review.decision)}>
                      {review.decision}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center space-x-2">
                      <div className="flex">
                        {renderStars(review.quality)}
                      </div>
                      <span className="text-sm text-gray-600">({review.quality})</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800">
                      {review.review_time} days
                    </Badge>
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

      {/* Detailed Review Cards */}
      <div className="space-y-4">
        <h2 className="text-lg font-semibold">Detailed Review Summary</h2>
        {completedReviews.map((review) => (
          <Card key={review.id}>
            <CardHeader>
              <CardTitle className="text-base">{review.title}</CardTitle>
              <p className="text-sm text-gray-600">{review.authors}</p>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-4">
                <div>
                  <p className="text-sm text-gray-500">Quality</p>
                  <div className="flex items-center">
                    {renderStars(review.quality)}
                    <span className="ml-2 text-sm">({review.quality})</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Originality</p>
                  <div className="flex items-center">
                    {renderStars(review.originality)}
                    <span className="ml-2 text-sm">({review.originality})</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Significance</p>
                  <div className="flex items-center">
                    {renderStars(review.significance)}
                    <span className="ml-2 text-sm">({review.significance})</span>
                  </div>
                </div>
                <div>
                  <p className="text-sm text-gray-500">Presentation</p>
                  <div className="flex items-center">
                    {renderStars(review.presentation)}
                    <span className="ml-2 text-sm">({review.presentation})</span>
                  </div>
                </div>
              </div>
              <div className="mb-4">
                <p className="text-sm text-gray-500 mb-2">Recommendation:</p>
                <Badge className={getDecisionColor(review.decision)}>
                  {review.recommendation}
                </Badge>
              </div>
              <div className="flex justify-between items-center">
                <div className="text-sm text-gray-600">
                  Review completed in {review.review_time} days
                </div>
                <div className="flex space-x-2">
                  <Button variant="outline" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Full Review
                  </Button>
                  <Button variant="ghost" size="sm">
                    <Download className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}

export default withAuth(ReviewerCompleted, 'reviewer')