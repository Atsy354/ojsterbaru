"use client";

import Link from "next/link";
import { usePathname, useSearchParams } from "next/navigation";

const NAV_SECTIONS = [
  {
    label: "Workflow",
    items: [
      { label: "Dashboard", href: "/editor" },
      { label: "Unassigned", href: "/editor/submissions?queue=unassigned" },
      { label: "My Queue", href: "/editor/submissions?queue=my" },
      { label: "All Active", href: "/editor/submissions" },
      { label: "Archived", href: "/editor/submissions?queue=archived" },
    ],
  },
  {
    label: "Monitoring",
    items: [
      { label: "Production", href: "/editor/submissions?stage=production" },
      { label: "Copyediting", href: "/editor/submissions?stage=copyediting" },
      { label: "Review", href: "/editor/submissions?stage=review" },
    ],
  },
  {
    label: "Management",
    items: [
      { label: "Issues", href: "/editor/issues" },
      { label: "Announcements", href: "/editor/announcements" },
      { label: "Settings: Workflow", href: "/editor/settings/workflow" },
      { label: "Settings: Website", href: "/editor/settings/website" },
      { label: "Settings: Distribution", href: "/editor/settings/distribution" },
      { label: "Users & Roles", href: "/editor/users-roles" },
      { label: "Tools", href: "/editor/tools" },
    ],
  },
  {
    label: "Statistics",
    items: [
      { label: "Editorial", href: "/editor/statistics/editorial" },
      { label: "Publications", href: "/editor/statistics/publications" },
      { label: "Users", href: "/editor/statistics/users" },
    ],
  },
];

export function EditorSideNav() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  return (
    <aside className="pkp_structure_sidebar" style={{padding: '1rem'}}>
      <nav className="pkp_nav">
        {NAV_SECTIONS.map((section) => (
          <div key={section.label} className="pkp_nav_group" style={{marginBottom: '1.5rem'}}>
            <h4 className="pkp_nav_group_title" style={{fontSize: '0.75rem', fontWeight: 'bold', textTransform: 'uppercase', marginBottom: '0.5rem', color: 'rgba(255,255,255,0.8)'}}>
              {section.label}
            </h4>
            <ul className="pkp_nav_list" style={{listStyle: 'none', margin: 0, padding: 0}}>
              {section.items.map((item) => {
                const active = isActive(pathname, searchParams?.toString() ?? "", item.href);
                return (
                  <li key={item.href} style={{margin: 0}}>
                    <Link
                      href={item.href}
                      className="pkp_nav_link"
                      style={{
                        display: 'block',
                        padding: '0.5rem 0',
                        color: active ? 'white' : 'rgba(255,255,255,0.9)',
                        textDecoration: 'none',
                        fontSize: '0.875rem',
                        borderLeft: active ? '3px solid white' : 'none',
                        paddingLeft: active ? '0.75rem' : '1rem',
                        backgroundColor: active ? 'rgba(255,255,255,0.1)' : 'transparent'
                      }}
                    >
                      {item.label}
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>
        ))}
      </nav>
    </aside>
  );
}

function isActive(pathname: string, queryString: string, targetHref: string) {
  const [targetPath, targetQuery] = targetHref.split("?");
  if (pathname !== targetPath) {
    return false;
  }
  if (!targetQuery) {
    return true;
  }
  const current = new URLSearchParams(queryString);
  const target = new URLSearchParams(targetQuery);
  for (const [key, value] of target.entries()) {
    if (current.get(key) !== value) {
      return false;
    }
  }
  return true;
}

