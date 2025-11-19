'use client'

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";
import { useState } from "react";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Home, 
  FileText, 
  Users, 
  BarChart3,
  Settings,
  BookOpen,
  Bell,
  LogOut,
  Calendar,
  MessageSquare
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function EditorLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const workflowNav = [
    {
      name: "Dashboard",
      href: "/editor",
      icon: Home,
      current: pathname === "/editor"
    },
    {
      name: "Unassigned",
      href: "/editor/submissions?filter=unassigned",
      icon: FileText,
      current: pathname === "/editor/submissions" && searchParams?.get('filter') === 'unassigned',
      badge: 2
    },
    {
      name: "My Queue",
      href: "/editor/submissions?filter=my-queue",
      icon: Users,
      current: pathname === "/editor/submissions" && searchParams?.get('filter') === 'my-queue',
      badge: 4
    },
    {
      name: "All Active",
      href: "/editor/submissions?filter=all-active",
      icon: FileText,
      current: pathname === "/editor/submissions" && searchParams?.get('filter') === 'all-active',
      badge: 8
    },
    {
      name: "Archived",
      href: "/editor/submissions?filter=archived",
      icon: Calendar,
      current: pathname === "/editor/submissions" && searchParams?.get('filter') === 'archived'
    }
  ];

  const monitoringNav = [
    {
      name: "Production",
      href: "/editor/submissions?filter=production",
      icon: BarChart3,
      current: pathname === "/editor/submissions" && searchParams?.get('filter') === 'production'
    },
    {
      name: "Copyediting",
      href: "/editor/submissions?filter=copyediting",
      icon: FileText,
      current: pathname === "/editor/submissions" && searchParams?.get('filter') === 'copyediting'
    },
    {
      name: "Review",
      href: "/editor/submissions?filter=review",
      icon: Users,
      current: pathname === "/editor/submissions" && searchParams?.get('filter') === 'review'
    }
  ];

  const managementNav = [
    {
      name: "Issues",
      href: "/editor/issues",
      icon: BookOpen,
      current: pathname.startsWith("/editor/issues")
    },
    {
      name: "Announcements",
      href: "/editor/announcements",
      icon: MessageSquare,
      current: pathname.startsWith("/editor/announcements")
    },
    {
      name: "Settings: Workflow",
      href: "/editor/settings/workflow",
      icon: Settings,
      current: pathname.startsWith("/editor/settings/workflow")
    },
    {
      name: "Settings: Website",
      href: "/editor/settings/website",
      icon: Settings,
      current: pathname.startsWith("/editor/settings/website")
    }
  ];

  if (!user) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-[#eaedee]">
      {/* Header */}
      <header className="bg-[#002C40] text-white sticky top-0 z-50">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Left side */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => setSidebarOpen(!sidebarOpen)}
                className="lg:hidden p-2 rounded-md hover:bg-white hover:bg-opacity-10"
              >
                {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
              </button>
              
              <Link href="/editor" className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded">
                  <FileText className="h-6 w-6 text-[#002C40]" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Editor Dashboard</h1>
                  <p className="text-xs opacity-80">Journal Management</p>
                </div>
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="text-white hover:bg-white hover:bg-opacity-10 relative">
                <Bell className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">
                  3
                </Badge>
              </Button>

              {/* User info */}
              <div className="hidden sm:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium">{user.full_name || user.username}</p>
                  <p className="text-xs opacity-80">Editor</p>
                </div>
                <div className="w-8 h-8 bg-[#006798] rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">
                    {(user.full_name || user.username).charAt(0).toUpperCase()}
                  </span>
                </div>
              </div>
              
              <Button
                onClick={logout}
                variant="ghost"
                size="sm"
                className="text-white hover:bg-white hover:bg-opacity-10"
              >
                <LogOut className="h-4 w-4 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className={`${sidebarOpen ? 'block' : 'hidden'} lg:block w-64 bg-white shadow-sm border-r border-gray-200 min-h-screen`}>
          <nav className="p-4 space-y-6">
            {/* WORKFLOW Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">WORKFLOW</h3>
              <div className="space-y-1">
                {workflowNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center justify-between px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        item.current
                          ? "bg-[#006798] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <div className="flex items-center space-x-3">
                        <Icon className="h-4 w-4" />
                        <span>{item.name}</span>
                      </div>
                      {item.badge && (
                        <Badge variant={item.current ? "secondary" : "default"} className="text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* MONITORING Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">MONITORING</h3>
              <div className="space-y-1">
                {monitoringNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        item.current
                          ? "bg-[#006798] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>

            {/* MANAGEMENT Section */}
            <div>
              <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">MANAGEMENT</h3>
              <div className="space-y-1">
                {managementNav.map((item) => {
                  const Icon = item.icon;
                  return (
                    <Link
                      key={item.name}
                      href={item.href}
                      className={`flex items-center px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                        item.current
                          ? "bg-[#006798] text-white"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                      onClick={() => setSidebarOpen(false)}
                    >
                      <Icon className="h-4 w-4 mr-3" />
                      <span>{item.name}</span>
                    </Link>
                  );
                })}
              </div>
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/editor" className="text-gray-700 hover:text-[#006798] inline-flex items-center">
                    <Home className="w-4 h-4 mr-2" />
                    Editor
                  </Link>
                </li>
                {pathname.split('/').slice(2).map((segment, index, array) => {
                  const href = '/editor/' + array.slice(0, index + 1).join('/');
                  const isLast = index === array.length - 1;
                  
                  return (
                    <li key={index}>
                      <div className="flex items-center">
                        <span className="text-gray-400">/</span>
                        {isLast ? (
                          <span className="text-gray-900 capitalize ml-2">
                            {segment.replace('-', ' ')}
                          </span>
                        ) : (
                          <Link 
                            href={href} 
                            className="text-gray-700 hover:text-[#006798] ml-2 capitalize"
                          >
                            {segment.replace('-', ' ')}
                          </Link>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
            </nav>
          </div>

          {/* Page Content */}
          {children}
        </main>
      </div>
    </div>
  );
}