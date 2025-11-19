'use client'

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { withAuth } from "@/lib/auth-client";

const statsData = [
  {
    label: "Total Journals",
    value: 5,
    trend: "+1 this month"
  },
  {
    label: "Total Users", 
    value: 127,
    trend: "+12 this month"
  },
  {
    label: "Active Submissions",
    value: 43,
    trend: "+8 this week"
  },
  {
    label: "Published Articles",
    value: 892,
    trend: "+24 this month"
  }
];

const recentActivities = [
  {
    user: "Dr. Andi Wijaya",
    action: "submitted new manuscript",
    target: "Machine Learning for Weather Prediction",
    time: "2 hours ago"
  },
  {
    user: "Editor Team", 
    action: "reviewed",
    target: "Sentiment Analysis of Government Policies",
    time: "5 hours ago"
  },
  {
    user: "Dr. Siti Nurhaliza",
    action: "published article in",
    target: "Journal of Information Technology",
    time: "1 day ago"
  }
];

function AdminStatisticsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900">Site Statistics</h1>
          <p className="text-gray-600 mt-2">Overview of journal activities and system metrics</p>
        </div>

        {/* Statistics Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {statsData.map((stat, index) => (
            <Card key={index} className="border border-gray-200">
              <CardHeader className="pb-3">
                <CardTitle className="text-sm font-medium text-gray-600">{stat.label}</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold text-gray-900">{stat.value}</div>
                <div className="text-sm text-green-600 mt-1">{stat.trend}</div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Recent Activity */}
        <Card className="border border-gray-200">
          <CardHeader>
            <CardTitle className="text-lg font-semibold text-gray-900">Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {recentActivities.map((activity, index) => (
                <div key={index} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-b-0">
                  <div className="flex items-center space-x-3">
                    <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
                      <span className="text-blue-600 text-sm font-medium">
                        {activity.user.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm text-gray-900">
                        <span className="font-medium">{activity.user}</span> {activity.action} <span className="font-medium">{activity.target}</span>
                      </p>
                      <p className="text-xs text-gray-500">{activity.time}</p>
                    </div>
                  </div>
                  <Badge variant="outline" className="text-xs">
                    Recent
                  </Badge>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default withAuth(AdminStatisticsPage, 'admin')
