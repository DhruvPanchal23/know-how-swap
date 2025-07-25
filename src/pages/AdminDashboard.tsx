import { useState } from "react";
import { useUser } from "@/contexts/UserContext";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useToast } from "@/hooks/use-toast";
import { 
  Users, 
  ArrowUpDown, 
  Ban, 
  CheckCircle, 
  XCircle, 
  Download,
  MessageSquare,
  BarChart3,
  Shield,
  AlertTriangle,
  TrendingUp
} from "lucide-react";

export const AdminDashboard = () => {
  const { users, swapRequests, currentUser } = useUser();
  const { toast } = useToast();
  const [announcement, setAnnouncement] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);

  // Check if current user is admin
  const isAdmin = currentUser?.email === "admin@skillswap.com";

  if (!isAdmin) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-background to-destructive/5 flex items-center justify-center p-4">
        <Card className="max-w-md text-center">
          <CardContent className="pt-6">
            <Shield className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Access Denied</h2>
            <p className="text-muted-foreground">You don't have permission to access this page.</p>
          </CardContent>
        </Card>
      </div>
    );
  }

  const handleBanUser = (userId: string) => {
    toast({
      title: "User Banned",
      description: "User has been banned from the platform.",
      variant: "destructive"
    });
  };

  const handleSendAnnouncement = () => {
    if (!announcement.trim()) return;
    
    toast({
      title: "Announcement Sent",
      description: "Platform-wide announcement has been sent to all users.",
    });
    setAnnouncement("");
  };

  const downloadReport = (type: string) => {
    toast({
      title: "Report Generated",
      description: `${type} report has been downloaded.`,
    });
  };

  const stats = {
    totalUsers: users.length,
    activeSwaps: swapRequests.filter(r => r.status === 'accepted').length,
    pendingRequests: swapRequests.filter(r => r.status === 'pending').length,
    completedSwaps: swapRequests.filter(r => r.status === 'completed').length,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Admin Dashboard
          </h1>
          <p className="text-muted-foreground mt-2">
            Manage users, monitor swaps, and oversee platform operations
          </p>
        </div>

        {/* Stats Overview */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                  <p className="text-2xl font-bold">{stats.totalUsers}</p>
                </div>
                <Users className="h-8 w-8 text-primary" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Active Swaps</p>
                  <p className="text-2xl font-bold">{stats.activeSwaps}</p>
                </div>
                <ArrowUpDown className="h-8 w-8 text-accent" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
                  <p className="text-2xl font-bold">{stats.pendingRequests}</p>
                </div>
                <AlertTriangle className="h-8 w-8 text-warning" />
              </div>
            </CardContent>
          </Card>

          <Card className="border-2">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm font-medium text-muted-foreground">Completed</p>
                  <p className="text-2xl font-bold">{stats.completedSwaps}</p>
                </div>
                <TrendingUp className="h-8 w-8 text-success" />
              </div>
            </CardContent>
          </Card>
        </div>

        <Tabs defaultValue="users" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="users">User Management</TabsTrigger>
            <TabsTrigger value="swaps">Swap Monitoring</TabsTrigger>
            <TabsTrigger value="announcements">Announcements</TabsTrigger>
            <TabsTrigger value="reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="users" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>User Management</CardTitle>
                <CardDescription>
                  Monitor and moderate platform users
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {users.map((user) => (
                    <div key={user.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <img 
                          src={user.avatar} 
                          alt={user.name}
                          className="w-12 h-12 rounded-full object-cover"
                        />
                        <div>
                          <h4 className="font-medium">{user.name}</h4>
                          <p className="text-sm text-muted-foreground">{user.email}</p>
                          <div className="flex gap-2 mt-1">
                            <Badge variant="secondary">
                              {user.offeredSkills.length} skills offered
                            </Badge>
                            <Badge variant="outline">
                              Rating: {user.rating}
                            </Badge>
                          </div>
                        </div>
                      </div>
                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setSelectedUser(user.id)}
                        >
                          View Profile
                        </Button>
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleBanUser(user.id)}
                        >
                          <Ban className="h-4 w-4 mr-1" />
                          Ban
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="swaps" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Swap Monitoring</CardTitle>
                <CardDescription>
                  Track all skill swap requests and their status
                </CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {swapRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div className="flex items-center gap-4">
                        <div className="flex gap-2">
                          <img 
                            src={request.fromUser.avatar} 
                            alt={request.fromUser.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                          <ArrowUpDown className="h-4 w-4 self-center text-muted-foreground" />
                          <img 
                            src={request.toUser.avatar} 
                            alt={request.toUser.name}
                            className="w-8 h-8 rounded-full object-cover"
                          />
                        </div>
                        <div>
                          <p className="font-medium">
                            {request.fromUser.name} → {request.toUser.name}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {request.offeredSkill.name} for {request.requestedSkill.name}
                          </p>
                        </div>
                      </div>
                      <div className="flex items-center gap-3">
                        <Badge 
                          variant={
                            request.status === 'pending' ? 'default' :
                            request.status === 'accepted' ? 'secondary' :
                            request.status === 'completed' ? 'default' : 'destructive'
                          }
                        >
                          {request.status}
                        </Badge>
                        <Button variant="outline" size="sm">
                          View Details
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="announcements" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle>Platform Announcements</CardTitle>
                <CardDescription>
                  Send important updates to all platform users
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label htmlFor="announcement">Announcement Message</Label>
                  <Textarea
                    id="announcement"
                    placeholder="Enter your platform-wide announcement..."
                    value={announcement}
                    onChange={(e) => setAnnouncement(e.target.value)}
                    rows={4}
                    className="mt-2"
                  />
                </div>
                <Button 
                  onClick={handleSendAnnouncement}
                  disabled={!announcement.trim()}
                  className="w-full"
                >
                  <MessageSquare className="h-4 w-4 mr-2" />
                  Send Announcement
                </Button>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>User Activity Reports</CardTitle>
                  <CardDescription>
                    Download comprehensive user activity data
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    onClick={() => downloadReport('User Activity')}
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    User Signups & Activity
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => downloadReport('Skill Statistics')}
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    Popular Skills Report
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Swap Analytics</CardTitle>
                  <CardDescription>
                    Export swap success rates and trends
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    variant="outline" 
                    onClick={() => downloadReport('Swap Statistics')}
                    className="w-full justify-start"
                  >
                    <BarChart3 className="h-4 w-4 mr-2" />
                    Swap Success Rates
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={() => downloadReport('Feedback Logs')}
                    className="w-full justify-start"
                  >
                    <Download className="h-4 w-4 mr-2" />
                    User Feedback Logs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};