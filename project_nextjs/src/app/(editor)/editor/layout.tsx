"use client";

import type { ReactNode } from "react";
import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";

import { EditorSideNav } from "@/components/editor/side-nav";
import { useAuth } from "@/contexts/AuthContext";

type Props = {
  children: ReactNode;
};

export default function EditorLayout({ children }: Props) {
  const router = useRouter();
  const pathname = usePathname();
  const { user, loading } = useAuth();
  const [authorized, setAuthorized] = useState<boolean | null>(null);
  
  // Check if we're on a submission detail page - if so, don't wrap with sidebar
  const isSubmissionDetail = pathname?.match(/\/editor\/submissions\/[^/]+$/);

  useEffect(() => {
    if (loading) {
      setAuthorized(null);
      return;
    }
    if (!user) {
      setAuthorized(false);
      router.replace("/login?source=/editor");
      return;
    }
    const canEdit = user.roles?.some(r => r.role_path === "editor" || r.role_path === "admin");
    if (!canEdit) {
      setAuthorized(false);
      router.replace("/dashboard");
      return;
    }
    setAuthorized(true);
  }, [user, loading, router]);

  if (authorized === null) {
    return <div className="min-h-screen bg-[var(--surface-muted)]" />;
  }

  if (!authorized) {
    return null;
  }

  // Skip wrapper for submission detail pages (they have their own full-screen layout)
  if (isSubmissionDetail) {
    return <>{children}</>;
  }

  return (
    <div className="pkp_structure_page" style={{minHeight: '100vh', backgroundColor: '#eaedee'}}>
      {/* Header - Single header like OJS original */}
      <header className="pkp_structure_head" style={{backgroundColor: '#002C40', color: 'white', padding: '1rem 2rem', borderBottom: '1px solid rgba(255,255,255,0.2)'}}>
        <div className="pkp_head_wrapper">
          <div className="pkp_site_name_wrapper">
            <h1 className="pkp_site_name">
              <a href="/" style={{color: 'white', textDecoration: 'none', fontSize: '1.5rem', fontWeight: 'normal'}}>
                OJS
              </a>
            </h1>
            <div className="pkp_site_name_text" style={{fontSize: '0.875rem', marginTop: '0.25rem', opacity: '0.9'}}>
              OPEN JOURNAL SYSTEMS
            </div>
          </div>
          
          {/* User info and logout - right side */}
          <div className="pkp_user_menu" style={{position: 'absolute', right: '2rem', top: '1rem', display: 'flex', alignItems: 'center', gap: '1rem'}}>
            <span style={{fontSize: '0.875rem'}}>{user?.full_name || user?.username}</span>
            <a href="/logout" style={{color: 'white', textDecoration: 'none', fontSize: '0.875rem'}}>Logout</a>
          </div>
        </div>
      </header>
      
      {/* Navigation Bar */}
      <nav className="pkp_structure_nav" style={{backgroundColor: '#006798', padding: '0.5rem 2rem', borderTop: '1px solid rgba(255,255,255,0.2)'}}>
        <ul className="pkp_nav_list" style={{listStyle: 'none', margin: 0, padding: 0, display: 'flex', gap: '2rem'}}>
          <li><a href="/editor" style={{color: 'white', textDecoration: 'none', fontSize: '0.875rem'}}>Editorial</a></li>
          <li><a href="/editor/submissions" style={{color: 'white', textDecoration: 'none', fontSize: '0.875rem'}}>Submissions</a></li>
          <li><a href="/editor/issues" style={{color: 'white', textDecoration: 'none', fontSize: '0.875rem'}}>Issues</a></li>
          <li><a href="/editor/statistics" style={{color: 'white', textDecoration: 'none', fontSize: '0.875rem'}}>Statistics</a></li>
          <li><a href="/editor/settings" style={{color: 'white', textDecoration: 'none', fontSize: '0.875rem'}}>Settings</a></li>
        </ul>
      </nav>
      
      {/* Main Content Area - Single sidebar only */}
      <div className="pkp_structure_content_wrapper" style={{display: 'flex', minHeight: 'calc(100vh - 120px)'}}>
        {/* Single Sidebar - Left side */}
        <div className="pkp_structure_sidebar left" style={{width: '250px', backgroundColor: '#006798', color: 'white', borderRight: '1px solid #ddd'}}>
          <EditorSideNav />
        </div>
        
        {/* Main Content */}
        <main className="pkp_structure_main" style={{flex: 1, backgroundColor: 'white', padding: '2rem'}}>
          {children}
        </main>
      </div>
      
      <style jsx>{`
        .pkp_structure_head {
          position: relative;
        }
        .pkp_structure_nav {
          border-top: 1px solid rgba(255,255,255,0.2);
        }
        .pkp_structure_content_wrapper {
          display: flex;
        }
        .pkp_user_menu {
          position: absolute;
          right: 2rem;
          top: 1rem;
        }
        .pkp_nav_list a:hover {
          text-decoration: underline;
        }
      `}</style>
    </div>
  );
}

export const dynamic = "force-dynamic";