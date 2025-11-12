"use client";

import { Bell, ChevronDown, Languages, LogOut, Sitemap, UserCircle } from "lucide-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

import { Button } from "@/components/ui/button";
import { Dropdown, DropdownItem, DropdownSection } from "@/components/ui/dropdown";
import { useSupabase } from "@/providers/supabase-provider";
import type { User } from "@supabase/supabase-js";

export function TopBar() {
  const supabase = useSupabase();
  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    supabase.auth.getUser().then(({ data: { user } }) => {
      setUser(user);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user ?? null);
    });

    return () => subscription.unsubscribe();
  }, [supabase]);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    router.push("/login");
  };

  return (
    <header className="flex h-16 items-center justify-between border-b border-[var(--border)] bg-white px-6 shadow-sm">
      <div className="flex items-center gap-4">
        {/* Context/Journal Selector - akan ditampilkan jika ada multiple contexts */}
        {/* <Dropdown
          button={
            <>
              <Sitemap size={16} />
              <span className="sr-only">Contexts</span>
            </>
          }
          align="left"
        >
          <DropdownSection>
            <DropdownItem href="/journal/1">Journal 1</DropdownItem>
            <DropdownItem href="/journal/2">Journal 2</DropdownItem>
          </DropdownSection>
        </Dropdown> */}

        {/* Site/Journal Title */}
        <Link href="/admin/site-management" className="text-lg font-semibold text-[var(--foreground)] hover:text-[var(--primary-dark)]">
          Open Journal Systems
        </Link>
      </div>

      {user && (
        <div className="flex items-center gap-4">
          {/* Tasks Button */}
          <Button variant="ghost" size="sm" className="relative gap-2">
            <Bell size={16} />
            <span className="sr-only">Tasks</span>
            <span className="absolute -right-1 -top-1 flex h-5 w-5 items-center justify-center rounded-full bg-[var(--primary)] text-xs font-semibold text-white">
              0
            </span>
          </Button>

          {/* User Dropdown */}
          <Dropdown
            button={
              <>
                <UserCircle size={18} />
                <span className="sr-only">{user.email}</span>
              </>
            }
            align="right"
          >
            <DropdownSection>
              {user.email && (
                <div className="px-4 py-2 text-xs font-semibold text-[var(--muted)]">
                  {user.email}
                </div>
              )}
            </DropdownSection>
            <DropdownSection>
              <DropdownItem href="/admin/profile" icon={<UserCircle size={14} />}>
                Edit Profile
              </DropdownItem>
            </DropdownSection>
            <DropdownSection>
              <DropdownItem onClick={handleLogout} icon={<LogOut size={14} />}>
                Log Out
              </DropdownItem>
            </DropdownSection>
          </Dropdown>
        </div>
      )}

      {!user && (
        <div className="flex items-center gap-4 text-sm">
          <Dropdown
            button={
              <>
                <Languages size={16} />
                English
                <ChevronDown size={14} />
              </>
            }
            align="right"
          >
            <DropdownSection>
              <DropdownItem href="?locale=en">English</DropdownItem>
              <DropdownItem href="?locale=id">Indonesia</DropdownItem>
            </DropdownSection>
          </Dropdown>
          <Link href="/login" className="text-sm font-semibold text-[var(--foreground)] hover:text-[var(--primary-dark)]">
            Sign in
          </Link>
        </div>
      )}
    </header>
  );
}

