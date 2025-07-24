import { Code, Palette, Globe, Music, Heart, Briefcase, Camera, BookOpen } from "lucide-react";

export const skillCategories = [
  {
    name: "Technology",
    icon: Code,
    description: "Programming, web development, data science, and more",
    skillCount: 45,
    color: "bg-primary"
  },
  {
    name: "Creative",
    icon: Palette,
    description: "Design, art, writing, photography, and creative skills",
    skillCount: 32,
    color: "bg-accent"
  },
  {
    name: "Languages",
    icon: Globe,
    description: "Learn new languages or practice with native speakers",
    skillCount: 28,
    color: "bg-purple-500"
  },
  {
    name: "Music",
    icon: Music,
    description: "Instruments, music theory, production, and composition",
    skillCount: 19,
    color: "bg-orange-500"
  },
  {
    name: "Health & Fitness",
    icon: Heart,
    description: "Yoga, fitness training, nutrition, and wellness",
    skillCount: 25,
    color: "bg-red-500"
  },
  {
    name: "Business",
    icon: Briefcase,
    description: "Marketing, finance, entrepreneurship, and leadership",
    skillCount: 31,
    color: "bg-blue-600"
  },
  {
    name: "Photography",
    icon: Camera,
    description: "Portrait, landscape, editing, and commercial photography",
    skillCount: 17,
    color: "bg-indigo-500"
  },
  {
    name: "Education",
    icon: BookOpen,
    description: "Teaching, tutoring, academic subjects, and research",
    skillCount: 22,
    color: "bg-green-600"
  }
];

export const mockUsers = [
  {
    id: "1",
    name: "Sarah Chen",
    location: "San Francisco, CA",
    avatar: "https://images.unsplash.com/photo-1494790108755-2616b612b786?w=64&h=64&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 23,
    offeredSkills: ["React", "TypeScript", "UI/UX Design"],
    wantedSkills: ["Spanish", "Photography"],
    availability: "Weekends"
  },
  {
    id: "2",
    name: "Marcus Johnson",
    location: "Austin, TX",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=64&h=64&fit=crop&crop=face",
    rating: 4.8,
    reviewCount: 15,
    offeredSkills: ["Guitar", "Music Theory", "Audio Production"],
    wantedSkills: ["Python", "Machine Learning"],
    availability: "Evenings"
  },
  {
    id: "3",
    name: "Emma Rodriguez",
    location: "New York, NY",
    avatar: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=64&h=64&fit=crop&crop=face",
    rating: 5.0,
    reviewCount: 31,
    offeredSkills: ["French", "Italian", "Translation"],
    wantedSkills: ["Digital Marketing", "SEO"],
    availability: "Flexible"
  },
  {
    id: "4",
    name: "David Kim",
    location: "Seattle, WA",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=64&h=64&fit=crop&crop=face",
    rating: 4.7,
    reviewCount: 18,
    offeredSkills: ["Photography", "Lightroom", "Drone Operation"],
    wantedSkills: ["Video Editing", "Motion Graphics"],
    availability: "Weekends"
  },
  {
    id: "5",
    name: "Lisa Thompson",
    location: "Portland, OR",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?w=64&h=64&fit=crop&crop=face",
    rating: 4.9,
    reviewCount: 27,
    offeredSkills: ["Yoga", "Meditation", "Nutrition"],
    wantedSkills: ["Web Development", "Graphic Design"],
    availability: "Mornings"
  },
  {
    id: "6",
    name: "Alex Rivera",
    location: "Denver, CO",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=64&h=64&fit=crop&crop=face",
    rating: 4.6,
    reviewCount: 12,
    offeredSkills: ["Excel", "Data Analysis", "Finance"],
    wantedSkills: ["Rock Climbing", "Photography"],
    availability: "Weekends"
  }
];

export const featuredSwaps = [
  {
    id: "1",
    userA: "Sarah Chen",
    userB: "Marcus Johnson",
    skillA: "React Development",
    skillB: "Guitar Lessons",
    status: "Active",
    duration: "4 weeks"
  },
  {
    id: "2",
    userA: "Emma Rodriguez",
    userB: "David Kim",
    skillA: "French Conversation",
    skillB: "Photography Workshop",
    status: "Completed",
    duration: "6 weeks"
  },
  {
    id: "3",
    userA: "Lisa Thompson",
    userB: "Alex Rivera",
    skillA: "Yoga Classes",
    skillB: "Financial Planning",
    status: "Active",
    duration: "8 weeks"
  }
];