"use client";

import type { ReactNode } from "react";
import { useEffect, useState, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Link from "next/link";
import { ChevronDown, ChevronRight, Bell, User, Home, BookOpen, LogOut, Settings, Users, BarChart3, FileText } from "lucide-react";

import { useAuth } from "@/contexts/AuthContext";
import { useSupabase } from "@/providers/supabase-provider";
import { getRedirectPathByRole } from "@/lib/auth-redirect";
import { LanguageSwitcher } from "@/components/admin/language-switcher";
import { useI18n } from "@/contexts/I18nContext";

type Props = {
  children: ReactNode;
};

export default function ManagerLayout({ children }: Props) {
  const { t } = useI18n();
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading, logout } = useAuth();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  const supabase = useSupabase();
  const [journals, setJournals] = useState<{ id: string; title: string; path: string }[]>([]);
  const [journalDropdownOpen, setJournalDropdownOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const journalDropdownRef = useRef<HTMLDivElement>(null);
  const userDropdownRef = useRef<HTMLDivElement>(null);

  // Fetch journals for dropdown
  useEffect(() => {
    const fetchJournals = async () => {
      try {
        const { data } = await supabase
          .from("journals")
          .select("*")
          .order("created_at", { ascending: true });
        let rows = ((data ?? []) as Record<string, any>[]).map((r) => ({
          id: r.id as string,
          title: (r.title ?? r.name ?? r.journal_title ?? "") as string,
          path: (r.path ?? r.slug ?? r.journal_path ?? "") as string,
        }));
        const missingNameIds = rows.filter((j) => !j.title || j.title.trim().length === 0).map((j) => j.id);
        if (missingNameIds.length) {
          const { data: js } = await supabase
            .from("journal_settings")
            .select("journal_id, setting_value")
            .eq("setting_name", "name")
            .in("journal_id", missingNameIds);
          const nameMap = new Map((js ?? []).map((j) => [j.journal_id, j.setting_value]));
          rows = rows.map((j) => (nameMap.has(j.id) ? { ...j, title: nameMap.get(j.id) as string } : j));
        }
        setJournals(rows.filter((j) => j.title && j.title.trim().length > 0));
      } catch (error) {
        console.error("Error fetching journals:", error);
      }
    };
    if (user) {
      fetchJournals();
    }
  }, [supabase, user]);

  useEffect(() => {
    if (loading) {
      setAuthorized(null);
      return;
    }
    if (!user) {
      setAuthorized(false);
      router.replace("/login?source=/manager");
      return;
    }
    
    // Debug: Log user and roles
    console.log("Manager Layout - User:", user);
    console.log("Manager Layout - User roles:", user.roles);
    
    const canManage = user.roles?.some(r => {
      const rolePath = r.role_path?.toLowerCase();
      return rolePath === "manager" || rolePath === "admin";
    });
    
    console.log("Manager Layout - Can manage:", canManage);
    
    if (!canManage) {
      setAuthorized(false);
      const redirectPath = getRedirectPathByRole(user);
      console.log("Manager Layout - Redirecting to:", redirectPath);
      router.replace(redirectPath);
      return;
    }
    setAuthorized(true);
  }, [user, loading, router]);

  // Auto-open Settings submenu when landing on any /manager/settings route
  useEffect(() => {
    if (pathname?.startsWith("/manager/settings")) {
      setSettingsOpen(true);
    }
  }, [pathname]);

  // Handle click outside for dropdowns
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (journalDropdownRef.current && !journalDropdownRef.current.contains(event.target as Node)) {
        setJournalDropdownOpen(false);
      }
      if (userDropdownRef.current && !userDropdownRef.current.contains(event.target as Node)) {
        setUserDropdownOpen(false);
      }
    }

    if (journalDropdownOpen || userDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [journalDropdownOpen, userDropdownOpen]);

  if (authorized === null) {
    return (
      <div style={{
        minHeight: '100vh',
        backgroundColor: '#eaedee'
      }} />
    );
  }

  if (!authorized) {
    return null;
  }

  const handleLogout = async () => {
    await logout();
    router.push("/login");
  };

  const navItems = [
    { href: "/manager", label: "Dashboard", icon: Home },
    { href: "/manager/submissions", label: "Submissions", icon: FileText },
    { href: "/manager/issues", label: "Issues", icon: FileText },
    { href: "/manager/users", label: "Users & Roles", icon: Users },
    { href: "/manager/publishing", label: "Publishing", icon: BookOpen },
    { href: "/manager/statistics", label: "Statistics", icon: BarChart3 },
    { href: "/manager/settings", label: "Settings", icon: Settings },
    { href: "/manager/tools", label: "Tools", icon: FileText },
  ];

  const settingsSubmenu = [
    { label: "Website", href: "/manager/settings/website" },
    { label: "Workflow", href: "/manager/settings/workflow" },
    { label: "Distribution", href: "/manager/settings/distribution" },
  ];

  const isActive = (href: string) => {
    if (href === "/manager") {
      return pathname === "/manager";
    }
    return pathname?.startsWith(href);
  };

  return (
    <div style={{
      minHeight: '100vh',
      backgroundColor: '#eaedee',
      display: 'flex'
    }}>
      {/* Sidebar - OJS PKP 3.3 Style */}
      <aside style={{
        width: '256px',
        backgroundColor: '#002C40',
        borderRight: 'none',
        flexShrink: 0,
        display: 'flex',
        flexDirection: 'column'
      }}>
        <div style={{
          padding: '1rem',
          borderBottom: 'none',
          backgroundColor: '#002C40'
        }}>
          <Link 
            href="/manager" 
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
              textDecoration: 'none'
            }}
          >
            <BookOpen style={{ height: '1.5rem', width: '1.5rem', color: '#ffffff' }} />
            <span style={{
              fontSize: '1.125rem',
              fontWeight: 600,
              color: '#ffffff'
            }}>
              Journal Manager
            </span>
          </Link>
        </div>
        <nav style={{ padding: '0.5rem' }}>
          {navItems.map((item) => {
            const Icon = item.icon;
            const active = isActive(item.href);

            // Special handling for Settings to show collapsible submenu like OJS 3.3
            if (item.href === "/manager/settings") {
              // Parent is only highlighted when exactly on /manager/settings,
              // when on a submenu route the highlight moves to the submenu item.
              const parentActive = pathname === "/manager/settings";
              const open = settingsOpen;

              return (
                <div key={item.href}>
                  <button
                    type="button"
                    onClick={() => {
                      setSettingsOpen((prev) => !prev);
                      router.push(item.href);
                    }}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '0.5rem 0.75rem',
                      borderRadius: '0.375rem',
                      marginBottom: '0.25rem',
                  backgroundColor: parentActive ? '#ffffff' : 'transparent',
                  color: parentActive ? '#002C40' : '#ffffff',
                      fontSize: '0.875rem',
                      border: 'none',
                      cursor: 'pointer',
                      transition: 'background-color 0.15s ease-in-out',
                    }}
                    onMouseEnter={(e) => {
                      if (!parentActive) {
                        e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                      }
                    }}
                    onMouseLeave={(e) => {
                      if (!parentActive) {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }
                    }}
                  >
                    <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Icon style={{ height: '1rem', width: '1rem' }} />
                      <span>{item.label}</span>
                    </span>
                    <ChevronRight
                      style={{
                        height: '1rem',
                        width: '1rem',
                        transform: open ? 'rotate(90deg)' : 'rotate(0deg)',
                        transition: 'transform 0.15s ease-in-out',
                      }}
                    />
                  </button>

                  {open && (
                    <div style={{ marginLeft: '0.5rem', marginTop: '0.25rem' }}>
                      {settingsSubmenu.map((subItem) => {
                        const subActive = pathname === subItem.href;
                        return (
                          <Link
                            key={subItem.href}
                            href={subItem.href}
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              gap: '0.5rem',
                              padding: '0.5rem 0.75rem',
                              borderRadius: '0.375rem',
                              marginBottom: '0.25rem',
                              fontSize: '0.875rem',
                              backgroundColor: subActive ? '#ffffff' : 'transparent',
                              color: subActive ? '#002C40' : '#ffffff',
                              textDecoration: 'none',
                              transition: 'background-color 0.15s ease-in-out',
                              cursor: 'pointer',
                            }}
                            onMouseEnter={(e) => {
                              if (!subActive) {
                                e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!subActive) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              }
                            }}
                          >
                            {subItem.label}
                          </Link>
                        );
                      })}
                    </div>
                  )}
                </div>
              );
            }

            // Regular navigation items
            return (
              <Link
                key={item.href}
                href={item.href}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 0.75rem',
                  borderRadius: '0.375rem',
                  marginBottom: '0.25rem',
                  textDecoration: 'none',
                  backgroundColor: active ? '#ffffff' : 'transparent',
                  color: active ? '#002C40' : '#ffffff',
                  fontSize: '0.875rem',
                  transition: 'background-color 0.15s ease-in-out',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = 'rgba(255,255,255,0.1)';
                  }
                }}
                onMouseLeave={(e) => {
                  if (!active) {
                    e.currentTarget.style.backgroundColor = 'transparent';
                  }
                }}
              >
                <Icon style={{ height: '1rem', width: '1rem' }} />
                <span>{item.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>

      {/* Main Content */}
      <div style={{
        flex: 1,
        display: 'flex',
        flexDirection: 'column',
        minWidth: 0
      }}>
        {/* Header - OJS PKP 3.3 Style (dark blue bar, same theme as editor) */}
        <header style={{
          backgroundColor: '#002C40',
          borderBottom: '1px solid #001826',
          padding: '0.75rem 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between'
        }}>
          <div style={{
            display: 'flex',
            alignItems: 'center',
            gap: '1rem'
          }}>
            {journals.length > 0 && (
              <div ref={journalDropdownRef} style={{ position: 'relative' }}>
                <button
                  onClick={() => setJournalDropdownOpen(!journalDropdownOpen)}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.25rem',
                    color: '#ffffff',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer',
                    padding: '0.25rem 0.5rem'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = '#e5e7eb';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = '#ffffff';
                  }}
                >
                  <span>{journals[0]?.title || "Select Journal"}</span>
                  <ChevronDown style={{ height: '1rem', width: '1rem', color: 'inherit' }} />
                </button>
                {journalDropdownOpen && (
                  <div style={{
                    position: 'absolute',
                    top: '100%',
                    left: 0,
                    marginTop: '0.5rem',
                    minWidth: '200px',
                    backgroundColor: '#ffffff',
                    border: '1px solid #dee2e6',
                    borderRadius: '0.375rem',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                    zIndex: 50
                  }}>
                    {journals.map((journal) => (
                      <Link
                        key={journal.id}
                        href={`/manager?journal=${journal.id}`}
                        style={{
                          display: 'block',
                          padding: '0.5rem 1rem',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: '#000000',
                          textDecoration: 'none',
                          borderBottom: '1px solid #f3f4f6'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.backgroundColor = '#f3f4f6';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.backgroundColor = 'transparent';
                        }}
                      >
                        {journal.title}
                      </Link>
                    ))}
                  </div>
                )}
              </div>
            )}
          </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '1rem'
        }}>
          <LanguageSwitcher />
          <button
              style={{
                position: 'relative',
                padding: '0.5rem',
              color: '#ffffff',
                backgroundColor: 'transparent',
                border: 'none',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
              e.currentTarget.style.color = '#e5e7eb';
              }}
              onMouseLeave={(e) => {
              e.currentTarget.style.color = '#ffffff';
              }}
            >
              <Bell style={{ height: '1.25rem', width: '1.25rem' }} />
            </button>
            <div ref={userDropdownRef} style={{ position: 'relative' }}>
              <button
                onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                color: '#ffffff',
                  fontSize: '0.875rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '0.25rem 0.5rem'
                }}
                onMouseEnter={(e) => {
                e.currentTarget.style.color = '#e5e7eb';
                }}
                onMouseLeave={(e) => {
                e.currentTarget.style.color = '#ffffff';
                }}
              >
                <User style={{ height: '1.25rem', width: '1.25rem' }} />
                <span>{user?.full_name || user?.username || user?.email}</span>
                <ChevronDown style={{ height: '1rem', width: '1rem' }} />
              </button>
              {userDropdownOpen && (
                <div style={{
                  position: 'absolute',
                  top: '100%',
                  right: 0,
                  marginTop: '0.5rem',
                  minWidth: '200px',
                  backgroundColor: '#ffffff',
                  border: '1px solid #dee2e6',
                  borderRadius: '0.375rem',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1)',
                  zIndex: 50
                }}>
                  <div style={{ borderBottom: '1px solid #f3f4f6' }}>
                    <Link
                      href="/manager/profile"
                      style={{
                        display: 'block',
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#000000',
                        textDecoration: 'none'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      Profile
                    </Link>
                  </div>
                  <div>
                    <button
                      onClick={handleLogout}
                      style={{
                        width: '100%',
                        textAlign: 'left',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem',
                        padding: '0.5rem 1rem',
                        fontSize: '0.875rem',
                        fontWeight: 500,
                        color: '#000000',
                        backgroundColor: 'transparent',
                        border: 'none',
                        cursor: 'pointer'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#f3f4f6';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                    >
                      <LogOut style={{ height: '1rem', width: '1rem' }} />
                      Logout
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </header>

        {/* Page Content */}
        <main style={{
          flex: 1,
          overflow: 'auto'
        }}>
          {children}
        </main>
      </div>
    </div>
  );
}
export const dynamic = "force-dynamic";
