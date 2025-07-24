import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { MapPin, Clock, Star } from "lucide-react";

interface SkillCardProps {
  user: {
    id: string;
    name: string;
    location: string;
    avatar: string;
    rating: number;
    reviewCount: number;
    offeredSkills: string[];
    wantedSkills: string[];
    availability: string;
  };
}

export const SkillCard = ({ user }: SkillCardProps) => {
  return (
    <Card className="h-full hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-6">
        <div className="flex items-start gap-4">
          <img
            src={user.avatar}
            alt={user.name}
            className="w-16 h-16 rounded-full object-cover"
          />
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-lg truncate">{user.name}</h3>
            <div className="flex items-center gap-1 text-sm text-muted-foreground mb-2">
              <MapPin className="w-4 h-4" />
              <span>{user.location}</span>
            </div>
            <div className="flex items-center gap-1 mb-3">
              <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
              <span className="font-medium">{user.rating}</span>
              <span className="text-sm text-muted-foreground">
                ({user.reviewCount} reviews)
              </span>
            </div>
          </div>
        </div>

        <div className="space-y-4">
          <div>
            <h4 className="font-medium text-sm mb-2">Offers</h4>
            <div className="flex flex-wrap gap-1">
              {user.offeredSkills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="bg-skill-badge text-skill-badge-foreground text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div>
            <h4 className="font-medium text-sm mb-2">Wants to Learn</h4>
            <div className="flex flex-wrap gap-1">
              {user.wantedSkills.map((skill, index) => (
                <Badge
                  key={index}
                  variant="outline"
                  className="text-xs"
                >
                  {skill}
                </Badge>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Clock className="w-4 h-4" />
            <span>{user.availability}</span>
          </div>

          <Button className="w-full" size="sm" asChild>
            <a href={`/profile/${user.id}`}>View Profile</a>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};