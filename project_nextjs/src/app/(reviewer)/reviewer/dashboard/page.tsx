'use client'

import { withAuth } from '@/lib/auth-client'

function ReviewerDashboardPage() {
  return (
    <section className="space-y-6">
      <div className="bg-white rounded-lg border border-gray-200 p-4">
        <h2 className="text-lg font-semibold text-gray-900">Reviewer Dashboard</h2>
        <p className="text-sm text-gray-600">Review & evaluate assigned manuscripts</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700">Pending Assignments</h3>
          <p className="text-2xl font-bold text-[#006798]">3</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700">In Progress</h3>
          <p className="text-2xl font-bold text-orange-600">1</p>
        </div>
        <div className="bg-white rounded-lg border border-gray-200 p-4">
          <h3 className="text-sm font-medium text-gray-700">Completed</h3>
          <p className="text-2xl font-bold text-green-600">5</p>
        </div>
      </div>
    </section>
  )
}

export default withAuth(ReviewerDashboardPage, 'reviewer')