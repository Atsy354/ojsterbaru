"use client";

import { useState } from "react";

import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";

import type { HostedJournal } from "../types";

const TAB_LIST = [
  "context",
  "search-indexing",
  "theme",
  "restrict-bulk-emails",
] as const;

type TabId = (typeof TAB_LIST)[number];

const TAB_LABELS: Record<TabId, string> = {
  context: "Context",
  "search-indexing": "Search Indexing",
  theme: "Theme",
  "restrict-bulk-emails": "Restrict Bulk Emails",
};

type Props = {
  journal: HostedJournal;
};

export function JournalSettingsWizard({ journal }: Props) {
  const [activeTab, setActiveTab] = useState<TabId>("context");

  return (
    <div className="flex flex-col gap-6">
      <Tabs defaultValue={activeTab} onValueChange={(value) => setActiveTab(value as TabId)}>
        <TabsList>
          {TAB_LIST.map((tab) => (
            <TabsTrigger key={tab} value={tab}>
              {TAB_LABELS[tab]}
            </TabsTrigger>
          ))}
        </TabsList>
      </Tabs>

      <div className="rounded-md border border-[var(--border)] bg-[var(--surface-muted)] p-5">
        {activeTab === "context" && <ContextTab journal={journal} />}
        {activeTab === "search-indexing" && <SearchIndexingTab />}
        {activeTab === "theme" && <ThemeTab />}
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

function ContextTab({ journal }: { journal: HostedJournal }) {
  return (
    <div className="space-y-6">
      <Section title="Context" description="Pengaturan dasar jurnal.">
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
function SearchIndexingTab() {
  return (
    <div className="space-y-6">
      <Section title="Search Indexing">
        <LabeledTextarea
          label="Keywords"
          defaultValue="Open Access, Research, Journal"
        />
        <LabeledTextarea
          label="Description"
          defaultValue="Jurnal ini menerbitkan penelitian mutakhir di bidang pengetahuan publik."
        />
      </Section>

      <Section title="Search Settings">
        <CheckboxField
          label="Include supplemental files in search index"
          description="Aktifkan pemindaian file tambahan untuk pencarian."
          defaultChecked
        />
      </Section>
    </div>
  );
}
function ThemeTab() {
  return (
    <div className="space-y-6">
      <Section title="Theme">
        <CheckboxField
          label="Use default site theme"
          description="Gunakan tema bawaan situs untuk jurnal ini."
          defaultChecked
        />
        <LabeledInput label="Select theme" defaultValue="default" />
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

