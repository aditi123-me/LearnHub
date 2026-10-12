import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User, StudyMaterial, Feedback } from '@/app/types';
import { initialUsers, initialMaterials, initialFeedback } from '@/app/data/mockData';

interface AuthContextType {
  currentUser: User | null;
  users: User[];
  materials: StudyMaterial[];
  feedback: Feedback[];
  login: (email: string, password: string) => boolean;
  logout: () => void;
  signup: (user: Omit<User, 'id'>) => boolean;
  updateProfile: (userId: string, updates: Partial<User>) => void;
  addMaterial: (material: Omit<StudyMaterial, 'id'>) => void;
  addFeedback: (feedback: Omit<Feedback, 'id'>) => void;
  deleteMaterial: (materialId: string) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [users, setUsers] = useState<User[]>(initialUsers);
  const [materials, setMaterials] = useState<StudyMaterial[]>(initialMaterials);
  const [feedback, setFeedback] = useState<Feedback[]>(initialFeedback);

  // Load from localStorage on mount
  useEffect(() => {
    const storedUser = localStorage.getItem('currentUser');
    const storedUsers = localStorage.getItem('users');
    const storedMaterials = localStorage.getItem('materials');
    const storedFeedback = localStorage.getItem('feedback');

    if (storedUser) setCurrentUser(JSON.parse(storedUser));
    if (storedUsers) setUsers(JSON.parse(storedUsers));
    if (storedMaterials) setMaterials(JSON.parse(storedMaterials));
    if (storedFeedback) setFeedback(JSON.parse(storedFeedback));
  }, []);

  // Save to localStorage when data changes
  useEffect(() => {
    if (currentUser) {
      localStorage.setItem('currentUser', JSON.stringify(currentUser));
    } else {
      localStorage.removeItem('currentUser');
    }
  }, [currentUser]);

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  useEffect(() => {
    localStorage.setItem('materials', JSON.stringify(materials));
  }, [materials]);

  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  const login = (email: string, password: string): boolean => {
    const user = users.find(u => u.email === email && u.password === password);
    if (user) {
      setCurrentUser(user);
      return true;
    }
    return false;
  };

  const logout = () => {
    setCurrentUser(null);
  };

  const signup = (newUser: Omit<User, 'id'>): boolean => {
    const emailExists = users.some(u => u.email === newUser.email);
    if (emailExists) return false;

    const user: User = {
      ...newUser,
      id: `${newUser.role}-${Date.now()}`,
    };
    setUsers([...users, user]);
    return true;
  };

  const updateProfile = (userId: string, updates: Partial<User>) => {
    setUsers(users.map(u => u.id === userId ? { ...u, ...updates } : u));
    if (currentUser && currentUser.id === userId) {
      setCurrentUser({ ...currentUser, ...updates });
    }
  };

  const addMaterial = (newMaterial: Omit<StudyMaterial, 'id'>) => {
    const material: StudyMaterial = {
      ...newMaterial,
      id: `mat-${Date.now()}`,
    };
    setMaterials([...materials, material]);
  };

  const addFeedback = (newFeedback: Omit<Feedback, 'id'>) => {
    const fb: Feedback = {
      ...newFeedback,
      id: `fb-${Date.now()}`,
    };
    setFeedback([...feedback, fb]);
  };

  const deleteMaterial = (materialId: string) => {
    setMaterials(materials.filter(m => m.id !== materialId));
  };

  return (
    <AuthContext.Provider
      value={{
        currentUser,
        users,
        materials,
        feedback,
        login,
        logout,
        signup,
        updateProfile,
        addMaterial,
        addFeedback,
        deleteMaterial,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
