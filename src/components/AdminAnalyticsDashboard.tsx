import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { 
  BarChart3,
  TrendingUp,
  TrendingDown,
  Users,
  ArrowUpDown,
  Calendar,
  Download,
  Eye,
  Clock,
  Globe,
  Smartphone,
  Monitor,
  MapPin,
  Star
} from "lucide-react";
import { Progress } from "@/components/ui/progress";

interface AnalyticsData {
  totalUsers: number;
  activeUsers: number;
  newUsers: number;
  totalSwaps: number;
  completedSwaps: number;
  successRate: number;
  pageViews: number;
  avgSessionTime: string;
  bounceRate: number;
}

const mockAnalytics: AnalyticsData = {
  totalUsers: 2847,
  activeUsers: 1234,
  newUsers: 89,
  totalSwaps: 567,
  completedSwaps: 489,
  successRate: 86.2,
  pageViews: 12847,
  avgSessionTime: "4:32",
  bounceRate: 23.4
};

const trafficSources = [
  { source: "Direct", visits: 4523, percentage: 45.2 },
  { source: "Google", visits: 3201, percentage: 32.1 },
  { source: "Social Media", visits: 1456, percentage: 14.6 },
  { source: "Referrals", visits: 820, percentage: 8.2 }
];

const popularSkills = [
  { skill: "React Development", swaps: 89, trend: "up" },
  { skill: "UI/UX Design", swaps: 76, trend: "up" },
  { skill: "Python Programming", swaps: 65, trend: "down" },
  { skill: "Digital Marketing", swaps: 54, trend: "up" },
  { skill: "Data Analysis", swaps: 43, trend: "up" }
];

const deviceBreakdown = [
  { device: "Desktop", percentage: 62.3, users: 1774 },
  { device: "Mobile", percentage: 32.1, users: 914 },
  { device: "Tablet", percentage: 5.6, users: 159 }
];

const geographicData = [
  { country: "United States", users: 847, percentage: 29.8 },
  { country: "United Kingdom", users: 456, percentage: 16.0 },
  { country: "Canada", users: 312, percentage: 11.0 },
  { country: "Germany", users: 289, percentage: 10.2 },
  { country: "Australia", users: 234, percentage: 8.2 }
];

export const AdminAnalyticsDashboard = () => {
  const [timeRange, setTimeRange] = useState("7d");
  const [activeMetric, setActiveMetric] = useState("users");

  const data = mockAnalytics;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-bold">Analytics Dashboard</h2>
          <p className="text-muted-foreground">Comprehensive platform insights and metrics</p>
        </div>
        <div className="flex items-center gap-2">
          <Select value={timeRange} onValueChange={setTimeRange}>
            <SelectTrigger className="w-32">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="24h">Last 24h</SelectItem>
              <SelectItem value="7d">Last 7 days</SelectItem>
              <SelectItem value="30d">Last 30 days</SelectItem>
              <SelectItem value="90d">Last 90 days</SelectItem>
            </SelectContent>
          </Select>
          <Button variant="outline">
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card className="border-2 hover:shadow-lg transition-shadow cursor-pointer" 
              onClick={() => setActiveMetric("users")}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Users</p>
                <p className="text-3xl font-bold text-primary">{data.totalUsers.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm text-success">+12.5%</span>
                </div>
              </div>
              <Users className="h-10 w-10 text-primary/70" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveMetric("swaps")}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Total Swaps</p>
                <p className="text-3xl font-bold text-accent">{data.totalSwaps}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm text-success">+8.7%</span>
                </div>
              </div>
              <ArrowUpDown className="h-10 w-10 text-accent/70" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveMetric("success")}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Success Rate</p>
                <p className="text-3xl font-bold text-success">{data.successRate}%</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm text-success">+2.1%</span>
                </div>
              </div>
              <Star className="h-10 w-10 text-success/70" />
            </div>
          </CardContent>
        </Card>

        <Card className="border-2 hover:shadow-lg transition-shadow cursor-pointer"
              onClick={() => setActiveMetric("pageviews")}>
          <CardContent className="p-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-muted-foreground">Page Views</p>
                <p className="text-3xl font-bold text-warning">{data.pageViews.toLocaleString()}</p>
                <div className="flex items-center gap-1 mt-1">
                  <TrendingUp className="h-4 w-4 text-success" />
                  <span className="text-sm text-success">+15.3%</span>
                </div>
              </div>
              <Eye className="h-10 w-10 text-warning/70" />
            </div>
          </CardContent>
        </Card>
      </div>

      <Tabs defaultValue="overview" className="space-y-6">
        <TabsList className="grid w-full grid-cols-5">
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="users">Users</TabsTrigger>
          <TabsTrigger value="skills">Skills</TabsTrigger>
          <TabsTrigger value="traffic">Traffic</TabsTrigger>
          <TabsTrigger value="geography">Geography</TabsTrigger>
        </TabsList>

        {/* Overview Tab */}
        <TabsContent value="overview" className="space-y-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>User Activity Trends</CardTitle>
                <CardDescription>Active users over the selected time period</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Daily Active Users</span>
                    <Badge variant="default">{data.activeUsers}</Badge>
                  </div>
                  <Progress value={65} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Weekly Active Users</span>
                    <Badge variant="secondary">{Math.round(data.activeUsers * 1.8)}</Badge>
                  </div>
                  <Progress value={78} className="h-2" />
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Monthly Active Users</span>
                    <Badge variant="outline">{Math.round(data.activeUsers * 2.3)}</Badge>
                  </div>
                  <Progress value={85} className="h-2" />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Skill Swap Performance</CardTitle>
                <CardDescription>Success rates and completion metrics</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Completed Swaps</span>
                    <span className="text-lg font-bold text-success">{data.completedSwaps}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Pending Swaps</span>
                    <span className="text-lg font-bold text-warning">{data.totalSwaps - data.completedSwaps}</span>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <span className="text-sm font-medium">Success Rate</span>
                    <span className="text-lg font-bold text-primary">{data.successRate}%</span>
                  </div>
                  
                  <div className="mt-4 p-4 bg-muted rounded-lg">
                    <p className="text-sm text-muted-foreground">
                      Average completion time: <strong>3.2 days</strong>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Popular Skills</CardTitle>
              <CardDescription>Most frequently swapped skills on the platform</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {popularSkills.map((skill, index) => (
                  <div key={skill.skill} className="flex items-center justify-between p-3 rounded-lg border">
                    <div className="flex items-center gap-3">
                      <Badge variant="outline">{index + 1}</Badge>
                      <span className="font-medium">{skill.skill}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span className="text-sm text-muted-foreground">{skill.swaps} swaps</span>
                      {skill.trend === "up" ? (
                        <TrendingUp className="h-4 w-4 text-success" />
                      ) : (
                        <TrendingDown className="h-4 w-4 text-destructive" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Users Tab */}
        <TabsContent value="users" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <Card>
              <CardContent className="p-6 text-center">
                <Users className="h-12 w-12 mx-auto mb-4 text-primary" />
                <p className="text-3xl font-bold">{data.newUsers}</p>
                <p className="text-sm text-muted-foreground">New Users Today</p>
                <Badge variant="default" className="mt-2">+15.2%</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <Clock className="h-12 w-12 mx-auto mb-4 text-accent" />
                <p className="text-3xl font-bold">{data.avgSessionTime}</p>
                <p className="text-sm text-muted-foreground">Avg. Session Time</p>
                <Badge variant="secondary" className="mt-2">+8.7%</Badge>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6 text-center">
                <TrendingDown className="h-12 w-12 mx-auto mb-4 text-warning" />
                <p className="text-3xl font-bold">{data.bounceRate}%</p>
                <p className="text-sm text-muted-foreground">Bounce Rate</p>
                <Badge variant="outline" className="mt-2">-3.1%</Badge>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Device Breakdown</CardTitle>
              <CardDescription>User access by device type</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {deviceBreakdown.map((device) => (
                  <div key={device.device} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {device.device === "Desktop" && <Monitor className="h-5 w-5" />}
                      {device.device === "Mobile" && <Smartphone className="h-5 w-5" />}
                      {device.device === "Tablet" && <Monitor className="h-5 w-5" />}
                      <span className="font-medium">{device.device}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${device.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12">{device.percentage}%</span>
                      <span className="text-sm text-muted-foreground w-16">{device.users} users</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Skills Tab */}
        <TabsContent value="skills" className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card>
              <CardHeader>
                <CardTitle>Skill Categories</CardTitle>
                <CardDescription>Distribution of skills by category</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {[
                    { category: "Frontend", count: 89, color: "bg-primary" },
                    { category: "Backend", count: 76, color: "bg-accent" },
                    { category: "Design", count: 65, color: "bg-success" },
                    { category: "Marketing", count: 43, color: "bg-warning" },
                    { category: "Data Science", count: 32, color: "bg-destructive" }
                  ].map((cat) => (
                    <div key={cat.category} className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <div className={`w-3 h-3 rounded-full ${cat.color}`} />
                        <span className="font-medium">{cat.category}</span>
                      </div>
                      <Badge variant="outline">{cat.count} skills</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle>Trending Skills</CardTitle>
                <CardDescription>Skills gaining popularity this week</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularSkills.slice(0, 5).map((skill, index) => (
                    <div key={skill.skill} className="flex items-center justify-between p-2 rounded">
                      <div className="flex items-center gap-2">
                        <Badge variant="secondary">{index + 1}</Badge>
                        <span className="text-sm font-medium">{skill.skill}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-sm text-muted-foreground">{skill.swaps}</span>
                        <TrendingUp className="h-4 w-4 text-success" />
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        </TabsContent>

        {/* Traffic Tab */}
        <TabsContent value="traffic" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Traffic Sources</CardTitle>
              <CardDescription>Where your users are coming from</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {trafficSources.map((source) => (
                  <div key={source.source} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{source.source}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${source.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12">{source.percentage}%</span>
                      <span className="text-sm text-muted-foreground w-16">{source.visits} visits</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        {/* Geography Tab */}
        <TabsContent value="geography" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Geographic Distribution</CardTitle>
              <CardDescription>Users by country</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {geographicData.map((country) => (
                  <div key={country.country} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <MapPin className="h-5 w-5 text-muted-foreground" />
                      <span className="font-medium">{country.country}</span>
                    </div>
                    <div className="flex items-center gap-4">
                      <div className="w-32 bg-muted rounded-full h-2">
                        <div 
                          className="bg-primary h-2 rounded-full" 
                          style={{ width: `${country.percentage}%` }}
                        />
                      </div>
                      <span className="text-sm font-medium w-12">{country.percentage}%</span>
                      <span className="text-sm text-muted-foreground w-16">{country.users} users</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};