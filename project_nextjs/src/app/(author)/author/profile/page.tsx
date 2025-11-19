'use client';

import { useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { User, Mail, Phone, MapPin, Globe, Building, Award, BookOpen, FileText } from 'lucide-react';

import { withAuth } from '@/lib/auth-client'

function AuthorProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    full_name: user?.full_name || 'Dr. John Doe',
    email: user?.email || 'john.doe@university.edu',
    orcid: '0000-0000-0000-0000',
    affiliation: 'University of Technology',
    department: 'Department of Computer Science',
    position: 'Associate Professor',
    country: 'United States',
    phone: '+1-555-123-4567',
    website: 'https://johndoe.university.edu',
    bio: 'Dr. John Doe is an Associate Professor in the Department of Computer Science with expertise in machine learning, educational technology, and artificial intelligence. He has published over 50 research papers in top-tier journals and conferences.',
    research_interests: 'Machine Learning, Educational Technology, Artificial Intelligence, Data Mining',
    expertise: 'Educational Data Mining, Learning Analytics, AI in Education'
  });

  const [affiliations] = useState([
    {
      id: 1,
      institution: 'University of Technology',
      department: 'Department of Computer Science',
      position: 'Associate Professor',
      start_date: '2018',
      end_date: 'Present'
    },
    {
      id: 2,
      institution: 'Research Institute of Technology',
      department: 'AI Research Lab',
      position: 'Senior Researcher',
      start_date: '2015',
      end_date: '2018'
    }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Author Profile</h1>
        <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="affiliations">Affiliations</TabsTrigger>
          <TabsTrigger value="metrics">Metrics</TabsTrigger>
        </TabsList>

        <TabsContent value="personal" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="full_name">Full Name</Label>
                  <Input
                    id="full_name"
                    value={profile.full_name}
                    onChange={(e) => setProfile({...profile, full_name: e.target.value})}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                  <User className="absolute left-3 top-8 h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={profile.email}
                    onChange={(e) => setProfile({...profile, email: e.target.value})}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                  <Mail className="absolute left-3 top-8 h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="orcid">ORCID</Label>
                  <Input
                    id="orcid"
                    value={profile.orcid}
                    onChange={(e) => setProfile({...profile, orcid: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={profile.phone}
                    onChange={(e) => setProfile({...profile, phone: e.target.value})}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                  <Phone className="absolute left-3 top-8 h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="affiliation">Institution</Label>
                  <Input
                    id="affiliation"
                    value={profile.affiliation}
                    onChange={(e) => setProfile({...profile, affiliation: e.target.value})}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                  <Building className="absolute left-3 top-8 h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="department">Department</Label>
                  <Input
                    id="department"
                    value={profile.department}
                    onChange={(e) => setProfile({...profile, department: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="position">Position</Label>
                  <Input
                    id="position"
                    value={profile.position}
                    onChange={(e) => setProfile({...profile, position: e.target.value})}
                    disabled={!isEditing}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="country">Country</Label>
                  <Input
                    id="country"
                    value={profile.country}
                    onChange={(e) => setProfile({...profile, country: e.target.value})}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                  <MapPin className="absolute left-3 top-8 h-4 w-4 text-gray-400" />
                </div>
                <div className="space-y-2 md:col-span-2">
                  <Label htmlFor="website">Website</Label>
                  <Input
                    id="website"
                    type="url"
                    value={profile.website}
                    onChange={(e) => setProfile({...profile, website: e.target.value})}
                    disabled={!isEditing}
                    className="pl-10"
                  />
                  <Globe className="absolute left-3 top-8 h-4 w-4 text-gray-400" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="bio">Biography</Label>
                <Textarea
                  id="bio"
                  rows={4}
                  value={profile.bio}
                  onChange={(e) => setProfile({...profile, bio: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="research_interests">Research Interests</Label>
                <Input
                  id="research_interests"
                  value={profile.research_interests}
                  onChange={(e) => setProfile({...profile, research_interests: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="expertise">Areas of Expertise</Label>
                <Input
                  id="expertise"
                  value={profile.expertise}
                  onChange={(e) => setProfile({...profile, expertise: e.target.value})}
                  disabled={!isEditing}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="affiliations" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Institutional Affiliations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {affiliations.map((affiliation) => (
                  <div key={affiliation.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold">{affiliation.institution}</h3>
                      <Badge variant="outline">{affiliation.start_date} - {affiliation.end_date}</Badge>
                    </div>
                    <p className="text-sm text-gray-600 mb-1">{affiliation.department}</p>
                    <p className="text-sm font-medium">{affiliation.position}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Publications</CardTitle>
                <BookOpen className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">5</div>
                <p className="text-xs text-muted-foreground">3 journals, 2 conferences</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Citations</CardTitle>
                <Award className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">31</div>
                <p className="text-xs text-muted-foreground">h-index: 3</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Active Submissions</CardTitle>
                <FileText className="h-4 w-4 text-orange-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-orange-600">4</div>
                <p className="text-xs text-muted-foreground">1 under review</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default withAuth(AuthorProfile, 'author')
