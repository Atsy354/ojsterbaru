'use client';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { withAuth } from "@/lib/auth-client";
import { useState, useEffect } from "react";

function SiteSetupSettingsPage() {
  const [settings, setSettings] = useState({
    site_name: "Open Journal Systems",
    min_password_length: 6
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission here
    console.log('Saving settings:', settings);
  };

  return (
    <div className="space-y-6">
      <header className="flex items-center justify-between border-b border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3">
        <h2 className="text-sm font-semibold text-[var(--foreground)]">Settings</h2>
        <nav className="flex gap-3 text-sm font-semibold">
          <a className="text-[var(--muted)]">Español (España)</a>
          <a className="text-[var(--muted)]">Bahasa Indonesia</a>
          <a className="text-[var(--foreground)]">English</a>
        </nav>
      </header>
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="site_name">Site Name <span className="text-[#b91c1c]">*</span></Label>
          <Input 
            id="site_name" 
            name="site_name" 
            value={settings.site_name}
            onChange={(e) => setSettings({...settings, site_name: e.target.value})}
            className="max-w-xl" 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="min_password_length">Minimum password length (characters) <span className="text-[#b91c1c]">*</span></Label>
          <Input 
            id="min_password_length" 
            name="min_password_length" 
            type="number" 
            min={6} 
            value={settings.min_password_length}
            onChange={(e) => setSettings({...settings, min_password_length: parseInt(e.target.value)})}
            className="max-w-xs" 
          />
        </div>
        <div className="flex justify-end">
          <Button type="submit">Save</Button>
        </div>
      </form>
    </div>
  );
}

export default withAuth(SiteSetupSettingsPage, 'admin');