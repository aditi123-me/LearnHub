import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { User, Mail, BookOpen, Edit, Save } from 'lucide-react';
import { toast } from 'sonner';

export const StudentProfilePage: React.FC = () => {
  const { currentUser, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);

  const [name, setName] = useState(currentUser?.name || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [academicPreferences, setAcademicPreferences] = useState(currentUser?.academicPreferences || '');

  const handleSave = () => {
    if (!currentUser) return;

    updateProfile(currentUser.id, {
      name,
      email,
      academicPreferences,
    });

    setIsEditing(false);
    toast.success('Profile updated successfully! ✨');
  };

  const handleCancel = () => {
    setName(currentUser?.name || '');
    setEmail(currentUser?.email || '');
    setAcademicPreferences(currentUser?.academicPreferences || '');
    setIsEditing(false);
  };

  if (!currentUser) return null;

  return (
    <div className="space-y-8 max-w-3xl mx-auto">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent mb-2">
          My Profile
        </h1>
        <p className="text-gray-600">
          Manage your personal information and preferences 👤
        </p>
      </div>

      {/* Profile Card */}
      <Card className="border-2 border-pink-200 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-pink-50 to-purple-50">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 bg-gradient-to-br from-pink-400 to-purple-600 rounded-full flex items-center justify-center text-white text-3xl font-bold">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <CardTitle className="text-2xl">{currentUser.name}</CardTitle>
                <CardDescription className="text-base">{currentUser.email}</CardDescription>
              </div>
            </div>
            {!isEditing ? (
              <Button onClick={() => setIsEditing(true)}>
                <Edit className="w-4 h-4 mr-2" />
                Edit Profile
              </Button>
            ) : (
              <div className="flex gap-2">
                <Button onClick={handleSave}>
                  <Save className="w-4 h-4 mr-2" />
                  Save
                </Button>
                <Button variant="outline" onClick={handleCancel}>
                  Cancel
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent className="pt-6 space-y-6">
          <div className="space-y-4">
            <div>
              <Label htmlFor="name" className="flex items-center gap-2">
                <User className="w-4 h-4" />
                Full Name
              </Label>
              <Input
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>

            <div>
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" />
                Email Address
              </Label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>

            <div>
              <Label htmlFor="academicPreferences" className="flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Academic Preferences / Major
              </Label>
              <Input
                id="academicPreferences"
                value={academicPreferences}
                onChange={(e) => setAcademicPreferences(e.target.value)}
                placeholder="e.g., Computer Science, Data Science"
                disabled={!isEditing}
                className={!isEditing ? 'bg-gray-50' : ''}
              />
            </div>
          </div>

          {/* Account Info */}
          <div className="bg-gradient-to-r from-purple-50 to-pink-50 p-4 rounded-lg space-y-2">
            <h3 className="font-semibold text-lg mb-3">Account Information</h3>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-gray-600">Role</p>
                <p className="font-medium capitalize">{currentUser.role}</p>
              </div>
              <div>
                <p className="text-gray-600">User ID</p>
                <p className="font-medium font-mono text-xs">{currentUser.id}</p>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Tips Card */}
      <Card className="bg-gradient-to-br from-blue-50 to-purple-50">
        <CardHeader>
          <CardTitle className="text-lg">💡 Profile Tips</CardTitle>
        </CardHeader>
        <CardContent>
          <ul className="space-y-2 text-sm text-gray-700">
            <li>✨ Keep your profile information up to date</li>
            <li>📚 Set your academic preferences to get personalized recommendations</li>
            <li>📧 Make sure your email is correct to receive important updates</li>
            <li>🔒 Your information is secure and private</li>
          </ul>
        </CardContent>
      </Card>
    </div>
  );
};
