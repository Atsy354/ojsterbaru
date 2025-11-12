import { notFound } from "next/navigation";

import { SITE_SETTING_TABS, type SiteSettingTab } from "@/config/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { FormMessage } from "@/components/ui/form-message";

type Props = {
  params: Promise<{ tab: SiteSettingTab }>;
};

export default async function SiteSettingsTabPage({ params }: Props) {
  const { tab } = await params;

  if (!SITE_SETTING_TABS.includes(tab)) {
    notFound();
  }

  return (
    <div className="space-y-8">
      {tab === "site-setup" && <SiteSetupTab />}
      {tab === "languages" && <LanguagesTab />}
      {tab === "plugins" && <PluginsTab />}
      {tab === "navigation-menus" && <NavigationMenusTab />}
      {tab === "bulk-emails" && <BulkEmailsTab />}
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
    <div className="mb-8 space-y-4">
      <div className="mb-4">
        <h2 className="text-lg font-semibold text-[var(--foreground)]">
          {title}
        </h2>
        {description && (
          <p className="mt-1 text-sm text-[var(--muted)]">{description}</p>
        )}
      </div>
      <div className="space-y-4">{children}</div>
    </div>
  );
}

function SiteSetupTab() {
  return (
    <>
      <Section
        title="Site Identity"
        description="Atur nama situs, logo, dan pernyataan pembuka."
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="site-name" className="mb-2 block text-sm font-medium">
              Site name <span className="text-[#b91c1c]">*</span>
            </Label>
            <Input id="site-name" defaultValue="Open Journal Systems" className="max-w-md" />
          </div>
          <div>
            <Label htmlFor="site-logo" className="mb-2 block text-sm font-medium">
              Site logo
            </Label>
            <div className="flex items-center gap-2">
              <Input
                id="site-logo"
                type="file"
                accept="image/*"
                className="max-w-xs text-sm file:mr-4 file:rounded-md file:border-0 file:bg-[var(--primary)] file:px-4 file:py-2 file:text-sm file:font-semibold file:text-white file:hover:bg-[var(--primary-dark)]"
              />
            </div>
          </div>
          <div>
            <Label htmlFor="intro" className="mb-2 block text-sm font-medium">
              Introductory statement
            </Label>
            <textarea
              id="intro"
              rows={4}
              defaultValue="Selamat datang di portal jurnal kami."
              className="w-full max-w-2xl rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm shadow-inner focus-visible:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-muted)]"
            />
          </div>
          <div>
            <Label htmlFor="footer" className="mb-2 block text-sm font-medium">
              Site footer
            </Label>
            <textarea
              id="footer"
              rows={3}
              defaultValue="© 2025 - Open Journal Systems."
              className="w-full max-w-2xl rounded-md border border-[var(--border)] bg-white px-3 py-2 text-sm shadow-inner focus-visible:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-muted)]"
            />
          </div>
        </div>
      </Section>

      <Section
        title="Redirect Options"
        description="Alihkan pengunjung langsung ke jurnal tertentu."
      >
        <div className="space-y-4">
          <div>
            <Label htmlFor="redirect-path" className="mb-2 block text-sm font-medium">
              Redirect journal path
            </Label>
            <Input id="redirect-path" placeholder="contoh: publicknowledge" className="max-w-md" />
            <FormMessage tone="muted" className="mt-2">
              Jika hanya ada satu jurnal, Anda dapat mengarahkan pengguna langsung ke jurnal tersebut.
            </FormMessage>
          </div>
        </div>
      </Section>

      <Section
        title="Contact Information"
        description="Informasi kontak yang tampil di seluruh situs."
      >
        <div className="space-y-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="support-name" className="mb-2 block text-sm font-medium">
                Support name <span className="text-[#b91c1c]">*</span>
              </Label>
              <Input id="support-name" defaultValue="Site Administrator" />
            </div>
            <div>
              <Label htmlFor="support-email" className="mb-2 block text-sm font-medium">
                Support email <span className="text-[#b91c1c]">*</span>
              </Label>
              <Input id="support-email" type="email" defaultValue="admin@example.com" />
            </div>
          </div>
          <div className="grid gap-4 md:grid-cols-2">
            <div>
              <Label htmlFor="support-phone" className="mb-2 block text-sm font-medium">
                Support phone
              </Label>
              <Input id="support-phone" defaultValue="+62 811 1234 5678" />
            </div>
            <div>
              <Label htmlFor="min-password" className="mb-2 block text-sm font-medium">
                Minimum password length <span className="text-[#b91c1c]">*</span>
              </Label>
              <Input id="min-password" type="number" defaultValue={8} className="max-w-xs" />
            </div>
          </div>
          <div className="flex justify-end pt-4">
            <Button>Simpan pengaturan</Button>
          </div>
        </div>
      </Section>
    </>
  );
}

function LanguagesTab() {
  return (
    <>
      <Section
        title="Available Locales"
        description="Aktifkan bahasa yang dapat digunakan oleh jurnal di situs ini."
      >
        <div className="flex flex-wrap gap-3">
          {["Bahasa Indonesia", "English", "Français", "Español"].map(
            (locale) => (
              <label
                key={locale}
                className="flex items-center gap-2 rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-2 text-sm"
              >
                <input type="checkbox" defaultChecked={locale !== "Français"} />
                {locale}
                {locale === "Bahasa Indonesia" && (
                  <span className="rounded bg-[var(--primary)] px-2 py-0.5 text-xs font-semibold text-white">
                    Default
                  </span>
                )}
              </label>
            ),
          )}
        </div>
        <div className="flex gap-3">
          <Button variant="secondary">Install Locale</Button>
          <Button>Simpan</Button>
        </div>
      </Section>

      <Section
        title="Language Settings"
        description="Atur bahasa antarmuka dan form input."
      >
        <Label htmlFor="primary-locale">Primary Locale</Label>
        <select
          id="primary-locale"
          className="h-11 w-full rounded-md border border-[var(--border)] bg-white px-3 text-sm text-[var(--foreground)] shadow-inner focus-visible:border-[var(--primary)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[var(--primary-muted)]"
        >
          <option>Bahasa Indonesia</option>
          <option>English</option>
          <option>Français</option>
          <option>Español</option>
        </select>
        <FormMessage tone="muted">
          Bahasa default akan digunakan pada kunjungan pertama pengguna.
        </FormMessage>
      </Section>
    </>
  );
}

function PluginsTab() {
  const pluginCategories = [
    {
      name: "Generic Plugins",
      plugins: [
        {
          id: "custom-block",
          name: "Custom Block Manager",
          description:
            "Kelola blok konten yang dapat ditempatkan di sidebar jurnal.",
          enabled: true,
        },
        {
          id: "google-analytics",
          name: "Google Analytics",
          description:
            "Tambahkan tracking Google Analytics ke situs jurnal Anda.",
          enabled: false,
        },
      ],
    },
    {
      name: "Import/Export Plugins",
      plugins: [
        {
          id: "crossref",
          name: "Crossref XML Export",
          description:
            "Ekspor metadata artikel ke format Crossref XML untuk registrasi DOI.",
          enabled: true,
        },
        {
          id: "doaj",
          name: "DOAJ Export Plugin",
          description: "Ekspor metadata ke Directory of Open Access Journals.",
          enabled: false,
        },
      ],
    },
  ];

  return (
    <>
      {pluginCategories.map((category) => (
        <Section key={category.name} title={category.name}>
          <div className="space-y-4">
            {category.plugins.map((plugin) => (
              <div
                key={plugin.id}
                className="flex flex-col gap-4 rounded-md border border-[var(--border)] bg-[var(--surface-muted)] p-4 md:flex-row md:items-center md:justify-between"
              >
                <div>
                  <h3 className="text-sm font-semibold text-[var(--foreground)]">
                    {plugin.name}
                  </h3>
                  <p className="mt-1 text-sm text-[var(--muted)]">
                    {plugin.description}
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <Label className="mb-0 flex items-center gap-2 text-sm">
                    <input
                      type="checkbox"
                      defaultChecked={plugin.enabled}
                      className="h-4 w-4 rounded border border-[var(--border)]"
                    />
                    Aktif
                  </Label>
                  <Button size="sm" variant="secondary">
                    Konfigurasi
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </Section>
      ))}
    </>
  );
}

function NavigationMenusTab() {
  const menus = [
    {
      name: "Primary Navigation",
      description:
        "Menu utama yang tampil di bagian atas halaman depan jurnal.",
      items: ["Home", "About", "Login", "Register"],
    },
    {
      name: "User Navigation",
      description:
        "Menu untuk user yang tampil di pojok kanan atas saat login.",
      items: ["Dashboard", "Profile", "Logout"],
    },
  ];

  return (
    <>
      {menus.map((menu) => (
        <Section key={menu.name} title={menu.name} description={menu.description}>
          <div className="space-y-3">
            {menu.items.map((item) => (
              <div
                key={item}
                className="flex items-center justify-between rounded-md border border-[var(--border)] bg-white px-4 py-3 text-sm"
              >
                <span>{item}</span>
                <div className="flex gap-2">
                  <Button size="sm" variant="secondary">
                    Edit
                  </Button>
                  <Button size="sm" variant="ghost">
                    Hapus
                  </Button>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button size="sm">Tambah Item</Button>
          </div>
        </Section>
      ))}
    </>
  );
}

function BulkEmailsTab() {
  const journals = [
    { id: "jpk", name: "Journal of Public Knowledge", allow: true },
    { id: "jsi", name: "Jurnal Sistem Informasi", allow: false },
    { id: "education", name: "E-Journal Pendidikan", allow: false },
  ];

  return (
    <>
      <Section
        title="Bulk Email Permissions"
        description="Tentukan jurnal yang diizinkan menggunakan fitur email massal."
      >
        <p className="text-sm text-[var(--muted)]">
          Fitur email massal dapat membantu mengirim pemberitahuan ke grup user
          tertentu. Pastikan mematuhi regulasi anti-spam.
        </p>
        <div className="space-y-3">
          {journals.map((journal) => (
            <label
              key={journal.id}
              className="flex items-center justify-between rounded-md border border-[var(--border)] bg-[var(--surface-muted)] px-4 py-3"
            >
              <span className="text-sm font-semibold text-[var(--foreground)]">
                {journal.name}
              </span>
              <input
                type="checkbox"
                defaultChecked={journal.allow}
                className="h-4 w-4 rounded border border-[var(--border)]"
              />
            </label>
          ))}
        </div>
        <div className="mt-4 flex justify-end">
          <Button>Simpan pengaturan</Button>
        </div>
      </Section>

      <Section title="Catatan Kepatuhan">
        <p className="text-sm text-[var(--muted)]">
          Penggunaan email massal harus memperhatikan peraturan anti-spam dan
          kebijakan privasi. Pastikan setiap pengguna telah memberikan
          persetujuan sebelum menerima pesan massal.
        </p>
      </Section>
    </>
  );
}

