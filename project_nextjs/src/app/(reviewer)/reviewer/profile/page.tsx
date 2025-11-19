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
import { User, Mail, Phone, MapPin, Globe, Building, Award, BookOpen, FileText, Eye, Star } from 'lucide-react';

import { withAuth } from '@/lib/auth-client'

function ReviewerProfile() {
  const { user } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [profile, setProfile] = useState({
    full_name: user?.full_name || 'Dr. Sarah Johnson',
    email: user?.email || 'sarah.johnson@university.edu',
    orcid: '0000-0000-0000-0000',
    affiliation: 'University of Technology',
    department: 'Department of Educational Technology',
    position: 'Professor',
    country: 'United States',
    phone: '+1-555-987-6543',
    website: 'https://sarahjohnson.university.edu',
    bio: 'Dr. Sarah Johnson is a Professor in Educational Technology with over 15 years of experience in peer review. She has reviewed for numerous international journals and specializes in educational innovation, technology integration, and learning analytics.',
    research_interests: 'Educational Technology, Learning Analytics, Technology Integration, Online Learning',
    expertise: 'Educational Innovation, Digital Learning, Technology Assessment, Curriculum Design',
    review_experience: '15 years',
    review_count: 156,
    specializations: ['Educational Technology', 'Online Learning', 'Learning Analytics', 'Digital Assessment']
  });

  const [expertiseAreas] = useState([
    {
      id: 1,
      area: 'Educational Technology',
      level: 'Expert',
      experience: '15 years',
      reviews_completed: 45
    },
    {
      id: 2,
      area: 'Online Learning',
      level: 'Expert',
      experience: '12 years',
      reviews_completed: 38
    },
    {
      id: 3,
      area: 'Learning Analytics',
      level: 'Advanced',
      experience: '8 years',
      reviews_completed: 32
    },
    {
      id: 4,
      area: 'Digital Assessment',
      level: 'Expert',
      experience: '10 years',
      reviews_completed: 28
    },
    {
      id: 5,
      area: 'Curriculum Design',
      level: 'Advanced',
      experience: '14 years',
      reviews_completed: 25
    }
  ]);

  const handleSave = () => {
    setIsEditing(false);
    // Here you would typically save to your backend
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-bold text-gray-900">Reviewer Profile</h1>
        <Button onClick={() => isEditing ? handleSave() : setIsEditing(true)}>
          {isEditing ? 'Save Changes' : 'Edit Profile'}
        </Button>
      </div>

      <Tabs defaultValue="personal" className="space-y-4">
        <TabsList>
          <TabsTrigger value="personal">Personal Information</TabsTrigger>
          <TabsTrigger value="expertise">Expertise Areas</TabsTrigger>
          <TabsTrigger value="metrics">Review Metrics</TabsTrigger>
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

        <TabsContent value="expertise" className="space-y-4">
          <Card>
            <CardHeader>
              <CardTitle>Review Expertise Areas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {expertiseAreas.map((area) => (
                  <div key={area.id} className="border rounded-lg p-4">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-semibold text-lg">{area.area}</h3>
                      <Badge className={
                        area.level === 'Expert' ? 'bg-green-100 text-green-800' :
                        area.level === 'Advanced' ? 'bg-blue-100 text-blue-800' :
                        'bg-yellow-100 text-yellow-800'
                      }>
                        {area.level}
                      </Badge>
                    </div>
                    <div className="grid grid-cols-3 gap-4 text-sm">
                      <div>
                        <p className="text-gray-500">Experience</p>
                        <p className="font-medium">{area.experience}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Reviews Completed</p>
                        <p className="font-medium">{area.reviews_completed}</p>
                      </div>
                      <div>
                        <p className="text-gray-500">Avg. Rating</p>
                        <div className="flex items-center">
                          <Star className="h-4 w-4 text-yellow-400 fill-current mr-1" />
                          <span className="font-medium">4.8</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Specializations</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {profile.specializations.map((spec, index) => (
                  <Badge key={index} variant="secondary" className="text-sm">
                    {spec}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="metrics" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Total Reviews</CardTitle>
                <Eye className="h-4 w-4 text-blue-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{profile.review_count}</div>
                <p className="text-xs text-muted-foreground">{profile.review_experience} experience</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Accept Rate</CardTitle>
                <Award className="h-4 w-4 text-green-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-green-600">34.5%</div>
                <p className="text-xs text-muted-foreground">Balanced reviewer</p>
              </CardContent>
            </Card>
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">Reviewer Rating</CardTitle>
                <Star className="h-4 w-4 text-yellow-600" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-yellow-600">4.8</div>
                <p className="text-xs text-muted-foreground">Out of 5 stars</p>
              </CardContent>
            </Card>
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}

export default withAuth(ReviewerProfile, 'reviewer')
