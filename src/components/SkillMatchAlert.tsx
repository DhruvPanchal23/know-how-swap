import { useState, useEffect } from "react";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, X, User } from "lucide-react";

interface SkillMatch {
  id: string;
  newUser: any;
  matchingSkill: string;
  timestamp: Date;
}

export const SkillMatchAlert = () => {
  const { currentUser, users } = useUser();
  const [matches, setMatches] = useState<SkillMatch[]>([]);
  const [dismissed, setDismissed] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (!currentUser) return;

    // Simulate finding new matches when users join
    const wantedSkillNames = currentUser.wantedSkills.map(s => s.name.toLowerCase());
    
    const newMatches = users
      .filter(user => user.id !== currentUser.id)
      .filter(user => {
        return user.offeredSkills.some(skill => 
          wantedSkillNames.includes(skill.name.toLowerCase())
        );
      })
      .slice(0, 3) // Limit to 3 notifications
      .map(user => {
        const matchingSkill = user.offeredSkills.find(skill => 
          wantedSkillNames.includes(skill.name.toLowerCase())
        );
        
        return {
          id: `match-${user.id}-${matchingSkill?.id}`,
          newUser: user,
          matchingSkill: matchingSkill?.name || '',
          timestamp: new Date(Date.now() - Math.random() * 86400000) // Random time in last 24h
        };
      });

    setMatches(newMatches);
  }, [currentUser, users]);

  const dismissMatch = (matchId: string) => {
    setDismissed(prev => new Set([...prev, matchId]));
  };

  const visibleMatches = matches.filter(match => !dismissed.has(match.id));

  if (!currentUser || visibleMatches.length === 0) return null;

  return (
    <div className="fixed top-4 right-4 z-50 space-y-2 max-w-sm">
      {visibleMatches.map((match) => (
        <Card key={match.id} className="border-2 border-accent bg-accent/5 shadow-lg animate-in slide-in-from-right">
          <CardContent className="p-4">
            <div className="flex items-start gap-3">
              <div className="flex-shrink-0">
                <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center">
                  <Bell className="h-4 w-4 text-accent" />
                </div>
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 mb-2">
                  <img 
                    src={match.newUser.avatar} 
                    alt={match.newUser.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                  <p className="text-sm font-medium truncate">
                    {match.newUser.name}
                  </p>
                </div>
                
                <p className="text-xs text-muted-foreground mb-2">
                  New match found! They offer:
                </p>
                
                <Badge variant="secondary" className="text-xs mb-2">
                  {match.matchingSkill}
                </Badge>
                
                <div className="flex gap-2">
                  <Button 
                    size="sm" 
                    variant="outline" 
                    className="h-7 text-xs"
                    onClick={() => {
                      // Navigate to user profile
                      window.location.href = `/profile/${match.newUser.id}`;
                    }}
                  >
                    <User className="h-3 w-3 mr-1" />
                    View Profile
                  </Button>
                </div>
              </div>
              
              <Button
                variant="ghost"
                size="sm"
                className="h-6 w-6 p-0"
                onClick={() => dismissMatch(match.id)}
              >
                <X className="h-3 w-3" />
              </Button>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};