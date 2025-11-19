'use client'

import { useAuth } from "@/contexts/AuthContext";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Home, 
  FileText, 
  Eye,
  Clock,
  CheckCircle,
  BarChart3,
  Settings,
  User,
  HelpCircle,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

export default function ReviewerLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, logout } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      href: "/reviewer/dashboard",
      icon: Home,
      current: pathname.startsWith("/reviewer/dashboard")
    },
    {
      name: "Review Assignments",
      href: "/reviewer/assignments",
      icon: FileText,
      current: pathname.startsWith("/reviewer/assignments"),
      badge: 3
    },
    {
      name: "Completed Reviews",
      href: "/reviewer/completed",
      icon: CheckCircle,
      current: pathname.startsWith("/reviewer/completed")
    },
    {
      name: "Review History",
      href: "/reviewer/history",
      icon: Eye,
      current: pathname.startsWith("/reviewer/history")
    },
    {
      name: "Statistics",
      href: "/reviewer/statistics",
      icon: BarChart3,
      current: pathname.startsWith("/reviewer/statistics")
    },
    {
      name: "Profile",
      href: "/reviewer/profile",
      icon: User,
      current: pathname.startsWith("/reviewer/profile")
    },
    {
      name: "Help",
      href: "/reviewer/help",
      icon: HelpCircle,
      current: pathname.startsWith("/reviewer/help")
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
              
              <Link href="/reviewer/dashboard" className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded">
                  <Eye className="h-6 w-6 text-[#002C40]" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">Reviewer Dashboard</h1>
                  <p className="text-xs opacity-80">Review & Evaluate Manuscripts</p>
                </div>
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              {/* Notifications */}
              <Button variant="ghost" size="sm" className="text-white hover:bg-white hover:bg-opacity-10 relative">
                <Clock className="h-4 w-4" />
                <Badge className="absolute -top-1 -right-1 h-4 w-4 p-0 text-xs bg-red-500">
                  1
                </Badge>
              </Button>

              {/* User info */}
              <div className="hidden sm:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium">{user.full_name || user.username}</p>
                  <p className="text-xs opacity-80">Reviewer</p>
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
          <nav className="p-4 space-y-2">
            {navigation.map((item) => {
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
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/reviewer" className="text-gray-700 hover:text-[#006798] inline-flex items-center">
                    <Home className="w-4 h-4 mr-2" />
                    Reviewer
                  </Link>
                </li>
                {pathname.split('/').slice(2).map((segment, index, array) => {
                  const href = '/reviewer/' + array.slice(0, index + 1).join('/');
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
