'use client';

import { withAuth } from '@/lib/auth-client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { FileText, Clock, Eye } from 'lucide-react';
import { Button } from '@/components/ui/button';

function ReviewerHistory() {
  const mockHistory = [
    {
      id: 1,
      title: 'Machine Learning Applications in Weather Prediction',
      authors: 'Dr. Smith, Prof. Johnson',
      journal: 'Journal of Computer Science',
      submittedDate: '2024-01-15',
      completedDate: '2024-02-10',
      status: 'Completed',
      recommendation: 'Accept'
    },
    {
      id: 2,
      title: 'Blockchain Technology in Education',
      authors: 'Dr. Lee, Dr. Chen',
      journal: 'Educational Technology Journal',
      submittedDate: '2024-01-10',
      completedDate: '2024-02-05',
      status: 'Completed',
      recommendation: 'Minor Revision'
    }
  ];

  const getRecommendationBadge = (recommendation: string) => {
    switch (recommendation.toLowerCase()) {
      case 'accept':
        return 'bg-green-100 text-green-800';
      case 'minor revision':
        return 'bg-blue-100 text-blue-800';
      case 'major revision':
        return 'bg-orange-100 text-orange-800';
      case 'reject':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Review History</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Completed Review History</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockHistory.map((item) => (
              <div key={item.id} className="border border-gray-200 rounded-lg p-4">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex-1">
                    <h3 className="font-medium text-gray-900">{item.title}</h3>
                    <p className="text-sm text-gray-600">{item.authors}</p>
                    <p className="text-sm text-gray-500">{item.journal}</p>
                  </div>
                  <Badge className={getRecommendationBadge(item.recommendation)}>
                    {item.recommendation}
                  </Badge>
                </div>
                
                <div className="flex items-center justify-between text-sm text-gray-500 mb-3">
                  <div className="flex items-center space-x-4">
                    <span>Submitted: {item.submittedDate}</span>
                    <span>Completed: {item.completedDate}</span>
                  </div>
                  <Badge variant="outline">{item.status}</Badge>
                </div>

                <div className="flex justify-end">
                  <Button variant="ghost" size="sm">
                    <Eye className="h-4 w-4 mr-1" />
                    View Details
                  </Button>
                </div>
              </div>
            ))}
          </div>
          
          {mockHistory.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <FileText className="h-12 w-12 mx-auto mb-4 text-gray-300" />
              <p>No review history available.</p>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(ReviewerHistory, 'reviewer');