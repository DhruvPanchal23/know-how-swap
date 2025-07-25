import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Trophy, Target, TrendingUp, Star, Award } from "lucide-react";

export const ProgressTracker = () => {
  const { currentUser, swapRequests } = useUser();

  if (!currentUser) return null;

  const userSwaps = swapRequests.filter(
    swap => swap.fromUserId === currentUser.id || swap.toUserId === currentUser.id
  );

  const completedSwaps = userSwaps.filter(swap => swap.status === 'completed').length;
  const pendingSwaps = userSwaps.filter(swap => swap.status === 'pending').length;
  const acceptedSwaps = userSwaps.filter(swap => swap.status === 'accepted').length;

  const skillsLearned = userSwaps
    .filter(swap => swap.status === 'completed' && swap.toUserId === currentUser.id)
    .map(swap => swap.requestedSkill.name);

  const skillsTaught = userSwaps
    .filter(swap => swap.status === 'completed' && swap.fromUserId === currentUser.id)
    .map(swap => swap.offeredSkill.name);

  const badges = [
    { 
      name: "First Swap", 
      icon: Trophy, 
      earned: completedSwaps >= 1,
      description: "Complete your first skill swap"
    },
    { 
      name: "Skill Mentor", 
      icon: Award, 
      earned: skillsTaught.length >= 3,
      description: "Teach 3 different skills"
    },
    { 
      name: "Learning Enthusiast", 
      icon: Target, 
      earned: skillsLearned.length >= 3,
      description: "Learn 3 different skills"
    },
    { 
      name: "Community Builder", 
      icon: TrendingUp, 
      earned: completedSwaps >= 5,
      description: "Complete 5 skill swaps"
    },
    { 
      name: "Top Rated", 
      icon: Star, 
      earned: currentUser.rating >= 4.5 && currentUser.reviewCount >= 5,
      description: "Maintain 4.5+ rating with 5+ reviews"
    }
  ];

  const progressToNextLevel = ((completedSwaps % 5) / 5) * 100;
  const currentLevel = Math.floor(completedSwaps / 5) + 1;

  return (
    <div className="space-y-6">
      {/* Level Progress */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <TrendingUp className="h-5 w-5 text-primary" />
            Skill Level Progress
          </CardTitle>
          <CardDescription>
            Your journey in the SkillSwap community
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-sm font-medium">Level {currentLevel}</span>
              <span className="text-sm text-muted-foreground">
                {completedSwaps % 5}/5 swaps to next level
              </span>
            </div>
            <Progress value={progressToNextLevel} className="h-2" />
          </div>
        </CardContent>
      </Card>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-primary">{completedSwaps}</div>
            <p className="text-sm text-muted-foreground">Completed Swaps</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-accent">{skillsLearned.length}</div>
            <p className="text-sm text-muted-foreground">Skills Learned</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-success">{skillsTaught.length}</div>
            <p className="text-sm text-muted-foreground">Skills Taught</p>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="pt-6">
            <div className="text-2xl font-bold text-warning">{acceptedSwaps + pendingSwaps}</div>
            <p className="text-sm text-muted-foreground">Active Swaps</p>
          </CardContent>
        </Card>
      </div>

      {/* Achievement Badges */}
      <Card>
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-warning" />
            Achievement Badges
          </CardTitle>
          <CardDescription>
            Earn badges by completing milestones
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {badges.map((badge) => {
              const IconComponent = badge.icon;
              return (
                <div 
                  key={badge.name}
                  className={`p-4 rounded-lg border-2 transition-colors ${
                    badge.earned 
                      ? 'bg-primary/10 border-primary' 
                      : 'bg-muted/30 border-muted'
                  }`}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-full ${
                      badge.earned ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground'
                    }`}>
                      <IconComponent className="h-4 w-4" />
                    </div>
                    <div>
                      <h4 className={`font-medium ${badge.earned ? 'text-foreground' : 'text-muted-foreground'}`}>
                        {badge.name}
                      </h4>
                      {badge.earned && (
                        <Badge variant="secondary" className="text-xs mt-1">
                          Earned
                        </Badge>
                      )}
                    </div>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {badge.description}
                  </p>
                </div>
              );
            })}
          </div>
        </CardContent>
      </Card>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Activity</CardTitle>
          <CardDescription>
            Your latest skill exchanges and learning progress
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-3">
            {userSwaps.slice(0, 5).map((swap) => (
              <div key={swap.id} className="flex items-center gap-3 p-3 rounded-lg bg-muted/30">
                <div className="flex gap-2">
                  <img 
                    src={swap.fromUserId === currentUser.id ? swap.toUser.avatar : swap.fromUser.avatar} 
                    alt="User"
                    className="w-8 h-8 rounded-full object-cover"
                  />
                </div>
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {swap.fromUserId === currentUser.id ? 'Teaching' : 'Learning'} {" "}
                    {swap.fromUserId === currentUser.id ? swap.offeredSkill.name : swap.requestedSkill.name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    with {swap.fromUserId === currentUser.id ? swap.toUser.name : swap.fromUser.name}
                  </p>
                </div>
                <Badge 
                  variant={
                    swap.status === 'completed' ? 'default' :
                    swap.status === 'accepted' ? 'secondary' :
                    swap.status === 'pending' ? 'outline' : 'destructive'
                  }
                  className="text-xs"
                >
                  {swap.status}
                </Badge>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};