'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { BookOpen, Calendar, Eye, Download, ExternalLink } from 'lucide-react';

import { withAuth } from '@/lib/auth-client'

function AuthorPublished() {
  const { user } = useAuth();
  const [articles] = useState([
    {
      id: 1,
      title: 'Digital Literacy in Higher Education: Challenges and Opportunities',
      journal: 'Journal of Educational Technology',
      volume: 'Vol. 15 No. 2',
      pages: '123-145',
      publication_date: '2024-01-15',
      doi: '10.1234/jet.2024.15.2.123',
      citations: 8,
      downloads: 156
    },
    {
      id: 2,
      title: 'The Role of Artificial Intelligence in Modern Education',
      journal: 'International Journal of Learning Technologies',
      volume: 'Vol. 12 No. 3',
      pages: '78-102',
      publication_date: '2023-11-20',
      doi: '10.5678/ijlt.2023.12.3.78',
      citations: 15,
      downloads: 234
    },
    {
      id: 3,
      title: 'Online Assessment Methods: A Comparative Study',
      journal: 'Educational Research Review',
      volume: 'Vol. 8 No. 1',
      pages: '45-67',
      publication_date: '2023-08-10',
      doi: '10.9876/err.2023.8.1.45',
      citations: 23,
      downloads: 412
    }
  ]);

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Published Articles</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Published</CardTitle>
            <BookOpen className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.length}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Citations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{articles.reduce((sum, article) => sum + article.citations, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Total Downloads</CardTitle>
            <BookOpen className="h-4 w-4 text-blue-600" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold text-blue-600">{articles.reduce((sum, article) => sum + article.downloads, 0)}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Avg. Citations</CardTitle>
            <Calendar className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{Math.round(articles.reduce((sum, article) => sum + article.citations, 0) / articles.length)}</div>
          </CardContent>
        </Card>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Publication History</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead>Journal</TableHead>
                <TableHead>Volume/Issue</TableHead>
                <TableHead>Publication Date</TableHead>
                <TableHead>DOI</TableHead>
                <TableHead>Citations</TableHead>
                <TableHead>Downloads</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {articles.map((article) => (
                <TableRow key={article.id}>
                  <TableCell className="max-w-md">
                    <div className="font-medium">{article.title}</div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{article.journal}</Badge>
                  </TableCell>
                  <TableCell>{article.volume}</TableCell>
                  <TableCell>{article.publication_date}</TableCell>
                  <TableCell>
                    <Badge variant="secondary" className="text-xs">
                      {article.doi}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-blue-100 text-blue-800">
                      {article.citations}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge className="bg-green-100 text-green-800">
                      {article.downloads}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button variant="ghost" size="sm">
                        <Eye className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <Download className="h-4 w-4" />
                      </Button>
                      <Button variant="ghost" size="sm">
                        <ExternalLink className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}

export default withAuth(AuthorPublished, 'author')