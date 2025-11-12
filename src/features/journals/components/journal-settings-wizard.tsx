"use client";

import { useState } from "react";

import { Tabs } from "@/components/ui/tabs";

import type { HostedJournal } from "../types";

const TAB_LIST = [
  "masthead",
  "contact",
  "appearance",
  "submission",
  "indexing",
  "users",
  "plugins",
  "restrict-bulk-emails",
] as const;

type TabId = (typeof TAB_LIST)[number];

const TAB_LABELS: Record<TabId, string> = {
  masthead: "Masthead",
  contact: "Contact",
  appearance: "Appearance",
  submission: "Submission",
  indexing: "Indexing",
  users: "Users",
  plugins: "Plugins",
  "restrict-bulk-emails": "Restrict Bulk Emails",
};

type Props = {
  journal: HostedJournal;
};

export function JournalSettingsWizard({ journal }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("masthead");

  return (
    <div className="flex flex-col gap-6">
      <Tabs
        tabs={TAB_LIST.map((tab) => ({
          id: tab,
          label: TAB_LABELS[tab],
        }))}
        activeTab={activeTab}
        onTabChange={(value) => setActiveTab(value as TabId)}
        variant="underline"
      />

      <div className="rounded-md border border-[var(--border)] bg-[var(--surface-muted)] p-5">
        {activeTab === "masthead" && <MastheadTab journal={journal} />}
        {activeTab === "contact" && <ContactTab />}
        {activeTab === "appearance" && <AppearanceTab />}
        {activeTab === "submission" && <SubmissionTab />}
        {activeTab === "indexing" && <IndexingTab />}
        {activeTab === "users" && <UsersTab />}
        {activeTab === "plugins" && <PluginsTab />}
        {activeTab === "restrict-bulk-emails" && <RestrictBulkEmailsTab />}
      </div>
    </div>
  );
}

function Section({
  title,
  description,
  children,
}: {
  title: string;
  description?: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-3 rounded-lg border border-[var(--border)] bg-white p-5 shadow-sm">
      <div>
        <h3 className="text-lg font-semibold text-[var(--foreground)]">
          {title}
        </h3>
        {description && (
          <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function LabeledInput({
  label,
  required = false,
  ...props
}: React.InputHTMLAttributes<HTMLInputElement> & { label: string; required?: boolean }) {
  return (
    <label className="block text-sm text-[var(--foreground)]">
      <span className="mb-2 block font-semibold">
        {label} {required && <span className="text-[#b91c1c]">*</span>}
      </span>
      <input
        className="h-11 w-full rounded-md border border-[var(--border)] bg-white px-3 text-sm shadow-inner focus-visible:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-muted)]"
        {...props}
      />
    </label>
  );
}

function LabeledTextarea({
  label,
  rows = 4,
  ...props
}: React.TextareaHTMLAttributes<HTMLTextAreaElement> & { label: string }) {
  return (
    <label className="block text-sm text-[var(--foreground)]">
      <span className="mb-2 block font-semibold">{label}</span>
      <textarea
        rows={rows}
        className="w-full rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm shadow-inner focus-visible:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-muted)]"
        {...props}
      />
    </label>
  );
}

function CheckboxField({
  label,
  description,
  defaultChecked,
}: {
  label: string;
  description?: string;
  defaultChecked?: boolean;
}) {
  return (
    <label className="flex items-start gap-3 rounded-md border border-[var(--border)] bg-white p-4">
      <input
        type="checkbox"
        defaultChecked={defaultChecked}
        className="mt-1 h-4 w-4 rounded border border-[var(--border)]"
      />
      <div className="space-y-1">
        <span className="text-sm font-semibold text-[var(--foreground)]">
          {label}
        </span>
        {description && (
          <p className="text-sm text-[var(--muted)]">{description}</p>
        )}
      </div>
    </label>
  );
}

function MastheadTab({ journal }: { journal: HostedJournal }) {
  return (
    <div className="space-y-6">
      <Section title="Masthead" description="Kelola informasi utama jurnal.">
        <LabeledInput
          label="Journal Name"
          required
          defaultValue={journal.name}
        />
        <LabeledInput label="Journal initials" required defaultValue="JPK" />
        <LabeledInput label="Journal abbreviation" defaultValue="JPK" />
        <LabeledInput
          label="Publisher"
          defaultValue="Simon Fraser University Library"
        />
        <div className="grid gap-4 md:grid-cols-2">
          <LabeledInput label="Online ISSN" defaultValue="1492-3831" />
          <LabeledInput label="Print ISSN" placeholder="Masukkan nomor" />
        </div>
      </Section>

      <Section title="Focus and Scope">
        <LabeledTextarea
          label="Focus and Scope"
          rows={6}
          defaultValue="Tuliskan cakupan jurnal secara ringkas di sini."
        />
      </Section>
    </div>
  );
}

function ContactTab() {
  return (
    <div className="space-y-6">
      <Section title="Principal Contact">
        <LabeledInput label="Nama" required defaultValue="Site Administrator" />
        <LabeledInput label="Email" required defaultValue="admin@example.com" />
        <LabeledTextarea label="Address" defaultValue="123 Library Road" />
        <LabeledInput label="Phone" defaultValue="+62 812 1234 5678" />
      </Section>
      <Section title="Technical Support Contact">
        <LabeledInput label="Nama" defaultValue="Support Team" />
        <LabeledInput label="Email" defaultValue="support@example.com" />
        <LabeledInput label="Phone" defaultValue="+62 811 9999 8888" />
      </Section>
    </div>
  );
}

function AppearanceTab() {
  return (
    <div className="space-y-6">
      <Section title="Theme and Styling">
        <CheckboxField
          label="Enable theme stylesheet"
          description="Aktifkan stylesheet khusus untuk jurnal ini."
        />
        <LabeledInput label="Upload journal stylesheet" type="file" />
      </Section>
      <Section title="Images">
        <LabeledInput label="Journal logo" type="file" />
        <LabeledInput label="Journal favicon" type="file" />
      </Section>
      <Section title="Additional Content">
        <LabeledTextarea
          label="About the Journal"
          rows={5}
          defaultValue="Deskripsikan informasi tentang jurnal di sini."
        />
      </Section>
    </div>
  );
}

function SubmissionTab() {
  return (
    <div className="space-y-6">
      <Section title="Author Guidelines">
        <LabeledTextarea
          label="Submission Checklist"
          rows={6}
          defaultValue="- Naskah belum pernah dipublikasikan."
        />
        <CheckboxField
          label="Active Submission Checklist"
          defaultChecked
          description="Checklist akan muncul saat penulis mengunggah naskah."
        />
      </Section>

      <Section title="Privacy Statement">
        <LabeledTextarea
          label="Privacy Statement"
          rows={6}
          defaultValue="Pernyataan privasi sesuai standar OJS."
        />
      </Section>
    </div>
  );
}

function IndexingTab() {
  return (
    <div className="space-y-6">
      <Section title="Indexing">
        <LabeledTextarea
          label="Keywords"
          defaultValue="Open Access, Research, Journal"
        />
        <LabeledTextarea
          label="Description"
          defaultValue="Jurnal ini menerbitkan penelitian mutakhir di bidang pengetahuan publik."
        />
      </Section>

      <Section title="Registration of Metadata">
        <CheckboxField
          label="Enable indexing metadata"
          description="Aktifkan metadata tambahan untuk indexing."
          defaultChecked
        />
      </Section>
    </div>
  );
}

function UsersTab() {
  return (
    <div className="space-y-6">
      <Section
        title="User Groups"
        description="Pilih role yang tersedia untuk jurnal ini."
      >
        <CheckboxField label="Journal Manager" defaultChecked />
        <CheckboxField label="Journal Editor" defaultChecked />
        <CheckboxField label="Production Editor" defaultChecked />
        <CheckboxField label="Section Editor" />
        <CheckboxField label="Copyeditor" />
        <CheckboxField label="Layout Editor" />
        <CheckboxField label="Proofreader" />
        <CheckboxField label="Author" defaultChecked />
        <CheckboxField label="Reader" defaultChecked />
        <CheckboxField label="Reviewer" defaultChecked />
      </Section>
    </div>
  );
}

function PluginsTab() {
  return (
    <div className="space-y-6">
      <Section title="Available Plugins">
        <CheckboxField
          label="ORCID Profile Connector"
          description="Sinkronisasi data ORCID untuk penulis dan reviewer."
          defaultChecked
        />
        <CheckboxField
          label="CrossRef Export Plugin"
          description="Ekspor metadata artikel ke CrossRef."
        />
        <CheckboxField
          label="Google Analytics Plugin"
          description="Integrasi pelacakan statistik Google Analytics."
        />
      </Section>
    </div>
  );
}

function RestrictBulkEmailsTab() {
  return (
    <div className="space-y-6">
      <Section
        title="Disable Roles"
        description="Role yang dicentang tidak akan menerima email massal dari jurnal ini."
      >
        <CheckboxField label="Journal manager" />
        <CheckboxField label="Journal editor" />
        <CheckboxField label="Production editor" />
        <CheckboxField label="Section editor" />
        <CheckboxField label="Guest editor" />
        <CheckboxField label="Author" />
        <CheckboxField label="Reader" defaultChecked />
      </Section>
      <p className="text-sm text-[var(--muted)]">
        Fitur email massal dapat dinonaktifkan sepenuhnya dari Admin &gt; Site
        Settings.
      </p>
    </div>
  );
}

