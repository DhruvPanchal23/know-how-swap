import { useState, useEffect } from "react";
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
  TrendingUp,
  Settings,
  Activity,
  UserCheck,
  Flag,
  Globe,
  Database,
  Monitor,
  Star,
  Award,
  Clock,
  Eye,
  Search,
  Filter,
  Calendar,
  Mail,
  Bell
} from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Progress } from "@/components/ui/progress";
import { 
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

interface SystemMetrics {
  activeUsers: number;
  totalSkillSwaps: number;
  serverUptime: string;
  databaseSize: string;
  memoryUsage: number;
  cpuUsage: number;
}

export const AdminDashboard = () => {
  const { users, swapRequests, currentUser } = useUser();
  const { toast } = useToast();
  const [announcement, setAnnouncement] = useState("");
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState("overview");
  const [userFilter, setUserFilter] = useState("all");
  const [systemMetrics, setSystemMetrics] = useState<SystemMetrics>({
    activeUsers: 142,
    totalSkillSwaps: 89,
    serverUptime: "99.9%",
    databaseSize: "2.3 GB",
    memoryUsage: 68,
    cpuUsage: 42
  });

  // Check if current user is admin
  const isAdmin = currentUser?.email === "admin@skillswap.com";

  useEffect(() => {
    // Simulate real-time metrics updates
    const interval = setInterval(() => {
      setSystemMetrics(prev => ({
        ...prev,
        memoryUsage: Math.max(30, Math.min(90, prev.memoryUsage + (Math.random() - 0.5) * 10)),
        cpuUsage: Math.max(20, Math.min(80, prev.cpuUsage + (Math.random() - 0.5) * 15))
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, []);

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

  const handleUnbanUser = (userId: string) => {
    toast({
      title: "User Unbanned",
      description: "User has been restored to the platform.",
    });
  };

  const handlePromoteUser = (userId: string) => {
    toast({
      title: "User Promoted",
      description: "User has been granted moderator privileges.",
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
    bannedUsers: 3,
    reportedContent: 7,
    moderatorActions: 24,
    systemAlerts: 2
  };

  const filteredUsers = users.filter(user => {
    if (userFilter === "all") return true;
    if (userFilter === "active") return user.isOnline;
    if (userFilter === "banned") return false; // Mock banned users
    if (userFilter === "moderators") return user.email?.includes("mod");
    return true;
  });

  const recentActivity = [
    { id: 1, action: "User Registration", user: "John Doe", time: "2 minutes ago", type: "info" },
    { id: 2, action: "Skill Swap Completed", user: "Jane Smith", time: "5 minutes ago", type: "success" },
    { id: 3, action: "Content Reported", user: "Mike Johnson", time: "10 minutes ago", type: "warning" },
    { id: 4, action: "User Banned", user: "Admin", time: "1 hour ago", type: "error" },
    { id: 5, action: "New Skill Added", user: "Sarah Wilson", time: "2 hours ago", type: "info" },
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-background to-primary/5 p-4">
      <div className="max-w-7xl mx-auto">
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-primary bg-clip-text text-transparent">
            Admin Control Center
          </h1>
          <p className="text-muted-foreground mt-2 text-lg">
            Comprehensive platform management and monitoring
          </p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="users">Users</TabsTrigger>
            <TabsTrigger value="swaps">Swaps</TabsTrigger>
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="system">System</TabsTrigger>
            <TabsTrigger value="analytics">Analytics</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>

          {/* Overview Tab */}
          <TabsContent value="overview" className="space-y-6">
            {/* Key Metrics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                      <p className="text-3xl font-bold text-primary">{stats.totalUsers}</p>
                      <p className="text-xs text-muted-foreground mt-1">+12% from last month</p>
                    </div>
                    <Users className="h-10 w-10 text-primary/70" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Active Swaps</p>
                      <p className="text-3xl font-bold text-accent">{stats.activeSwaps}</p>
                      <p className="text-xs text-muted-foreground mt-1">+8% from last week</p>
                    </div>
                    <ArrowUpDown className="h-10 w-10 text-accent/70" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Pending Requests</p>
                      <p className="text-3xl font-bold text-warning">{stats.pendingRequests}</p>
                      <p className="text-xs text-muted-foreground mt-1">-5% from yesterday</p>
                    </div>
                    <Clock className="h-10 w-10 text-warning/70" />
                  </div>
                </CardContent>
              </Card>

              <Card className="border-2 hover:shadow-lg transition-shadow">
                <CardContent className="p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm font-medium text-muted-foreground">Completed</p>
                      <p className="text-3xl font-bold text-success">{stats.completedSwaps}</p>
                      <p className="text-xs text-muted-foreground mt-1">+15% from last month</p>
                    </div>
                    <CheckCircle className="h-10 w-10 text-success/70" />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* System Status & Recent Activity */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Monitor className="h-5 w-5" />
                    System Health
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>CPU Usage</span>
                      <span>{systemMetrics.cpuUsage}%</span>
                    </div>
                    <Progress value={systemMetrics.cpuUsage} className="h-2" />
                  </div>
                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span>Memory Usage</span>
                      <span>{systemMetrics.memoryUsage}%</span>
                    </div>
                    <Progress value={systemMetrics.memoryUsage} className="h-2" />
                  </div>
                  <div className="grid grid-cols-2 gap-4 pt-2">
                    <div className="text-center">
                      <p className="text-2xl font-bold text-success">{systemMetrics.serverUptime}</p>
                      <p className="text-xs text-muted-foreground">Uptime</p>
                    </div>
                    <div className="text-center">
                      <p className="text-2xl font-bold">{systemMetrics.databaseSize}</p>
                      <p className="text-xs text-muted-foreground">DB Size</p>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Activity className="h-5 w-5" />
                    Recent Activity
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {recentActivity.map((activity) => (
                      <div key={activity.id} className="flex items-center gap-3 p-2 rounded-lg hover:bg-muted/50">
                        <div className={`w-2 h-2 rounded-full ${
                          activity.type === 'info' ? 'bg-primary' :
                          activity.type === 'success' ? 'bg-success' :
                          activity.type === 'warning' ? 'bg-warning' : 'bg-destructive'
                        }`} />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-medium truncate">{activity.action}</p>
                          <p className="text-xs text-muted-foreground">{activity.user} • {activity.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button variant="outline" className="h-20 flex-col">
                    <Bell className="h-6 w-6 mb-2" />
                    Send Alert
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Download className="h-6 w-6 mb-2" />
                    Export Data
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Flag className="h-6 w-6 mb-2" />
                    Review Reports
                  </Button>
                  <Button variant="outline" className="h-20 flex-col">
                    <Database className="h-6 w-6 mb-2" />
                    Backup System
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Enhanced Users Tab */}
          <TabsContent value="users" className="space-y-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-2xl font-bold">User Management</h2>
                <p className="text-muted-foreground">Monitor and moderate platform users</p>
              </div>
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-2">
                  <Search className="h-4 w-4" />
                  <Input placeholder="Search users..." className="w-64" />
                </div>
                <Select value={userFilter} onValueChange={setUserFilter}>
                  <SelectTrigger className="w-40">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">All Users</SelectItem>
                    <SelectItem value="active">Active</SelectItem>
                    <SelectItem value="banned">Banned</SelectItem>
                    <SelectItem value="moderators">Moderators</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
              <Card>
                <CardContent className="p-4 text-center">
                  <Users className="h-8 w-8 mx-auto mb-2 text-primary" />
                  <p className="text-2xl font-bold">{filteredUsers.length}</p>
                  <p className="text-sm text-muted-foreground">Total Users</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <UserCheck className="h-8 w-8 mx-auto mb-2 text-success" />
                  <p className="text-2xl font-bold">{stats.bannedUsers}</p>
                  <p className="text-sm text-muted-foreground">Banned Users</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Shield className="h-8 w-8 mx-auto mb-2 text-accent" />
                  <p className="text-2xl font-bold">5</p>
                  <p className="text-sm text-muted-foreground">Moderators</p>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-4 text-center">
                  <Flag className="h-8 w-8 mx-auto mb-2 text-warning" />
                  <p className="text-2xl font-bold">{stats.reportedContent}</p>
                  <p className="text-sm text-muted-foreground">Reports</p>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardContent className="p-0">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>User</TableHead>
                      <TableHead>Email</TableHead>
                      <TableHead>Skills</TableHead>
                      <TableHead>Rating</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredUsers.map((user) => (
                      <TableRow key={user.id}>
                        <TableCell>
                          <div className="flex items-center gap-3">
                            <img 
                              src={user.avatar} 
                              alt={user.name}
                              className="w-10 h-10 rounded-full object-cover"
                            />
                            <div>
                              <p className="font-medium">{user.name}</p>
                              <p className="text-xs text-muted-foreground">ID: {user.id}</p>
                            </div>
                          </div>
                        </TableCell>
                        <TableCell className="text-sm">{user.email}</TableCell>
                        <TableCell>
                          <Badge variant="secondary">
                            {user.offeredSkills.length} offered
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex items-center gap-1">
                            <Star className="h-4 w-4 fill-current text-yellow-400" />
                            <span>{user.rating}</span>
                          </div>
                        </TableCell>
                        <TableCell>
                          <Badge variant={user.isOnline ? "default" : "secondary"}>
                            {user.isOnline ? "Online" : "Offline"}
                          </Badge>
                        </TableCell>
                        <TableCell>
                          <div className="flex gap-2">
                            <Button variant="outline" size="sm">
                              <Eye className="h-4 w-4" />
                            </Button>
                            <Button variant="outline" size="sm" onClick={() => handlePromoteUser(user.id)}>
                              <Shield className="h-4 w-4" />
                            </Button>
                            <Button variant="destructive" size="sm" onClick={() => handleBanUser(user.id)}>
                              <Ban className="h-4 w-4" />
                            </Button>
                          </div>
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Swaps Tab */}
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

          {/* New Content Moderation Tab */}
          <TabsContent value="content" className="space-y-6">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Flag className="h-5 w-5" />
                  Content Moderation
                </CardTitle>
                <CardDescription>Review reported content and manage platform safety</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                  <Card>
                    <CardContent className="p-4 text-center">
                      <AlertTriangle className="h-8 w-8 mx-auto mb-2 text-warning" />
                      <p className="text-2xl font-bold">7</p>
                      <p className="text-sm text-muted-foreground">Pending Reports</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <CheckCircle className="h-8 w-8 mx-auto mb-2 text-success" />
                      <p className="text-2xl font-bold">34</p>
                      <p className="text-sm text-muted-foreground">Resolved</p>
                    </CardContent>
                  </Card>
                  <Card>
                    <CardContent className="p-4 text-center">
                      <XCircle className="h-8 w-8 mx-auto mb-2 text-destructive" />
                      <p className="text-2xl font-bold">12</p>
                      <p className="text-sm text-muted-foreground">Violations</p>
                    </CardContent>
                  </Card>
                </div>

                <div className="space-y-4">
                  {[1, 2, 3].map((report) => (
                    <div key={report} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div className="space-y-2">
                          <div className="flex items-center gap-2">
                            <Badge variant="destructive">High Priority</Badge>
                            <span className="text-sm text-muted-foreground">Report #{report}001</span>
                          </div>
                          <p className="font-medium">Inappropriate content in skill description</p>
                          <p className="text-sm text-muted-foreground">
                            Reported by John Doe • 2 hours ago
                          </p>
                        </div>
                        <div className="flex gap-2">
                          <Button variant="outline" size="sm">Review</Button>
                          <Button variant="destructive" size="sm">Remove Content</Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* New System Tab */}
          <TabsContent value="system" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Database className="h-5 w-5" />
                    Database Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Connection Status</span>
                    <Badge variant="default">Connected</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Database Size</span>
                    <span className="text-sm font-medium">{systemMetrics.databaseSize}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Active Connections</span>
                    <span className="text-sm font-medium">47</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Download className="h-4 w-4 mr-2" />
                    Backup Database
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Globe className="h-5 w-5" />
                    API Status
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm">API Health</span>
                    <Badge variant="default">Healthy</Badge>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Requests/min</span>
                    <span className="text-sm font-medium">1,247</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-sm">Response Time</span>
                    <span className="text-sm font-medium">124ms</span>
                  </div>
                  <Button variant="outline" className="w-full">
                    <Activity className="h-4 w-4 mr-2" />
                    View Logs
                  </Button>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* New Analytics Tab */}
          <TabsContent value="analytics" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-primary">2,847</p>
                    <p className="text-sm text-muted-foreground">Total Page Views</p>
                    <p className="text-xs text-success mt-1">↗ +15.3%</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-accent">1,234</p>
                    <p className="text-sm text-muted-foreground">Unique Visitors</p>
                    <p className="text-xs text-success mt-1">↗ +8.7%</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-warning">4:32</p>
                    <p className="text-sm text-muted-foreground">Avg. Session</p>
                    <p className="text-xs text-success mt-1">↗ +12.1%</p>
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardContent className="p-6">
                  <div className="text-center">
                    <p className="text-3xl font-bold text-success">89.2%</p>
                    <p className="text-sm text-muted-foreground">Success Rate</p>
                    <p className="text-xs text-success mt-1">↗ +2.4%</p>
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Download Reports</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <Button variant="outline" onClick={() => downloadReport('User Analytics')}>
                    <BarChart3 className="h-4 w-4 mr-2" />
                    User Analytics Report
                  </Button>
                  <Button variant="outline" onClick={() => downloadReport('Swap Metrics')}>
                    <ArrowUpDown className="h-4 w-4 mr-2" />
                    Swap Metrics Report
                  </Button>
                  <Button variant="outline" onClick={() => downloadReport('Financial Summary')}>
                    <TrendingUp className="h-4 w-4 mr-2" />
                    Financial Summary
                  </Button>
                  <Button variant="outline" onClick={() => downloadReport('System Performance')}>
                    <Monitor className="h-4 w-4 mr-2" />
                    System Performance
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* New Settings Tab */}
          <TabsContent value="settings" className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle>Platform Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">User Registration</p>
                      <p className="text-sm text-muted-foreground">Allow new user signups</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Verification</p>
                      <p className="text-sm text-muted-foreground">Require email verification</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Auto-moderation</p>
                      <p className="text-sm text-muted-foreground">Automatically filter content</p>
                    </div>
                    <Switch />
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>Notification Settings</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Email Notifications</p>
                      <p className="text-sm text-muted-foreground">Send system emails</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">SMS Alerts</p>
                      <p className="text-sm text-muted-foreground">Critical system alerts</p>
                    </div>
                    <Switch />
                  </div>
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="font-medium">Push Notifications</p>
                      <p className="text-sm text-muted-foreground">Browser notifications</p>
                    </div>
                    <Switch defaultChecked />
                  </div>
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle>Send Platform Announcement</CardTitle>
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
                <div className="flex gap-2">
                  <Button 
                    onClick={handleSendAnnouncement}
                    disabled={!announcement.trim()}
                    className="flex-1"
                  >
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Send Announcement
                  </Button>
                  <Button variant="outline">
                    <Mail className="h-4 w-4 mr-2" />
                    Send Email
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};
