import React, { useState } from 'react';
import { AuthProvider, useAuth } from '@/app/context/AuthContext';
import { Navigation } from '@/app/components/Navigation';
import { LoginPage } from '@/app/pages/LoginPage';
import { AdminDashboard } from '@/app/pages/AdminDashboard';
import { StudyMaterialPage } from '@/app/pages/StudyMaterialPage';
import { StudentProfilePage } from '@/app/pages/StudentProfilePage';
import { FeedbackPage } from '@/app/pages/FeedbackPage';
import { Toaster } from '@/app/components/ui/sonner';

const AppContent: React.FC = () => {
  const { currentUser } = useAuth();
  const [currentPage, setCurrentPage] = useState('dashboard');

  // Determine initial page based on role
  React.useEffect(() => {
    if (currentUser?.role === 'admin') {
      setCurrentPage('dashboard');
    } else if (currentUser?.role === 'professor') {
      setCurrentPage('materials');
    } else if (currentUser?.role === 'student') {
      setCurrentPage('materials');
    }
  }, [currentUser?.role]);

  // If not logged in, show login page
  if (!currentUser) {
    return <LoginPage />;
  }

  // Render current page
  const renderPage = () => {
    // Admin pages
    if (currentUser.role === 'admin') {
      if (currentPage === 'dashboard') return <AdminDashboard />;
      if (currentPage === 'materials') return <StudyMaterialPage />;
    }

    // Professor pages
    if (currentUser.role === 'professor') {
      if (currentPage === 'materials') return <StudyMaterialPage />;
    }

    // Student pages
    if (currentUser.role === 'student') {
      if (currentPage === 'materials') return <StudyMaterialPage />;
      if (currentPage === 'profile') return <StudentProfilePage />;
      if (currentPage === 'feedback') return <FeedbackPage />;
    }

    return <div>Page not found</div>;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-pink-50 to-blue-50">
      <Navigation currentPage={currentPage} onNavigate={setCurrentPage} />
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {renderPage()}
      </main>
    </div>
  );
};

export default function App() {
  return (
    <AuthProvider>
      <AppContent />
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}