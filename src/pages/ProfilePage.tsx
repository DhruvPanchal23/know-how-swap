import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Star, MapPin, Calendar, Edit, MessageSquare } from "lucide-react";
import { SwapRequestDialog } from "@/components/SwapRequestDialog";
import { ProgressTracker } from "@/components/ProgressTracker";

interface ProfilePageProps {
  userId: string;
}

export const ProfilePage = ({ userId }: ProfilePageProps) => {
  const { getUserById, currentUser } = useUser();
  const [showSwapDialog, setShowSwapDialog] = useState(false);
  
  const user = getUserById(userId);
  const isOwnProfile = currentUser?.id === userId;

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card>
          <CardContent className="p-8 text-center">
            <h2 className="text-2xl font-bold mb-2">User Not Found</h2>
            <p className="text-muted-foreground">The profile you're looking for doesn't exist.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Profile Info */}
        <div className="lg:col-span-1">
          <Card>
            <CardContent className="p-6">
              <div className="text-center mb-6">
                <Avatar className="w-24 h-24 mx-auto mb-4">
                  <AvatarImage src={user.avatar} alt={user.name} />
                  <AvatarFallback>{user.name[0]}</AvatarFallback>
                </Avatar>
                <h1 className="text-2xl font-bold mb-2">{user.name}</h1>
                <div className="flex items-center justify-center gap-1 text-sm text-muted-foreground mb-2">
                  <MapPin className="w-4 h-4" />
                  <span>{user.location}</span>
                </div>
                <div className="flex items-center justify-center gap-1 mb-4">
                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                  <span className="font-medium">{user.rating}</span>
                  <span className="text-sm text-muted-foreground">
                    ({user.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <p className="text-sm text-muted-foreground mb-6">{user.bio}</p>

              <div className="space-y-4">
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Available: {user.availability}</span>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Calendar className="w-4 h-4 text-muted-foreground" />
                  <span>Joined: {new Date(user.joinedDate).toLocaleDateString()}</span>
                </div>
              </div>

              {!isOwnProfile && currentUser && (
                <div className="space-y-2 mt-6">
                  <Button 
                    className="w-full" 
                    onClick={() => setShowSwapDialog(true)}
                  >
                    <MessageSquare className="w-4 h-4 mr-2" />
                    Request Skill Swap
                  </Button>
                  <Button variant="outline" className="w-full">
                    Send Message
                  </Button>
                </div>
              )}

              {isOwnProfile && (
                <Button className="w-full mt-6" variant="outline">
                  <Edit className="w-4 h-4 mr-2" />
                  Edit Profile
                </Button>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Skills and Details */}
        <div className="lg:col-span-2">
          <Tabs defaultValue="skills" className="w-full">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="skills">Skills</TabsTrigger>
            <TabsTrigger value="progress">Progress</TabsTrigger>
            <TabsTrigger value="reviews">Reviews</TabsTrigger>
            <TabsTrigger value="activity">Activity</TabsTrigger>
          </TabsList>

            <TabsContent value="skills" className="space-y-6">
              {/* Offered Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills I Offer</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {user.offeredSkills.map((skill) => (
                      <Card key={skill.id} className="p-4">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{skill.name}</h4>
                          <Badge variant="secondary">{skill.level}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{skill.category}</p>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Wanted Skills */}
              <Card>
                <CardHeader>
                  <CardTitle className="text-lg">Skills I Want to Learn</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {user.wantedSkills.map((skill) => (
                      <Card key={skill.id} className="p-4 border-dashed">
                        <div className="flex justify-between items-start mb-2">
                          <h4 className="font-medium">{skill.name}</h4>
                          <Badge variant="outline">{skill.level}</Badge>
                        </div>
                        <p className="text-sm text-muted-foreground">{skill.category}</p>
                      </Card>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="progress" className="space-y-6">
              <ProgressTracker />
            </TabsContent>

            <TabsContent value="reviews">
              <Card>
                <CardHeader>
                  <CardTitle>Reviews & Feedback</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {/* Mock reviews */}
                    <div className="border-b pb-4">
                      <div className="flex items-center gap-2 mb-2">
                        <Avatar className="w-8 h-8">
                          <AvatarImage src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=32&h=32&fit=crop&crop=face" />
                          <AvatarFallback>MJ</AvatarFallback>
                        </Avatar>
                        <span className="font-medium">Marcus Johnson</span>
                        <div className="flex">
                          {[1, 2, 3, 4, 5].map((star) => (
                            <Star key={star} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                          ))}
                        </div>
                      </div>
                      <p className="text-sm">"Excellent React teacher! Very patient and explains concepts clearly."</p>
                      <span className="text-xs text-muted-foreground">2 weeks ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="activity">
              <Card>
                <CardHeader>
                  <CardTitle>Recent Activity</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-accent rounded-full"></div>
                      <span className="text-sm">Completed skill swap: React for Guitar lessons</span>
                      <span className="text-xs text-muted-foreground ml-auto">3 days ago</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-2 h-2 bg-primary rounded-full"></div>
                      <span className="text-sm">Started new skill swap with Emma Rodriguez</span>
                      <span className="text-xs text-muted-foreground ml-auto">1 week ago</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {showSwapDialog && (
        <SwapRequestDialog
          targetUser={user}
          isOpen={showSwapDialog}
          onClose={() => setShowSwapDialog(false)}
        />
      )}
    </div>
  );
};