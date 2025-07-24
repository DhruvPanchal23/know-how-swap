import React, { createContext, useContext, useState, ReactNode } from 'react';

interface User {
  id: string;
  name: string;
  email: string;
  location: string;
  avatar: string;
  bio: string;
  rating: number;
  reviewCount: number;
  offeredSkills: Skill[];
  wantedSkills: Skill[];
  availability: string;
  joinedDate: string;
}

interface Skill {
  id: string;
  name: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  category: string;
}

interface SwapRequest {
  id: string;
  fromUserId: string;
  toUserId: string;
  fromUser: User;
  toUser: User;
  offeredSkill: Skill;
  requestedSkill: Skill;
  message: string;
  status: 'pending' | 'accepted' | 'rejected' | 'completed';
  createdAt: string;
  updatedAt: string;
}

interface UserContextType {
  currentUser: User | null;
  users: User[];
  swapRequests: SwapRequest[];
  setCurrentUser: (user: User | null) => void;
  updateUser: (user: User) => void;
  createSwapRequest: (request: Omit<SwapRequest, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateSwapRequest: (id: string, status: 'accepted' | 'rejected' | 'completed') => void;
  getUserById: (id: string) => User | undefined;
}

const UserContext = createContext<UserContextType | undefined>(undefined);

export const useUser = () => {
  const context = useContext(UserContext);
  if (context === undefined) {
    throw new Error('useUser must be used within a UserProvider');
  }
  return context;
};

// Mock current user for demo
const mockCurrentUser: User = {
  id: '1',
  name: 'Sarah Chen',
  email: 'sarah.chen@email.com',
  location: 'San Francisco, CA',
  avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face',
  bio: 'Passionate developer and designer with 5+ years of experience. Love teaching and learning new technologies!',
  rating: 4.9,
  reviewCount: 23,
  offeredSkills: [
    { id: '1', name: 'React', level: 'Expert', category: 'Technology' },
    { id: '2', name: 'TypeScript', level: 'Advanced', category: 'Technology' },
    { id: '3', name: 'UI/UX Design', level: 'Intermediate', category: 'Creative' }
  ],
  wantedSkills: [
    { id: '4', name: 'Spanish', level: 'Beginner', category: 'Languages' },
    { id: '5', name: 'Photography', level: 'Beginner', category: 'Creative' }
  ],
  availability: 'Weekends',
  joinedDate: '2023-01-15'
};

// Convert mock users to full User objects
const enhanceMockUsers = (): User[] => {
  return [
    {
      id: '2',
      name: 'Marcus Johnson',
      email: 'marcus.j@email.com',
      location: 'Austin, TX',
      avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face',
      bio: 'Professional musician and audio engineer. Love sharing music knowledge and learning tech skills.',
      rating: 4.8,
      reviewCount: 15,
      offeredSkills: [
        { id: '6', name: 'Guitar', level: 'Expert', category: 'Music' },
        { id: '7', name: 'Music Theory', level: 'Advanced', category: 'Music' },
        { id: '8', name: 'Audio Production', level: 'Expert', category: 'Music' }
      ],
      wantedSkills: [
        { id: '9', name: 'Python', level: 'Beginner', category: 'Technology' },
        { id: '10', name: 'Machine Learning', level: 'Beginner', category: 'Technology' }
      ],
      availability: 'Evenings',
      joinedDate: '2023-03-20'
    },
    {
      id: '3',
      name: 'Emma Rodriguez',
      email: 'emma.r@email.com',
      location: 'New York, NY',
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face',
      bio: 'Trilingual translator and language enthusiast. Passionate about connecting cultures through language.',
      rating: 5.0,
      reviewCount: 31,
      offeredSkills: [
        { id: '11', name: 'French', level: 'Expert', category: 'Languages' },
        { id: '12', name: 'Italian', level: 'Advanced', category: 'Languages' },
        { id: '13', name: 'Translation', level: 'Expert', category: 'Languages' }
      ],
      wantedSkills: [
        { id: '14', name: 'Digital Marketing', level: 'Intermediate', category: 'Business' },
        { id: '15', name: 'SEO', level: 'Beginner', category: 'Business' }
      ],
      availability: 'Flexible',
      joinedDate: '2022-11-10'
    },
    {
      id: '4',
      name: 'David Kim',
      email: 'david.kim@email.com',
      location: 'Seattle, WA',
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face',
      bio: 'Professional photographer specializing in portraits and landscapes. Always eager to learn new creative skills.',
      rating: 4.7,
      reviewCount: 18,
      offeredSkills: [
        { id: '16', name: 'Photography', level: 'Expert', category: 'Creative' },
        { id: '17', name: 'Lightroom', level: 'Advanced', category: 'Creative' },
        { id: '18', name: 'Drone Operation', level: 'Intermediate', category: 'Creative' }
      ],
      wantedSkills: [
        { id: '19', name: 'Video Editing', level: 'Beginner', category: 'Creative' },
        { id: '20', name: 'Motion Graphics', level: 'Beginner', category: 'Creative' }
      ],
      availability: 'Weekends',
      joinedDate: '2023-05-08'
    }
  ];
};

export const UserProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentUser, setCurrentUser] = useState<User | null>(mockCurrentUser);
  const [users, setUsers] = useState<User[]>([mockCurrentUser, ...enhanceMockUsers()]);
  const [swapRequests, setSwapRequests] = useState<SwapRequest[]>([]);

  const updateUser = (updatedUser: User) => {
    setUsers(prev => prev.map(user => user.id === updatedUser.id ? updatedUser : user));
    if (currentUser && currentUser.id === updatedUser.id) {
      setCurrentUser(updatedUser);
    }
  };

  const createSwapRequest = (request: Omit<SwapRequest, 'id' | 'createdAt' | 'updatedAt'>) => {
    const newRequest: SwapRequest = {
      ...request,
      id: Date.now().toString(),
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      status: 'pending'
    };
    setSwapRequests(prev => [...prev, newRequest]);
  };

  const updateSwapRequest = (id: string, status: 'accepted' | 'rejected' | 'completed') => {
    setSwapRequests(prev => 
      prev.map(request => 
        request.id === id 
          ? { ...request, status, updatedAt: new Date().toISOString() }
          : request
      )
    );
  };

  const getUserById = (id: string) => {
    return users.find(user => user.id === id);
  };

  return (
    <UserContext.Provider
      value={{
        currentUser,
        users,
        swapRequests,
        setCurrentUser,
        updateUser,
        createSwapRequest,
        updateSwapRequest,
        getUserById
      }}
    >
      {children}
    </UserContext.Provider>
  );
};