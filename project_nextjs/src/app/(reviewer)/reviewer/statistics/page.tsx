'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { FileText, TrendingUp, Clock, Award, BarChart3, Calendar, Star } from 'lucide-react';

const monthlyReviews = [
  { month: 'Jan', reviews: 3, accept: 1, reject: 1, revision: 1 },
  { month: 'Feb', reviews: 2, accept: 1, reject: 0, revision: 1 },
  { month: 'Mar', reviews: 4, accept: 2, reject: 1, revision: 1 },
  { month: 'Apr', reviews: 3, accept: 2, reject: 0, revision: 1 },
  { month: 'May', reviews: 2, accept: 1, reject: 1, revision: 0 },
  { month: 'Jun', reviews: 5, accept: 3, reject: 1, revision: 1 },
];

const decisionDistribution = [
  { name: 'Accept', value: 10, color: '#10b981' },
  { name: 'Minor Revision', value: 8, color: '#3b82f6' },
  { name: 'Major Revision', value: 5, color: '#f59e0b' },
  { name: 'Reject', value: 4, color: '#ef4444' },
];

const reviewTimeData = [
  { range: '1-7 days', count: 3 },
  { range: '8-14 days', count: 8 },
  { range: '15-21 days', count: 12 },
  { range: '22-30 days', count: 4 },
  { range: '30+ days', count: 2 },
];

import { withAuth } from '@/lib/auth-client'

function ReviewerStatistics() {
  const { user } = useAuth();

  const stats = {
    totalReviews: 29,
    avgReviewTime: 18.5,
    acceptRate: 34.5,
    avgRating: 4.2,
    onTimeRate: 89.7,
    totalCitations: 156
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reviewer Statistics</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalReviews}</div>
            <p className="text-xs text-muted-foreground">+5 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Accept Rate</CardTitle>
            <TrendingUp className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">{stats.acceptRate}%</div>
            <p className="text-xs text-muted-foreground">Above average</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Review Time</CardTitle>
            <Clock className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{stats.avgReviewTime} days</div>
            <p className="text-xs text-muted-foreground">On time</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">On-Time Rate</CardTitle>
            <Calendar className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">{stats.onTimeRate}%</div>
            <p className="text-xs text-muted-foreground">Excellent</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Rating</CardTitle>
            <Star className="h-4 w-4 text-yellow-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-yellow-600">{stats.avgRating}</div>
            <p className="text-xs text-muted-foreground">Out of 5</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Citations</CardTitle>
            <Award className="h-4 w-4 text-indigo-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-indigo-600">{stats.totalCitations}</div>
            <p className="text-xs text-muted-foreground">+23 this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Monthly Review Activity (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={monthlyReviews}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="reviews" fill="#3b82f6" name="Total Reviews" />
                <Bar dataKey="accept" fill="#10b981" name="Accept" />
                <Bar dataKey="revision" fill="#f59e0b" name="Revision" />
                <Bar dataKey="reject" fill="#ef4444" name="Reject" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Decision Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={decisionDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value, percent }) => `${name}: ${value} (${(percent * 100).toFixed(1)}%)`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {decisionDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Review Time Distribution</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={reviewTimeData} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" />
                <YAxis dataKey="range" type="category" width={80} />
                <Tooltip />
                <Bar dataKey="count" fill="#8b5cf6" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Reviewer Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Review Quality Score</span>
                <Badge className="bg-green-100 text-green-800">Excellent (4.2/5)</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Timeliness Score</span>
                <Badge className="bg-blue-100 text-blue-800">Very Good (89.7%)</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Constructiveness Score</span>
                <Badge className="bg-purple-100 text-purple-800">Good (4.1/5)</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Expertise Match</span>
                <Badge className="bg-indigo-100 text-indigo-800">Excellent (95%)</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Review Depth</span>
                <Badge className="bg-orange-100 text-orange-800">Good (3.8/5)</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Overall Ranking</span>
                <Badge className="bg-yellow-100 text-yellow-800">Top 15%</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withAuth(ReviewerStatistics, 'reviewer')
