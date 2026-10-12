import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/app/components/ui/card';
import { Users, GraduationCap, BookOpen, ShieldCheck, TrendingUp, Activity } from 'lucide-react';

export const AdminDashboard: React.FC = () => {
  const { users, materials, feedback } = useAuth();

  const stats = {
    totalUsers: users.length,
    students: users.filter(u => u.role === 'student').length,
    professors: users.filter(u => u.role === 'professor').length,
    admins: users.filter(u => u.role === 'admin').length,
    totalMaterials: materials.length,
    totalFeedback: feedback.length,
  };

  const statCards = [
    {
      title: 'Total Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'from-purple-400 to-purple-600',
      description: 'All registered users',
    },
    {
      title: 'Students',
      value: stats.students,
      icon: BookOpen,
      color: 'from-pink-400 to-pink-600',
      description: 'Active learners',
    },
    {
      title: 'Professors',
      value: stats.professors,
      icon: GraduationCap,
      color: 'from-blue-400 to-blue-600',
      description: 'Teaching staff',
    },
    {
      title: 'Admins',
      value: stats.admins,
      icon: ShieldCheck,
      color: 'from-green-400 to-green-600',
      description: 'System administrators',
    },
    {
      title: 'Study Materials',
      value: stats.totalMaterials,
      icon: TrendingUp,
      color: 'from-orange-400 to-orange-600',
      description: 'Available resources',
    },
    {
      title: 'Feedback Received',
      value: stats.totalFeedback,
      icon: Activity,
      color: 'from-teal-400 to-teal-600',
      description: 'User suggestions',
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-4xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent mb-2">
          Admin Dashboard
        </h1>
        <p className="text-gray-600">
          System overview and analytics 📊
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid md:grid-cols-3 gap-6">
        {statCards.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.title} className="hover:shadow-lg transition-shadow">
              <CardHeader className="flex flex-row items-center justify-between pb-2">
                <CardTitle className="text-sm font-medium text-gray-600">
                  {stat.title}
                </CardTitle>
                <div className={`w-12 h-12 rounded-full bg-gradient-to-br ${stat.color} flex items-center justify-center`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
              </CardHeader>
              <CardContent>
                <div className="text-3xl font-bold">{stat.value}</div>
                <p className="text-sm text-gray-500 mt-1">{stat.description}</p>
              </CardContent>
            </Card>
          );
        })}
      </div>

      {/* Users List */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Students</CardTitle>
            <CardDescription>All enrolled students</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.filter(u => u.role === 'student').map((student) => (
                <div key={student.id} className="flex items-center gap-3 p-3 bg-pink-50 rounded-lg">
                  <BookOpen className="w-5 h-5 text-pink-600" />
                  <div>
                    <p className="font-medium">{student.name}</p>
                    <p className="text-sm text-gray-500">{student.email}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Professors</CardTitle>
            <CardDescription>Teaching faculty</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {users.filter(u => u.role === 'professor').map((prof) => (
                <div key={prof.id} className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
                  <GraduationCap className="w-5 h-5 text-blue-600" />
                  <div>
                    <p className="font-medium">{prof.name}</p>
                    <p className="text-sm text-gray-500">{prof.subject}</p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Feedback */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Feedback</CardTitle>
          <CardDescription>Latest suggestions from students</CardDescription>
        </CardHeader>
        <CardContent>
          {feedback.length === 0 ? (
            <div className="text-center py-8 text-gray-500">
              <Activity className="w-12 h-12 mx-auto mb-2 opacity-50" />
              <p>No feedback yet</p>
            </div>
          ) : (
            <div className="space-y-4">
              {feedback.slice(0, 5).map((fb) => (
                <div key={fb.id} className="p-4 bg-gradient-to-r from-purple-50 to-pink-50 rounded-lg">
                  <div className="flex items-start justify-between mb-2">
                    <p className="font-medium">{fb.studentName}</p>
                    <span className="text-xs text-gray-500">{fb.date}</span>
                  </div>
                  <p className="text-sm text-gray-700">{fb.message}</p>
                  <span className="inline-block mt-2 text-xs bg-purple-200 text-purple-800 px-2 py-1 rounded">
                    {fb.category}
                  </span>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};
