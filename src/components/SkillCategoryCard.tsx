import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { LucideIcon } from "lucide-react";

interface SkillCategoryCardProps {
  category: {
    name: string;
    icon: LucideIcon;
    description: string;
    skillCount: number;
    color: string;
  };
}

export const SkillCategoryCard = ({ category }: SkillCategoryCardProps) => {
  const Icon = category.icon;

  return (
    <Card className="group hover:shadow-lg transition-all duration-300 cursor-pointer border-2 hover:border-primary/20">
      <CardContent className="p-6 text-center">
        <div className={`w-16 h-16 mx-auto mb-4 rounded-full ${category.color} flex items-center justify-center group-hover:scale-110 transition-transform duration-300`}>
          <Icon className="w-8 h-8 text-white" />
        </div>
        <h3 className="font-semibold text-lg mb-2">{category.name}</h3>
        <p className="text-sm text-muted-foreground mb-4 h-12">
          {category.description}
        </p>
        <Badge variant="secondary" className="bg-skill-badge text-skill-badge-foreground">
          {category.skillCount} skills available
        </Badge>
      </CardContent>
    </Card>
  );
};