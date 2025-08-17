import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { VideoCallDialog } from '@/components/VideoCallDialog';
import { ChallengesSection } from '@/components/ChallengesSection';
import { SkillCertification } from '@/components/SkillCertification';
import { AIRecommendations } from '@/components/AIRecommendations';
import { Video, Trophy, Award, Sparkles, ArrowLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const AdvancedFeaturesPage: React.FC = () => {
  const [isVideoCallOpen, setIsVideoCallOpen] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-background">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center gap-4 mb-8">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Button>
          <div>
            <h1 className="text-3xl font-bold">Advanced Features</h1>
            <p className="text-muted-foreground">Explore cutting-edge learning tools and community features</p>
          </div>
        </div>

        <Tabs defaultValue="video-calls" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="video-calls" className="flex items-center gap-2">
              <Video className="h-4 w-4" />
              Video Calls
            </TabsTrigger>
            <TabsTrigger value="challenges" className="flex items-center gap-2">
              <Trophy className="h-4 w-4" />
              Challenges
            </TabsTrigger>
            <TabsTrigger value="certification" className="flex items-center gap-2">
              <Award className="h-4 w-4" />
              Certification
            </TabsTrigger>
            <TabsTrigger value="ai-recommendations" className="flex items-center gap-2">
              <Sparkles className="h-4 w-4" />
              AI Recommendations
            </TabsTrigger>
          </TabsList>

          <TabsContent value="video-calls" className="space-y-6">
            <div className="text-center space-y-4">
              <h2 className="text-2xl font-bold">WebRTC Video Calls</h2>
              <p className="text-muted-foreground max-w-2xl mx-auto">
                Connect face-to-face with your skill swap partners through integrated video calling. 
                Perfect for real-time tutoring, code reviews, and collaborative learning sessions.
              </p>
              <Button 
                onClick={() => setIsVideoCallOpen(true)}
                size="lg"
                className="flex items-center gap-2"
              >
                <Video className="h-5 w-5" />
                Demo Video Call
              </Button>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div className="p-6 border rounded-lg text-center">
                  <Video className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">HD Video Quality</h3>
                  <p className="text-sm text-muted-foreground">Crystal clear video calls with screen sharing capabilities</p>
                </div>
                <div className="p-6 border rounded-lg text-center">
                  <Award className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Session Recording</h3>
                  <p className="text-sm text-muted-foreground">Record important sessions for later review</p>
                </div>
                <div className="p-6 border rounded-lg text-center">
                  <Trophy className="h-8 w-8 mx-auto mb-3 text-primary" />
                  <h3 className="font-semibold mb-2">Interactive Whiteboard</h3>
                  <p className="text-sm text-muted-foreground">Collaborate in real-time with shared digital whiteboard</p>
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="challenges">
            <ChallengesSection />
          </TabsContent>

          <TabsContent value="certification">
            <SkillCertification />
          </TabsContent>

          <TabsContent value="ai-recommendations">
            <AIRecommendations />
          </TabsContent>
        </Tabs>

        <VideoCallDialog
          isOpen={isVideoCallOpen}
          onClose={() => setIsVideoCallOpen(false)}
          recipientName="Sarah Johnson"
          skillName="React Development"
        />
      </div>
    </div>
  );
};