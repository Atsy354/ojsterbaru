import type { HostedJournal } from "./types";

export const mockHostedJournals: HostedJournal[] = [
  {
    id: "jpk",
    name: "Journal of Public Knowledge",
    path: "publicknowledge",
    description: "A journal for testing OJS 3.",
    isPublic: true,
  },
  {
    id: "jsi",
    name: "Jurnal Sistem Informasi",
    path: "jsi",
    description: "Menerbitkan riset sistem informasi dan teknologi terbaru.",
    isPublic: true,
  },
  {
    id: "e-journal",
    name: "E-Journal Pendidikan",
    path: "education",
    description:
      "Fokus pada penelitian pendidikan berbasis praktik lapangan dan teori kontemporer.",
    isPublic: false,
  },
];

