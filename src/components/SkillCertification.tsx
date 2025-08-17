import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Award, Clock, CheckCircle, Star, BookOpen, Target } from 'lucide-react';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';

interface CertificationPath {
  id: string;
  title: string;
  description: string;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  estimatedHours: number;
  prerequisites: string[];
  skills: string[];
  modules: Module[];
  progress?: number;
  isStarted?: boolean;
  isCompleted?: boolean;
  certificateId?: string;
}

interface Module {
  id: string;
  title: string;
  description: string;
  type: 'theory' | 'practical' | 'assessment';
  duration: number;
  isCompleted?: boolean;
  score?: number;
}

const mockCertificationPaths: CertificationPath[] = [
  {
    id: '1',
    title: 'Frontend Developer Certification',
    description: 'Master modern frontend development with React, TypeScript, and best practices',
    level: 'Intermediate',
    estimatedHours: 40,
    prerequisites: ['Basic JavaScript', 'HTML/CSS'],
    skills: ['React', 'TypeScript', 'CSS', 'JavaScript'],
    modules: [
      {
        id: '1-1',
        title: 'React Fundamentals',
        description: 'Components, props, state, and lifecycle',
        type: 'theory',
        duration: 8
      },
      {
        id: '1-2',
        title: 'TypeScript Basics',
        description: 'Type safety and modern JavaScript',
        type: 'theory',
        duration: 6
      },
      {
        id: '1-3',
        title: 'Build a Todo App',
        description: 'Hands-on project implementation',
        type: 'practical',
        duration: 12
      },
      {
        id: '1-4',
        title: 'Final Assessment',
        description: 'Comprehensive skills evaluation',
        type: 'assessment',
        duration: 4
      }
    ]
  },
  {
    id: '2',
    title: 'UI/UX Design Professional',
    description: 'Complete design thinking and user experience certification',
    level: 'Advanced',
    estimatedHours: 60,
    prerequisites: ['Design Basics', 'Figma Knowledge'],
    skills: ['UI/UX Design', 'Figma', 'User Research', 'Prototyping'],
    modules: [
      {
        id: '2-1',
        title: 'Design Thinking Process',
        description: 'User-centered design methodology',
        type: 'theory',
        duration: 10,
        isCompleted: true,
        score: 92
      },
      {
        id: '2-2',
        title: 'User Research Methods',
        description: 'Interviews, surveys, and usability testing',
        type: 'theory',
        duration: 12,
        isCompleted: true,
        score: 88
      },
      {
        id: '2-3',
        title: 'Design System Creation',
        description: 'Build a comprehensive design system',
        type: 'practical',
        duration: 20
      },
      {
        id: '2-4',
        title: 'Portfolio Review',
        description: 'Present and defend your design decisions',
        type: 'assessment',
        duration: 8
      }
    ],
    isStarted: true,
    progress: 55
  },
  {
    id: '3',
    title: 'Data Science Fundamentals',
    description: 'Introduction to data analysis, visualization, and machine learning',
    level: 'Beginner',
    estimatedHours: 50,
    prerequisites: ['Basic Mathematics', 'Python Basics'],
    skills: ['Python', 'Data Analysis', 'Machine Learning', 'Statistics'],
    modules: [
      {
        id: '3-1',
        title: 'Python for Data Science',
        description: 'Pandas, NumPy, and data manipulation',
        type: 'theory',
        duration: 15
      },
      {
        id: '3-2',
        title: 'Data Visualization',
        description: 'Matplotlib, Seaborn, and storytelling with data',
        type: 'theory',
        duration: 12
      },
      {
        id: '3-3',
        title: 'Statistical Analysis Project',
        description: 'Real-world data analysis case study',
        type: 'practical',
        duration: 18
      },
      {
        id: '3-4',
        title: 'Machine Learning Basics',
        description: 'Introduction to ML algorithms and applications',
        type: 'assessment',
        duration: 5
      }
    ]
  }
];

export const SkillCertification: React.FC = () => {
  const [certifications, setCertifications] = useState<CertificationPath[]>(mockCertificationPaths);
  const [selectedCertification, setSelectedCertification] = useState<CertificationPath | null>(null);
  const { currentUser } = useUser();
  const { toast } = useToast();

  const startCertification = (certificationId: string) => {
    if (!currentUser) {
      toast({
        title: "Login Required",
        description: "Please log in to start certification paths.",
        variant: "destructive"
      });
      return;
    }

    setCertifications(prev => prev.map(cert => 
      cert.id === certificationId 
        ? { ...cert, isStarted: true, progress: 0 }
        : cert
    ));

    toast({
      title: "Certification Started!",
      description: "You've enrolled in the certification path. Good luck with your learning journey!"
    });
  };

  const getLevelColor = (level: string) => {
    switch (level) {
      case 'Beginner': return 'bg-green-100 text-green-800';
      case 'Intermediate': return 'bg-blue-100 text-blue-800';
      case 'Advanced': return 'bg-purple-100 text-purple-800';
      case 'Expert': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getModuleIcon = (type: string) => {
    switch (type) {
      case 'theory': return <BookOpen className="h-4 w-4" />;
      case 'practical': return <Target className="h-4 w-4" />;
      case 'assessment': return <Star className="h-4 w-4" />;
      default: return <BookOpen className="h-4 w-4" />;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold">Skill Certification</h2>
        <p className="text-muted-foreground">Earn industry-recognized certificates and advance your career</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {certifications.map((certification) => (
          <Card key={certification.id} className="relative">
            <CardHeader>
              <div className="flex justify-between items-start">
                <div className="space-y-1">
                  <CardTitle className="text-lg">{certification.title}</CardTitle>
                  <CardDescription>{certification.description}</CardDescription>
                </div>
                <Badge className={getLevelColor(certification.level)}>
                  {certification.level}
                </Badge>
              </div>
            </CardHeader>
            
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {certification.skills.map((skill) => (
                  <Badge key={skill} variant="secondary" className="text-xs">
                    {skill}
                  </Badge>
                ))}
              </div>

              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <Clock className="h-4 w-4 text-muted-foreground" />
                  <span>{certification.estimatedHours} hours</span>
                </div>
                <div className="flex items-center gap-2">
                  <BookOpen className="h-4 w-4 text-muted-foreground" />
                  <span>{certification.modules.length} modules</span>
                </div>
              </div>

              {certification.prerequisites.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-medium">Prerequisites:</h4>
                  <div className="flex flex-wrap gap-1">
                    {certification.prerequisites.map((prereq) => (
                      <Badge key={prereq} variant="outline" className="text-xs">
                        {prereq}
                      </Badge>
                    ))}
                  </div>
                </div>
              )}

              {certification.isStarted && typeof certification.progress === 'number' && (
                <div className="space-y-2">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Progress</span>
                    <span className="text-sm text-muted-foreground">{certification.progress}%</span>
                  </div>
                  <Progress value={certification.progress} className="h-2" />
                </div>
              )}

              <div className="flex justify-between items-center pt-2">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button 
                      variant="outline" 
                      size="sm"
                      onClick={() => setSelectedCertification(certification)}
                    >
                      View Details
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="max-w-2xl">
                    <DialogHeader>
                      <DialogTitle>{certification.title}</DialogTitle>
                    </DialogHeader>
                    <div className="space-y-4">
                      <p className="text-muted-foreground">{certification.description}</p>
                      
                      <div className="space-y-3">
                        <h4 className="font-medium">Curriculum ({certification.modules.length} modules)</h4>
                        {certification.modules.map((module, index) => (
                          <div key={module.id} className="flex items-center gap-3 p-3 border rounded-lg">
                            <div className="flex items-center gap-2">
                              {getModuleIcon(module.type)}
                              <span className="text-sm font-medium">Module {index + 1}</span>
                            </div>
                            <div className="flex-1">
                              <h5 className="font-medium">{module.title}</h5>
                              <p className="text-sm text-muted-foreground">{module.description}</p>
                              <div className="flex items-center gap-4 mt-1">
                                <span className="text-xs text-muted-foreground">{module.duration}h</span>
                                {module.isCompleted && (
                                  <div className="flex items-center gap-1">
                                    <CheckCircle className="h-3 w-3 text-green-600" />
                                    <span className="text-xs text-green-600">
                                      Completed {module.score && `(${module.score}%)`}
                                    </span>
                                  </div>
                                )}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </DialogContent>
                </Dialog>
                
                {certification.isStarted ? (
                  <div className="flex items-center gap-2 text-blue-600">
                    <CheckCircle className="h-4 w-4" />
                    <span className="text-sm font-medium">In Progress</span>
                  </div>
                ) : (
                  <Button 
                    onClick={() => startCertification(certification.id)}
                    size="sm"
                  >
                    <Award className="h-4 w-4 mr-2" />
                    Start Path
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};