import React, { useState } from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { UserRole } from '@/app/types';
import { Button } from '@/app/components/ui/button';
import { Input } from '@/app/components/ui/input';
import { Label } from '@/app/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/app/components/ui/tabs';
import { BookOpen, GraduationCap, ShieldCheck, Users, Sparkles, Library } from 'lucide-react';
import { toast } from 'sonner';

export const LoginPage: React.FC = () => {
  const { login, signup } = useAuth();
  const [selectedRole, setSelectedRole] = useState<UserRole | null>(null);
  const [isSignup, setIsSignup] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');

  // Signup state
  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupSubject, setSignupSubject] = useState('');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error('Please select a role first! 🎭');
      return;
    }
    
    const success = login(loginEmail, loginPassword);
    if (success) {
      toast.success(`Welcome back! 🎉`);
    } else {
      toast.error('Invalid credentials. Please try again! 🔒');
    }
  };

  const handleSignup = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedRole) {
      toast.error('Please select a role first! 🎭');
      return;
    }

    const newUser = {
      name: signupName,
      email: signupEmail,
      password: signupPassword,
      role: selectedRole,
      ...(selectedRole === 'professor' && { subject: signupSubject }),
      ...(selectedRole === 'student' && { academicPreferences: '' }),
    };

    const success = signup(newUser);
    if (success) {
      toast.success('Account created! Please login. 🎊');
      setIsSignup(false);
    } else {
      toast.error('Email already exists! 📧');
    }
  };

  const roleCards = [
    {
      role: 'admin' as UserRole,
      title: 'Admin',
      icon: ShieldCheck,
      color: 'from-purple-400 to-purple-600',
      description: 'Full system access & analytics',
      features: ['Manage Users', 'View Analytics', 'System Control'],
    },
    {
      role: 'professor' as UserRole,
      title: 'Professor',
      icon: GraduationCap,
      color: 'from-blue-400 to-blue-600',
      description: 'Upload & manage study materials',
      features: ['Upload Notes', 'Manage Content', 'Track Students'],
    },
    {
      role: 'student' as UserRole,
      title: 'Student',
      icon: BookOpen,
      color: 'from-pink-400 to-pink-600',
      description: 'Access learning materials',
      features: ['View Materials', 'Download Notes', 'Give Feedback'],
    },
  ];

  if (!selectedRole) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
        <div className="w-full max-w-5xl">
          {/* Header */}
          <div className="text-center mb-12 animate-fade-in">
            <div className="flex items-center justify-center gap-3 mb-4">
              <Library className="w-12 h-12 text-purple-600" />
              <h1 className="text-5xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                LearnHub LMS
              </h1>
              <Sparkles className="w-8 h-8 text-pink-500" />
            </div>
            <p className="text-gray-600 text-lg">
              Choose your role to continue your learning journey! 🚀
            </p>
          </div>

          {/* Role Selection Cards */}
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {roleCards.map((card) => {
              const Icon = card.icon;
              return (
                <Card
                  key={card.role}
                  className="cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl border-2 hover:border-purple-300"
                  onClick={() => setSelectedRole(card.role)}
                >
                  <CardHeader>
                    <div className={`w-16 h-16 rounded-full bg-gradient-to-br ${card.color} flex items-center justify-center mb-4 mx-auto`}>
                      <Icon className="w-8 h-8 text-white" />
                    </div>
                    <CardTitle className="text-center text-2xl">{card.title}</CardTitle>
                    <CardDescription className="text-center">{card.description}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {card.features.map((feature, idx) => (
                        <li key={idx} className="flex items-center gap-2 text-sm text-gray-600">
                          <Sparkles className="w-4 h-4 text-purple-500" />
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              );
            })}
          </div>

          {/* Helper Text */}
          <div className="text-center bg-white/60 backdrop-blur-sm rounded-lg p-4 shadow-sm">
            <Users className="w-6 h-6 text-purple-600 mx-auto mb-2" />
            <p className="text-sm text-gray-600">
              <strong>Demo Credentials:</strong> Use any existing user email (e.g., aditi.kahar@lms.edu) with password: admin123/prof123/student123
            </p>
          </div>
        </div>
      </div>
    );
  }

  const currentCard = roleCards.find(c => c.role === selectedRole)!;
  const Icon = currentCard.icon;

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <Button
          variant="ghost"
          onClick={() => setSelectedRole(null)}
          className="mb-4"
        >
          ← Back to Role Selection
        </Button>

        <Card className="shadow-2xl border-2">
          <CardHeader className="space-y-4">
            <div className={`w-20 h-20 rounded-full bg-gradient-to-br ${currentCard.color} flex items-center justify-center mx-auto`}>
              <Icon className="w-10 h-10 text-white" />
            </div>
            <CardTitle className="text-center text-3xl">
              {currentCard.title} Portal
            </CardTitle>
            <CardDescription className="text-center">
              {isSignup ? 'Create your account' : 'Welcome back! Please login'}
            </CardDescription>
          </CardHeader>

          <CardContent>
            <Tabs value={isSignup ? 'signup' : 'login'} onValueChange={(v) => setIsSignup(v === 'signup')}>
              <TabsList className="grid w-full grid-cols-2 mb-6">
                <TabsTrigger value="login">Login</TabsTrigger>
                <TabsTrigger value="signup">Sign Up</TabsTrigger>
              </TabsList>

              <TabsContent value="login">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div>
                    <Label htmlFor="login-email">Email</Label>
                    <Input
                      id="login-email"
                      type="email"
                      placeholder="your.email@lms.edu"
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="login-password">Password</Label>
                    <Input
                      id="login-password"
                      type="password"
                      placeholder="••••••••"
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      required
                    />
                  </div>
                  <Button type="submit" className="w-full">
                    Login as {currentCard.title} 🚀
                  </Button>
                </form>
              </TabsContent>

              <TabsContent value="signup">
                <form onSubmit={handleSignup} className="space-y-4">
                  <div>
                    <Label htmlFor="signup-name">Full Name</Label>
                    <Input
                      id="signup-name"
                      type="text"
                      placeholder="Your Name"
                      value={signupName}
                      onChange={(e) => setSignupName(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-email">Email</Label>
                    <Input
                      id="signup-email"
                      type="email"
                      placeholder="your.email@lms.edu"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div>
                    <Label htmlFor="signup-password">Password</Label>
                    <Input
                      id="signup-password"
                      type="password"
                      placeholder="••••••••"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                    />
                  </div>
                  {selectedRole === 'professor' && (
                    <div>
                      <Label htmlFor="signup-subject">Subject</Label>
                      <Input
                        id="signup-subject"
                        type="text"
                        placeholder="e.g., Mathematics"
                        value={signupSubject}
                        onChange={(e) => setSignupSubject(e.target.value)}
                        required
                      />
                    </div>
                  )}
                  <Button type="submit" className="w-full">
                    Create Account ✨
                  </Button>
                </form>
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
