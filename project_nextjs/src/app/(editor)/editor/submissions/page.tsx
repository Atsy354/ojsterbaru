'use client'

import { useState, useEffect } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { 
  Eye, 
  MessageSquare, 
  Settings,
  Search,
  Filter,
  Download,
  Clock,
  User
} from "lucide-react";

// Mock data for submissions - sesuai gambar
const mockSubmissions = [
  {
    id: "1",
    title: "Pemanfaatan Machine Learning untuk Prediksi Cuaca di Daerah Tropis",
    author: "Dr. Andi Wijaya, M.Kom.",
    stage: "REVIEW",
    status: "In Review",
    submittedDate: "Jan 15, 2024",
    lastActivity: "20/01/2024 17.30",
    unreadComments: false
  },
  {
    id: "2", 
    title: "Analisis Sentimen Terhadap Kebijakan Pemerintah Menggunakan Deep Learning",
    author: "Siti Nurhaliza, S.T., M.T.",
    stage: "COPYEDITING",
    status: "Submitted",
    submittedDate: "Jan 10, 2024",
    lastActivity: "18/01/2024 21.20",
    unreadComments: false
  },
  {
    id: "3",
    title: "Perancangan Sistem Informasi Manajemen Perpustakaan Berbasis Web",
    author: "Bambang Suryadi, S.Kom., M.Kom.",
    stage: "PRODUCTION",
    status: "Accepted",
    submittedDate: "Jan 5, 2024",
    lastActivity: "22/01/2024 23.45",
    unreadComments: false
  },
  {
    id: "4",
    title: "Implementasi Blockchain untuk Keamanan Data Kesehatan",
    author: "Dr. Ratih Pratiwi, M.Kom.",
    stage: "SUBMISSION",
    status: "Submitted",
    submittedDate: "Jan 20, 2024",
    lastActivity: "21/01/2024 16.15",
    unreadComments: true
  }
];

const filterTabs = [
  { name: "My Queue", count: 4, filter: "my-queue" },
  { name: "Unassigned", count: 0, filter: "unassigned" },
  { name: "All Active", count: 8, filter: "all-active" },
  { name: "Archived", count: 12, filter: "archived" }
];

const getStageBadgeVariant = (stage: string) => {
  switch (stage) {
    case 'SUBMISSION':
      return 'destructive'; // merah
    case 'REVIEW':
      return 'warning'; // orange
    case 'COPYEDITING':
      return 'info'; // biru
    case 'PRODUCTION':
      return 'success'; // hijau
    default:
      return 'secondary';
  }
};

const getStatusBadgeVariant = (status: string) => {
  switch (status) {
    case 'In Review':
      return 'warning';
    case 'Submitted':
      return 'info';
    case 'Accepted':
      return 'success';
    case 'Rejected':
      return 'destructive';
    default:
      return 'secondary';
  }
};

export default function SubmissionsPage() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const [searchTerm, setSearchTerm] = useState("");
  
  const currentFilter = searchParams.get('filter') || 'all-active';
  const currentTab = filterTabs.find(tab => tab.filter === currentFilter) || filterTabs[2];

  const filteredSubmissions = mockSubmissions.filter(submission => {
    const matchesSearch = submission.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         submission.author.toLowerCase().includes(searchTerm.toLowerCase());
    
    // Filter berdasarkan tab yang dipilih
    if (currentFilter === 'my-queue') {
      return matchesSearch; // Nanti bisa filter berdasarkan editor yang login
    } else if (currentFilter === 'unassigned') {
      return matchesSearch && submission.stage === 'SUBMISSION';
    } else if (currentFilter === 'all-active') {
      return matchesSearch;
    } else if (currentFilter === 'production') {
      return matchesSearch && submission.stage === 'PRODUCTION';
    } else if (currentFilter === 'copyediting') {
      return matchesSearch && submission.stage === 'COPYEDITING';
    } else if (currentFilter === 'review') {
      return matchesSearch && submission.stage === 'REVIEW';
    } else {
      return matchesSearch;
    }
  });

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header dengan filter tabs - sesuai gambar */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-4">
            <div className="flex items-center justify-between mb-4">
              <h1 className="text-2xl font-bold text-gray-900">Submissions</h1>
              <div className="flex items-center space-x-2">
                <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                <span className="text-sm text-gray-600">Help</span>
              </div>
            </div>
            
            {/* Filter tabs */}
            <div className="flex items-center space-x-4 mb-4">
              {filterTabs.map((tab) => (
                <button
                  key={tab.filter}
                  onClick={() => router.push(`/editor/submissions?filter=${tab.filter}`)}
                  className={`px-3 py-1 rounded-full text-sm font-medium transition-colors ${
                    currentFilter === tab.filter
                      ? 'bg-blue-100 text-blue-800'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {tab.name} {tab.count > 0 && <span className="ml-1">{tab.count}</span>}
                </button>
              ))}
            </div>

            {/* Search dan controls */}
            <div className="flex items-center justify-between">
              <div className="relative flex-1 max-w-md">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
              </div>
              
              <div className="flex items-center space-x-2">
                <Button variant="outline" size="sm">
                  <Filter className="h-4 w-4 mr-1" />
                  Filters
                </Button>
                <Button className="bg-blue-600 hover:bg-blue-700">
                  New Submission
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Content area */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-lg font-semibold text-gray-900">{currentTab.name}</h2>
          </div>
          
          {/* Tabel submissions */}
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    ID
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Title
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Stage
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Last Activity
                  </th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {filteredSubmissions.map((submission) => (
                  <tr key={submission.id} className="hover:bg-gray-50">
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                      {submission.id}
                    </td>
                    <td className="px-6 py-4">
                      <div>
                        <Link 
                          href={`/editor/submissions/${submission.id}`}
                          className="text-blue-600 hover:text-blue-800 font-medium"
                        >
                          {submission.title}
                        </Link>
                        <div className="text-sm text-gray-500 mt-1">
                          <User className="inline h-3 w-3 mr-1" />
                          {submission.author}
                        </div>
                        <div className="text-xs text-gray-400 mt-1">
                          <Clock className="inline h-3 w-3 mr-1" />
                          Submitted {submission.submittedDate}
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        variant={getStageBadgeVariant(submission.stage)} 
                        className="text-xs uppercase"
                      >
                        {submission.stage}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap">
                      <Badge 
                        variant={getStatusBadgeVariant(submission.status)} 
                        className="text-xs"
                      >
                        {submission.status}
                      </Badge>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                      {submission.lastActivity}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      <div className="flex space-x-2">
                        <button className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100" title="View">
                          <Eye className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100" title="Notes">
                          <MessageSquare className="h-4 w-4" />
                        </button>
                        <button className="text-gray-600 hover:text-gray-800 p-1 rounded hover:bg-gray-100" title="Settings">
                          <Settings className="h-4 w-4" />
                        </button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {filteredSubmissions.length === 0 && (
            <div className="text-center py-8 text-gray-500">
              <p>No submissions found matching your criteria.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}