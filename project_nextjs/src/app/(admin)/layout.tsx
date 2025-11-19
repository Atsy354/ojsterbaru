'use client'

import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  ChevronDown, 
  Menu, 
  X, 
  Settings, 
  Users, 
  BookOpen, 
  BarChart3,
  Globe,
  Mail,
  Home,
  LogOut
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { hasRole } from "@/lib/auth";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const router = useRouter();
  const { user, loading, logout } = useAuth();
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const navigation = [
    {
      name: "Dashboard",
      href: "/admin",
      icon: Home,
      current: pathname === "/admin"
    },
    {
      name: "Hosted Journals",
      href: "/admin/site-management",
      icon: BookOpen,
      current: pathname.startsWith("/admin/site-management")
    },
    {
      name: "Users",
      href: "/admin/users",
      icon: Users,
      current: pathname.startsWith("/admin/users")
    },
    {
      name: "Site Settings",
      href: "/admin/site-settings/site-setup",
      icon: Settings,
      current: pathname.startsWith("/admin/site-settings")
    },
    {
      name: "Statistics",
      href: "/admin/statistics",
      icon: BarChart3,
      current: pathname.startsWith("/admin/statistics")
    }
  ];

  const siteSettingsSubmenu = [
    { name: "Setup", href: "/admin/site-settings/site-setup" },
    { name: "Languages", href: "/admin/site-settings/site-setup/languages" },
    { name: "Bulk Emails", href: "/admin/site-settings/site-setup/bulk-emails" },
    { name: "Navigation", href: "/admin/site-settings/site-setup/navigation" }
  ];

  // Proteksi role - hanya admin yang bisa akses area ini
  useEffect(() => {
    if (loading) return;
    
    if (!user) {
      router.push('/login?source=' + encodeURIComponent(window.location.pathname));
      return;
    }

    const hasAdminRole = hasRole(user, 'admin');
    if (!hasAdminRole) {
      router.push('/dashboard');
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#006798] mx-auto"></div>
          <p className="mt-4 text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !hasRole(user, 'admin')) {
    return null;
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
              
              <Link href="/admin" className="flex items-center space-x-3">
                <div className="bg-white p-2 rounded">
                  <BookOpen className="h-6 w-6 text-[#002C40]" />
                </div>
                <div>
                  <h1 className="text-xl font-bold">OJS Site Administration</h1>
                  <p className="text-xs opacity-80">Open Journal Systems</p>
                </div>
              </Link>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <div className="hidden sm:flex items-center space-x-3">
                <div className="text-right">
                  <p className="text-sm font-medium">{user.full_name || user.username}</p>
                  <p className="text-xs opacity-80">{user.email}</p>
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
                  className={`flex items-center space-x-3 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    item.current
                      ? "bg-[#006798] text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                  onClick={() => setSidebarOpen(false)}
                >
                  <Icon className="h-4 w-4" />
                  <span>{item.name}</span>
                </Link>
              );
            })}

            {/* Site Settings Submenu */}
            {pathname.startsWith("/admin/site-settings") && (
              <div className="ml-6 mt-2 space-y-1 border-l-2 border-gray-200 pl-4">
                {siteSettingsSubmenu.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={`block px-3 py-1 text-sm rounded ${
                      pathname === item.href
                        ? "text-[#006798] font-medium bg-blue-50"
                        : "text-gray-600 hover:text-gray-900 hover:bg-gray-50"
                    }`}
                    onClick={() => setSidebarOpen(false)}
                  >
                    {item.name}
                  </Link>
                ))}
              </div>
            )}
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {/* Breadcrumb */}
          <div className="mb-6">
            <nav className="flex" aria-label="Breadcrumb">
              <ol className="inline-flex items-center space-x-1 md:space-x-3">
                <li className="inline-flex items-center">
                  <Link href="/admin" className="text-gray-700 hover:text-[#006798] inline-flex items-center">
                    <Home className="w-4 h-4 mr-2" />
                    Admin
                  </Link>
                </li>
                {pathname.split('/').slice(2).map((segment, index, array) => {
                  const href = '/admin/' + array.slice(0, index + 1).join('/');
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
