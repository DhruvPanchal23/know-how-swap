import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Plus,
  Edit,
  Trash2,
  Tag,
  TrendingUp,
  Users,
  Star,
  Search,
  Filter
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface Skill {
  id: string;
  name: string;
  category: string;
  description: string;
  popularity: number;
  userCount: number;
  averageRating: number;
  isActive: boolean;
}

const mockSkills: Skill[] = [
  {
    id: "1",
    name: "React Development",
    category: "Frontend",
    description: "Modern React development with hooks and context",
    popularity: 95,
    userCount: 234,
    averageRating: 4.8,
    isActive: true
  },
  {
    id: "2",
    name: "UI/UX Design",
    category: "Design",
    description: "User interface and experience design",
    popularity: 87,
    userCount: 156,
    averageRating: 4.6,
    isActive: true
  },
  {
    id: "3",
    name: "Python Programming",
    category: "Backend",
    description: "Python development and automation",
    popularity: 92,
    userCount: 198,
    averageRating: 4.7,
    isActive: true
  },
  {
    id: "4",
    name: "Digital Marketing",
    category: "Marketing",
    description: "Online marketing strategies and tools",
    popularity: 78,
    userCount: 89,
    averageRating: 4.3,
    isActive: false
  }
];

const categories = ["All", "Frontend", "Backend", "Design", "Marketing", "Data Science", "Mobile"];

export const AdminSkillManager = () => {
  const [skills, setSkills] = useState<Skill[]>(mockSkills);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [isAddingSkill, setIsAddingSkill] = useState(false);
  const [editingSkill, setEditingSkill] = useState<Skill | null>(null);
  const { toast } = useToast();

  const [newSkill, setNewSkill] = useState({
    name: "",
    category: "",
    description: ""
  });

  const filteredSkills = skills.filter(skill => {
    const matchesCategory = selectedCategory === "All" || skill.category === selectedCategory;
    const matchesSearch = skill.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         skill.description.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddSkill = () => {
    if (!newSkill.name || !newSkill.category) {
      toast({
        title: "Error",
        description: "Please fill in all required fields.",
        variant: "destructive"
      });
      return;
    }

    const skill: Skill = {
      id: Date.now().toString(),
      name: newSkill.name,
      category: newSkill.category,
      description: newSkill.description,
      popularity: 0,
      userCount: 0,
      averageRating: 0,
      isActive: true
    };

    setSkills([...skills, skill]);
    setNewSkill({ name: "", category: "", description: "" });
    setIsAddingSkill(false);
    
    toast({
      title: "Skill Added",
      description: `${skill.name} has been added to the platform.`
    });
  };

  const handleEditSkill = (skill: Skill) => {
    setEditingSkill(skill);
  };

  const handleUpdateSkill = () => {
    if (!editingSkill) return;

    setSkills(skills.map(skill => 
      skill.id === editingSkill.id ? editingSkill : skill
    ));
    setEditingSkill(null);
    
    toast({
      title: "Skill Updated",
      description: `${editingSkill.name} has been updated.`
    });
  };

  const handleDeleteSkill = (skillId: string) => {
    const skill = skills.find(s => s.id === skillId);
    setSkills(skills.filter(s => s.id !== skillId));
    
    toast({
      title: "Skill Deleted",
      description: `${skill?.name} has been removed from the platform.`,
      variant: "destructive"
    });
  };

  const toggleSkillStatus = (skillId: string) => {
    setSkills(skills.map(skill =>
      skill.id === skillId ? { ...skill, isActive: !skill.isActive } : skill
    ));
    
    const skill = skills.find(s => s.id === skillId);
    toast({
      title: `Skill ${skill?.isActive ? 'Disabled' : 'Enabled'}`,
      description: `${skill?.name} is now ${skill?.isActive ? 'disabled' : 'enabled'}.`
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Skill Management</h2>
          <p className="text-muted-foreground">Manage platform skills and categories</p>
        </div>
        <Dialog open={isAddingSkill} onOpenChange={setIsAddingSkill}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="h-4 w-4 mr-2" />
              Add New Skill
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Add New Skill</DialogTitle>
              <DialogDescription>
                Create a new skill category for the platform
              </DialogDescription>
            </DialogHeader>
            <div className="space-y-4">
              <div>
                <Label htmlFor="skill-name">Skill Name *</Label>
                <Input
                  id="skill-name"
                  value={newSkill.name}
                  onChange={(e) => setNewSkill({ ...newSkill, name: e.target.value })}
                  placeholder="e.g., React Development"
                />
              </div>
              <div>
                <Label htmlFor="skill-category">Category *</Label>
                <Select
                  value={newSkill.category}
                  onValueChange={(value) => setNewSkill({ ...newSkill, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== "All").map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="skill-description">Description</Label>
                <Textarea
                  id="skill-description"
                  value={newSkill.description}
                  onChange={(e) => setNewSkill({ ...newSkill, description: e.target.value })}
                  placeholder="Brief description of the skill"
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleAddSkill} className="flex-1">
                  Add Skill
                </Button>
                <Button variant="outline" onClick={() => setIsAddingSkill(false)}>
                  Cancel
                </Button>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Skills</p>
                <p className="text-2xl font-bold">{skills.length}</p>
              </div>
              <Tag className="h-8 w-8 text-primary" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Active Skills</p>
                <p className="text-2xl font-bold">{skills.filter(s => s.isActive).length}</p>
              </div>
              <TrendingUp className="h-8 w-8 text-success" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Categories</p>
                <p className="text-2xl font-bold">{categories.length - 1}</p>
              </div>
              <Filter className="h-8 w-8 text-accent" />
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-2xl font-bold">{skills.reduce((sum, skill) => sum + skill.userCount, 0)}</p>
              </div>
              <Users className="h-8 w-8 text-warning" />
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Filters */}
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <Search className="h-4 w-4" />
          <Input
            placeholder="Search skills..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-64"
          />
        </div>
        <Select value={selectedCategory} onValueChange={setSelectedCategory}>
          <SelectTrigger className="w-40">
            <SelectValue />
          </SelectTrigger>
          <SelectContent>
            {categories.map((category) => (
              <SelectItem key={category} value={category}>
                {category}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Skills Table */}
      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Skill</TableHead>
                <TableHead>Category</TableHead>
                <TableHead>Users</TableHead>
                <TableHead>Popularity</TableHead>
                <TableHead>Rating</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {filteredSkills.map((skill) => (
                <TableRow key={skill.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{skill.name}</p>
                      <p className="text-sm text-muted-foreground truncate max-w-xs">
                        {skill.description}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant="outline">{skill.category}</Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Users className="h-4 w-4" />
                      <span>{skill.userCount}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="w-16 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${skill.popularity}%` }}
                        />
                      </div>
                      <span className="text-sm">{skill.popularity}%</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-current text-yellow-400" />
                      <span>{skill.averageRating.toFixed(1)}</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <Badge variant={skill.isActive ? "default" : "secondary"}>
                      {skill.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <div className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => handleEditSkill(skill)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm"
                        onClick={() => toggleSkillStatus(skill.id)}
                      >
                        {skill.isActive ? "Disable" : "Enable"}
                      </Button>
                      <Button 
                        variant="destructive" 
                        size="sm"
                        onClick={() => handleDeleteSkill(skill.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* Edit Skill Dialog */}
      <Dialog open={!!editingSkill} onOpenChange={(open) => !open && setEditingSkill(null)}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Skill</DialogTitle>
            <DialogDescription>
              Update skill information and settings
            </DialogDescription>
          </DialogHeader>
          {editingSkill && (
            <div className="space-y-4">
              <div>
                <Label htmlFor="edit-skill-name">Skill Name</Label>
                <Input
                  id="edit-skill-name"
                  value={editingSkill.name}
                  onChange={(e) => setEditingSkill({ ...editingSkill, name: e.target.value })}
                />
              </div>
              <div>
                <Label htmlFor="edit-skill-category">Category</Label>
                <Select
                  value={editingSkill.category}
                  onValueChange={(value) => setEditingSkill({ ...editingSkill, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {categories.filter(cat => cat !== "All").map((category) => (
                      <SelectItem key={category} value={category}>
                        {category}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="edit-skill-description">Description</Label>
                <Textarea
                  id="edit-skill-description"
                  value={editingSkill.description}
                  onChange={(e) => setEditingSkill({ ...editingSkill, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="flex gap-2">
                <Button onClick={handleUpdateSkill} className="flex-1">
                  Update Skill
                </Button>
                <Button variant="outline" onClick={() => setEditingSkill(null)}>
                  Cancel
                </Button>
              </div>
            </div>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};