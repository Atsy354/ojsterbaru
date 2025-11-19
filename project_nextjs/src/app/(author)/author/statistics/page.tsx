'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, LineChart, Line, PieChart, Pie, Cell } from 'recharts';
import { FileText, TrendingUp, Eye, Download, Award } from 'lucide-react';

const submissionData = [
  { month: 'Jan', submissions: 2, published: 0 },
  { month: 'Feb', submissions: 1, published: 1 },
  { month: 'Mar', submissions: 3, published: 0 },
  { month: 'Apr', submissions: 2, published: 2 },
  { month: 'May', submissions: 1, published: 1 },
  { month: 'Jun', submissions: 4, published: 1 },
];

const citationData = [
  { month: 'Jan', citations: 5 },
  { month: 'Feb', citations: 8 },
  { month: 'Mar', citations: 12 },
  { month: 'Apr', citations: 15 },
  { month: 'May', citations: 23 },
  { month: 'Jun', citations: 31 },
];

const stageDistribution = [
  { name: 'Submission', value: 2, color: '#ef4444' },
  { name: 'Review', value: 1, color: '#f97316' },
  { name: 'Copyediting', value: 1, color: '#3b82f6' },
  { name: 'Production', value: 3, color: '#10b981' },
];

import { withAuth } from '@/lib/auth-client'

function AuthorStatistics() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Author Statistics</h1>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Submissions</CardTitle>
            <FileText className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">13</div>
            <p className="text-xs text-muted-foreground">+2 from last month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Published Articles</CardTitle>
            <Award className="h-4 w-4 text-green-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-green-600">5</div>
            <p className="text-xs text-muted-foreground">38.5% acceptance rate</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Citations</CardTitle>
            <TrendingUp className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">31</div>
            <p className="text-xs text-muted-foreground">+8 this month</p>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <Download className="h-4 w-4 text-purple-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-purple-600">802</div>
            <p className="text-xs text-muted-foreground">+156 this month</p>
          </CardContent>
        </Card>
      </div>

      {/* Charts */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Submissions vs Published (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={submissionData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="submissions" fill="#3b82f6" name="Submissions" />
                <Bar dataKey="published" fill="#10b981" name="Published" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Citation Trend (6 Months)</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={citationData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="month" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="citations" stroke="#f59e0b" strokeWidth={2} />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Current Submissions by Stage</CardTitle>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={stageDistribution}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {stageDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Performance Metrics</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Acceptance Rate</span>
                <Badge className="bg-green-100 text-green-800">38.5%</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Review Time</span>
                <Badge className="bg-blue-100 text-blue-800">8.2 days</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">Average Time to Publication</span>
                <Badge className="bg-orange-100 text-orange-800">45 days</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">H-Index</span>
                <Badge className="bg-purple-100 text-purple-800">3</Badge>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm font-medium">i10-Index</span>
                <Badge className="bg-indigo-100 text-indigo-800">1</Badge>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withAuth(AuthorStatistics, 'author')
