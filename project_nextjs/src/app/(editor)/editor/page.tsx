'use client'

import { useAuth } from '@/contexts/AuthContext'
import { withAuth } from '@/lib/auth-client'
import Link from 'next/link'

function EditorDashboard() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-[#eaedee]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Editor Dashboard</h1>
          <p className="text-gray-600">Kelola alur editorial dan naskah</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Link href="/editor/submissions" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-[#002C40] mb-2">Submissions</h3>
            <p className="text-gray-600">View and manage manuscript submissions</p>
          </Link>

          <Link href="/editor/submissions" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-[#002C40] mb-2">Review Process</h3>
            <p className="text-gray-600">Manage peer review assignments and decisions</p>
          </Link>

          <Link href="/editor/issues" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-[#002C40] mb-2">Issues</h3>
            <p className="text-gray-600">Create and manage journal issues</p>
          </Link>

          <Link href="/editor/statistics" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-[#002C40] mb-2">Statistics</h3>
            <p className="text-gray-600">View submission and review statistics</p>
          </Link>

          <Link href="/editor/settings" className="bg-white rounded-lg shadow p-6 hover:shadow-md transition-shadow">
            <h3 className="text-lg font-semibold text-[#002C40] mb-2">Editorial Settings</h3>
            <p className="text-gray-600">Configure editorial workflow settings</p>
          </Link>
        </div>
      </div>
    </div>
  )
}

export default withAuth(EditorDashboard, 'editor')
