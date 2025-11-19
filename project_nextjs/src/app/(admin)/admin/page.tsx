'use client'

import { useAuth } from '@/contexts/AuthContext'
import { withAuth } from '@/lib/auth-client'
import Link from 'next/link'

function AdminDashboard() {
  const { user } = useAuth()

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header OJS Klasik */}
      <header className="bg-[#002C40] text-white">
        <div className="px-6 py-4">
          <div className="flex items-center space-x-4">
            <div className="bg-white p-3 rounded">
              <div className="text-2xl font-bold text-[#002C40]">OJS</div>
            </div>
            <div>
              <h1 className="text-xl font-bold">Open Journal Systems</h1>
              <p className="text-sm opacity-80">Administration</p>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar Klasik */}
        <aside className="w-64 bg-[#002C40] text-white min-h-screen">
          <div className="p-4">
            <nav className="space-y-2">
              <Link 
                href="/admin" 
                className="block px-3 py-2 rounded hover:bg-white hover:bg-opacity-10"
              >
                Dashboard
              </Link>
            </nav>
          </div>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-8">
          <div className="bg-white rounded-lg shadow p-6">
            <div className="border-b border-gray-200 pb-4 mb-6">
              <h1 className="text-2xl font-bold text-gray-900">Site Administration</h1>
            </div>

            <div className="space-y-8">
              {/* Site Management */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Site Management</h2>
                <div className="space-y-2">
                  <Link 
                    href="/admin/site-management/hosted-journals" 
                    className="block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Hosted Journals
                  </Link>
                  <Link 
                    href="/admin/site-settings/site-setup" 
                    className="block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Site Settings
                  </Link>
                </div>
              </div>

              {/* Administrative Functions */}
              <div>
                <h2 className="text-lg font-semibold text-gray-900 mb-4">Administrative Functions</h2>
                <div className="space-y-2">
                  <Link 
                    href="/admin/system/system-information" 
                    className="block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    System Information
                  </Link>
                  <Link 
                    href="/admin/system/expire-sessions" 
                    className="block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Expire User Sessions
                  </Link>
                  <Link 
                    href="/admin/system/clear-data-caches" 
                    className="block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Clear Data Caches
                  </Link>
                  <Link 
                    href="/admin/system/clear-template-cache" 
                    className="block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Clear Template Cache
                  </Link>
                  <Link 
                    href="/admin/system/clear-scheduled-tasks" 
                    className="block text-blue-600 hover:text-blue-800 hover:underline"
                  >
                    Clear Scheduled Task Execution Logs
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
    </div>
  )
}

export default withAuth(AdminDashboard, 'admin')