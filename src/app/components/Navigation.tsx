import React from 'react';
import { useAuth } from '@/app/context/AuthContext';
import { Button } from '@/app/components/ui/button';
import { 
  LayoutDashboard, 
  BookOpen, 
  User, 
  MessageSquare, 
  LogOut,
  Library,
  Sparkles
} from 'lucide-react';

interface NavigationProps {
  currentPage: string;
  onNavigate: (page: string) => void;
}

export const Navigation: React.FC<NavigationProps> = ({ currentPage, onNavigate }) => {
  const { currentUser, logout } = useAuth();

  if (!currentUser) return null;

  const navItems = {
    admin: [
      { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
      { id: 'materials', label: 'Study Materials', icon: BookOpen },
    ],
    professor: [
      { id: 'materials', label: 'Study Materials', icon: BookOpen },
    ],
    student: [
      { id: 'materials', label: 'Study Materials', icon: BookOpen },
      { id: 'profile', label: 'My Profile', icon: User },
      { id: 'feedback', label: 'Feedback', icon: MessageSquare },
    ],
  };

  const items = navItems[currentUser.role] || [];

  return (
    <nav className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <div className="flex items-center gap-3">
            <Library className="w-8 h-8 text-purple-600" />
            <div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                LearnHub LMS
              </h1>
              <p className="text-xs text-gray-500 capitalize">{currentUser.role} Portal</p>
            </div>
          </div>

          {/* Navigation Items */}
          <div className="flex items-center gap-2">
            {items.map((item) => {
              const Icon = item.icon;
              const isActive = currentPage === item.id;
              return (
                <Button
                  key={item.id}
                  variant={isActive ? 'default' : 'ghost'}
                  onClick={() => onNavigate(item.id)}
                  className="flex items-center gap-2"
                >
                  <Icon className="w-4 h-4" />
                  <span className="hidden sm:inline">{item.label}</span>
                </Button>
              );
            })}

            {/* User Menu */}
            <div className="ml-4 pl-4 border-l border-gray-200 flex items-center gap-3">
              <div className="hidden md:block text-right">
                <p className="text-sm font-medium">{currentUser.name}</p>
                <p className="text-xs text-gray-500">{currentUser.email}</p>
              </div>
              <div className="w-10 h-10 bg-gradient-to-br from-purple-400 to-pink-600 rounded-full flex items-center justify-center text-white font-bold">
                {currentUser.name.charAt(0).toUpperCase()}
              </div>
              <Button
                variant="ghost"
                size="sm"
                onClick={logout}
                className="text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};
