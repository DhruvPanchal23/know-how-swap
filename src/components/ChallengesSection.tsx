import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Trophy, Users, Clock, Target, CheckCircle } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

interface Challenge {
  id: string;
  title: string;
  description: string;
  category: string;
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  participants: number;
  maxParticipants: number;
  reward: string;
  progress?: number;
  isJoined?: boolean;
  isCompleted?: boolean;
  skills: string[];
}

const mockChallenges: Challenge[] = [
  {
    id: '1',
    title: 'Web Development Sprint',
    description: 'Build a complete website in 7 days using React and Node.js',
    category: 'Development',
    difficulty: 'Intermediate',
    duration: '7 days',
    participants: 23,
    maxParticipants: 50,
    reward: 'Web Development Certificate',
    skills: ['React', 'Node.js', 'CSS']
  },
  {
    id: '2',
    title: 'Design Thinking Workshop',
    description: 'Learn user-centered design principles through hands-on projects',
    category: 'Design',
    difficulty: 'Beginner',
    duration: '3 days',
    participants: 15,
    maxParticipants: 30,
    reward: 'UX Design Badge',
    skills: ['UI/UX Design', 'Figma', 'User Research']
  },
  {
    id: '3',
    title: 'Data Science Challenge',
    description: 'Analyze real-world datasets and present insights',
    category: 'Data Science',
    difficulty: 'Advanced',
    duration: '10 days',
    participants: 8,
    maxParticipants: 20,
    reward: 'Data Analyst Certificate',
    skills: ['Python', 'Machine Learning', 'Data Visualization']
  },
  {
    id: '4',
    title: 'Mobile App Development',
    description: 'Create a cross-platform mobile app from concept to deployment',
    category: 'Mobile',
    difficulty: 'Intermediate',
    duration: '14 days',
    participants: 18,
    maxParticipants: 40,
    reward: 'Mobile Developer Badge',
    isJoined: true,
    progress: 65,
    skills: ['React Native', 'JavaScript', 'App Store']
  }
];

export const ChallengesSection: React.FC = () => {
  const [challenges, setChallenges] = useState<Challenge[]>(mockChallenges);
  const [filter, setFilter] = useState<string>('all');
  const { currentUser } = useUser();
  const { toast } = useToast();

  const joinChallenge = (challengeId: string) => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to join challenges.",
        variant: "destructive"
      });
      return;
    }

    setChallenges(prev => prev.map(challenge => 
      challenge.id === challengeId 
        ? { 
            ...challenge, 
            isJoined: true, 
            participants: challenge.participants + 1,
            progress: 0 
          }
        : challenge
    ));

    toast({
      title: "Challenge Joined!",
      description: "You've successfully joined the challenge. Good luck!"
    });
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-yellow-100 text-yellow-800';
      case 'Advanced': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const filteredChallenges = challenges.filter(challenge => {
    if (filter === 'all') return true;
    if (filter === 'joined') return challenge.isJoined;
    if (filter === 'available') return !challenge.isJoined && challenge.participants < challenge.maxParticipants;
    return challenge.category.toLowerCase() === filter;
  });

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold">Community Challenges</h2>
          <p className="text-muted-foreground">Join skill-building challenges with the community</p>
        </div>
        
        <div className="flex gap-2">
          <Button 
            variant={filter === 'all' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('all')}
          >
            All
          </Button>
          <Button 
            variant={filter === 'joined' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('joined')}
          >
            Joined
          </Button>
          <Button 
            variant={filter === 'available' ? 'default' : 'outline'}
            size="sm"
            onClick={() => setFilter('available')}
          >
            Available
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredChallenges.map((challenge) => (
          <Card key={challenge.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{challenge.title}</CardTitle>
                  <CardDescription>{challenge.description}</CardDescription>
                </div>
                <Badge className={getDifficultyColor(challenge.difficulty)}>
                  {challenge.difficulty}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {challenge.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="grid grid-cols-2 gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{challenge.duration}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Users className="h-4 w-4 text-muted-foreground" />
                  <span>{challenge.participants}/{challenge.maxParticipants}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Trophy className="h-4 w-4 text-muted-foreground" />
                  <span>{challenge.reward}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-muted-foreground" />
                  <span>{challenge.category}</span>
                </div>
              </div>

              {challenge.isJoined && typeof challenge.progress === 'number' && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{challenge.progress}%</span>
                  </div>
                  <Progress value={challenge.progress} className="h-2" />
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <div className="text-sm text-muted-foreground">
                  {challenge.participants < challenge.maxParticipants 
                    ? `${challenge.maxParticipants - challenge.participants} spots left`
                    : 'Challenge full'
                  }
                </div>
                
                {challenge.isJoined ? (
                  <div className="flex items-center gap-2 text-green-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">Joined</span>
                  </div>
                ) : (
                  <Button 
                    onClick={() => joinChallenge(challenge.id)}
                    disabled={challenge.participants >= challenge.maxParticipants}
                    size="sm"
                  >
                    Join Challenge
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {filteredChallenges.length === 0 && (
        <div className="text-center py-12">
          <Trophy className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-medium mb-2">No challenges found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or check back later.</p>
        </div>
      )}
    </div>
  );
};