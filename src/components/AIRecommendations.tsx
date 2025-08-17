import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Sparkles, TrendingUp, Users, BookOpen, Target, RefreshCw } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

interface Recommendation {
  id: string;
  type: 'skill' | 'user' | 'course' | 'challenge';
  title: string;
  description: string;
  confidence: number;
  reason: string;
  metadata: {
    skill?: string;
    user?: { name: string; rating: number; avatar: string };
    difficulty?: string;
    duration?: string;
    participants?: number;
  };
}

export const AIRecommendations: React.FC = () => {
  const [recommendations, setRecommendations] = useState<Recommendation[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const { currentUser, users } = useUser();
  const { toast } = useToast();

  // Simulate AI recommendation generation
  const generateRecommendations = async () => {
    setIsLoading(true);
    
    // Simulate API call delay
    await new Promise(resolve => setTimeout(resolve, 2000));
    
    if (!currentUser) {
      setRecommendations([]);
      setIsLoading(false);
      return;
    }

    // Simple rule-based recommendations (in production, this would use ML)
    const newRecommendations: Recommendation[] = [];

    // Skill recommendations based on current skills
    if (currentUser.offeredSkills.some(skill => skill.name === 'JavaScript')) {
      newRecommendations.push({
        id: '1',
        type: 'skill',
        title: 'Learn TypeScript',
        description: 'Enhance your JavaScript skills with type safety',
        confidence: 0.95,
        reason: 'You already know JavaScript, TypeScript is a natural progression',
        metadata: { skill: 'TypeScript', difficulty: 'Intermediate', duration: '2 weeks' }
      });
    }

    if (currentUser.offeredSkills.some(skill => skill.name === 'React')) {
      newRecommendations.push({
        id: '2',
        type: 'skill',
        title: 'Learn Next.js',
        description: 'Build full-stack React applications',
        confidence: 0.88,
        reason: 'Perfect complement to your React expertise',
        metadata: { skill: 'Next.js', difficulty: 'Intermediate', duration: '3 weeks' }
      });
    }

    // User recommendations based on complementary skills
    const compatibleUsers = users.filter(user => 
      user.id !== currentUser.id && 
      user.offeredSkills.some(userSkill => 
        currentUser.wantedSkills.some(wantedSkill => wantedSkill.name === userSkill.name)
      )
    );

    if (compatibleUsers.length > 0) {
      const topUser = compatibleUsers[0];
      newRecommendations.push({
        id: '3',
        type: 'user',
        title: `Connect with ${topUser.name}`,
        description: `They can teach you ${topUser.offeredSkills.find(userSkill => 
          currentUser.wantedSkills.some(wantedSkill => wantedSkill.name === userSkill.name)
        )?.name}`,
        confidence: 0.92,
        reason: 'High skill match based on your learning goals',
        metadata: { 
          user: { 
            name: topUser.name, 
            rating: topUser.rating, 
            avatar: topUser.avatar 
          } 
        }
      });
    }

    // Course recommendations
    newRecommendations.push({
      id: '4',
      type: 'course',
      title: 'Advanced React Patterns',
      description: 'Master complex React patterns and state management',
      confidence: 0.85,
      reason: 'Based on your current React skill level',
      metadata: { difficulty: 'Advanced', duration: '4 weeks' }
    });

    // Challenge recommendations
    newRecommendations.push({
      id: '5',
      type: 'challenge',
      title: 'Full-Stack Developer Challenge',
      description: 'Build a complete application with React and Node.js',
      confidence: 0.78,
      reason: 'Combines your existing skills with new learning opportunities',
      metadata: { difficulty: 'Intermediate', duration: '2 weeks', participants: 25 }
    });

    setRecommendations(newRecommendations);
    setIsLoading(false);
    
    toast({
      title: "Recommendations Updated",
      description: "Fresh AI-powered recommendations generated based on your profile."
    });
  };

  useEffect(() => {
    generateRecommendations();
  }, [currentUser]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'skill': return <BookOpen className="h-4 w-4" />;
      case 'user': return <Users className="h-4 w-4" />;
      case 'course': return <TrendingUp className="h-4 w-4" />;
      case 'challenge': return <Target className="h-4 w-4" />;
      default: return <Sparkles className="h-4 w-4" />;
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'skill': return 'bg-blue-100 text-blue-800';
      case 'user': return 'bg-green-100 text-green-800';
      case 'course': return 'bg-purple-100 text-purple-800';
      case 'challenge': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getConfidenceColor = (confidence: number) => {
    if (confidence >= 0.9) return 'text-green-600';
    if (confidence >= 0.8) return 'text-blue-600';
    if (confidence >= 0.7) return 'text-yellow-600';
    return 'text-gray-600';
  };

  if (!currentUser) {
    return (
      <Card>
        <CardContent className="flex flex-col items-center justify-center py-12">
          <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
          <h3 className="text-lg font-medium mb-2">AI Recommendations</h3>
          <p className="text-muted-foreground text-center">
            Please log in to get personalized AI-powered learning recommendations.
          </p>
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2">
            <Sparkles className="h-6 w-6 text-primary" />
            AI Recommendations
          </h2>
          <p className="text-muted-foreground">Personalized suggestions to accelerate your learning</p>
        </div>
        
        <Button 
          onClick={generateRecommendations} 
          disabled={isLoading}
          variant="outline"
          size="sm"
        >
          <RefreshCw className={`h-4 w-4 mr-2 ${isLoading ? 'animate-spin' : ''}`} />
          Refresh
        </Button>
      </div>

      {isLoading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {[1, 2, 3, 4].map((i) => (
            <Card key={i} className="animate-pulse">
              <CardHeader>
                <div className="h-4 bg-muted rounded w-3/4"></div>
                <div className="h-3 bg-muted rounded w-full"></div>
              </CardHeader>
              <CardContent>
                <div className="h-3 bg-muted rounded w-1/2 mb-2"></div>
                <div className="h-8 bg-muted rounded w-20"></div>
              </CardContent>
            </Card>
          ))}
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {recommendations.map((recommendation) => (
            <Card key={recommendation.id} className="relative">
              <CardHeader>
                <div className="flex justify-between items-start">
                  <div className="space-y-1">
                    <CardTitle className="text-lg flex items-center gap-2">
                      {getTypeIcon(recommendation.type)}
                      {recommendation.title}
                    </CardTitle>
                    <CardDescription>{recommendation.description}</CardDescription>
                  </div>
                  <Badge className={getTypeColor(recommendation.type)}>
                    {recommendation.type}
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">AI Confidence</span>
                    <span className={`text-sm font-semibold ${getConfidenceColor(recommendation.confidence)}`}>
                      {Math.round(recommendation.confidence * 100)}%
                    </span>
                  </div>
                  <div className="text-xs text-muted-foreground">
                    {recommendation.reason}
                  </div>
                </div>

                {recommendation.metadata && (
                  <div className="flex flex-wrap gap-2">
                    {recommendation.metadata.difficulty && (
                      <Badge variant="outline" className="text-xs">
                        {recommendation.metadata.difficulty}
                      </Badge>
                    )}
                    {recommendation.metadata.duration && (
                      <Badge variant="outline" className="text-xs">
                        {recommendation.metadata.duration}
                      </Badge>
                    )}
                    {recommendation.metadata.participants && (
                      <Badge variant="outline" className="text-xs">
                        {recommendation.metadata.participants} participants
                      </Badge>
                    )}
                  </div>
                )}

                <div className="flex justify-end">
                  <Button size="sm">
                    {recommendation.type === 'user' ? 'Connect' : 
                     recommendation.type === 'skill' ? 'Learn' : 
                     recommendation.type === 'course' ? 'Enroll' : 'Join'}
                  </Button>
                </div>
              </CardContent>
              
              <div className="absolute top-2 right-2">
                <div className={`w-2 h-2 rounded-full ${getConfidenceColor(recommendation.confidence).replace('text-', 'bg-')}`}></div>
              </div>
            </Card>
          ))}
        </div>
      )}

      {recommendations.length === 0 && !isLoading && (
        <Card>
          <CardContent className="flex flex-col items-center justify-center py-12">
            <Sparkles className="h-12 w-12 text-muted-foreground mb-4" />
            <h3 className="text-lg font-medium mb-2">No Recommendations Yet</h3>
            <p className="text-muted-foreground text-center">
              Add more skills to your profile to get personalized AI recommendations.
            </p>
            <Button className="mt-4" onClick={generateRecommendations}>
              Generate Recommendations
            </Button>
          </CardContent>
        </Card>
      )}

      <div className="text-xs text-muted-foreground">
        <p>* Recommendations are generated using AI analysis of your profile, skills, and community activity. 
        Results may vary and should be considered as suggestions to enhance your learning journey.</p>
      </div>
    </div>
  );
};