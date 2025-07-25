import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SkillCard } from "@/components/SkillCard";
import { SkillCategoryCard } from "@/components/SkillCategoryCard";
import { SkillMatchAlert } from "@/components/SkillMatchAlert";
import { useUser } from "@/contexts/UserContext";
import { Search, Users, ArrowRight, Zap, Shield, Heart, LogIn, User, Settings } from "lucide-react";
import { skillCategories, mockUsers, featuredSwaps } from "@/data/mockData";

const Index = () => {
  const { currentUser, setCurrentUser } = useUser();
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredUsers, setFilteredUsers] = useState(mockUsers);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (!query.trim()) {
      setFilteredUsers(mockUsers);
      return;
    }

    const filtered = mockUsers.filter(
      (user) =>
        user.name.toLowerCase().includes(query.toLowerCase()) ||
        user.location.toLowerCase().includes(query.toLowerCase()) ||
        user.offeredSkills.some(skill => 
          skill.toLowerCase().includes(query.toLowerCase())
        ) ||
        user.wantedSkills.some(skill => 
          skill.toLowerCase().includes(query.toLowerCase())
        )
    );
    setFilteredUsers(filtered);
  };

  const handleLogout = () => {
    setCurrentUser(null);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-primary/5">
      {/* Skill Match Alerts */}
      <SkillMatchAlert />
      
      {/* Navigation */}
      <nav className="sticky top-0 z-40 bg-background/80 backdrop-blur-lg border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 bg-gradient-to-r from-primary to-accent rounded-lg flex items-center justify-center">
                <Users className="h-5 w-5 text-white" />
              </div>
              <h1 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
                SkillSwap
              </h1>
            </div>
            <div className="flex items-center gap-4">
              {currentUser ? (
                <>
                  <Link to="/swaps">
                    <Button variant="ghost">My Swaps</Button>
                  </Link>
                  <Link to="/profile">
                    <Button variant="ghost">
                      <User className="h-4 w-4 mr-2" />
                      Profile
                    </Button>
                  </Link>
                  {currentUser.email === "admin@skillswap.com" && (
                    <Link to="/admin">
                      <Button variant="ghost">
                        <Settings className="h-4 w-4 mr-2" />
                        Admin
                      </Button>
                    </Link>
                  )}
                  <Button variant="outline" onClick={handleLogout}>
                    Logout
                  </Button>
                </>
              ) : (
                <>
                  <Link to="/login">
                    <Button variant="ghost">
                      <LogIn className="h-4 w-4 mr-2" />
                      Login
                    </Button>
                  </Link>
                  <Link to="/login">
                    <Button>Join Now</Button>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="py-20 px-4" style={{ background: "var(--hero-gradient)" }}>
        <div className="container mx-auto text-center text-white">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Learn by <span className="text-yellow-300">Teaching</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto opacity-90">
            Exchange your skills with others in our vibrant community. Teach what you know, learn what you love.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Start Browsing Skills
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button size="lg" variant="outline" className="text-lg px-8 border-white text-white hover:bg-white hover:text-primary">
              Learn More
            </Button>
          </div>
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
            <div className="text-center">
              <div className="text-3xl font-bold">2,500+</div>
              <div className="text-lg opacity-90">Active Members</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">150+</div>
              <div className="text-lg opacity-90">Skills Available</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold">1,000+</div>
              <div className="text-lg opacity-90">Successful Swaps</div>
            </div>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-4 bg-section-bg">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">How SkillSwap Works</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Simple, secure, and effective skill exchange in three easy steps
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-primary rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-8 h-8 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Find Your Match</h3>
                <p className="text-muted-foreground">
                  Browse skills or search for specific expertise. Connect with people who have what you need and want what you offer.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4">
                  <Shield className="w-8 h-8 text-accent-foreground" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Secure Exchange</h3>
                <p className="text-muted-foreground">
                  Agree on terms, schedule sessions, and start learning. Our platform ensures safe and reliable skill exchanges.
                </p>
              </CardContent>
            </Card>
            <Card className="text-center">
              <CardContent className="pt-8">
                <div className="w-16 h-16 bg-orange-500 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Heart className="w-8 h-8 text-white" />
                </div>
                <h3 className="text-xl font-semibold mb-3">Grow Together</h3>
                <p className="text-muted-foreground">
                  Learn new skills, share your expertise, and build lasting connections in our supportive community.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Skill Categories */}
      <section id="categories" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Popular Skill Categories</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Discover skills across various domains and find the perfect learning opportunity
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {skillCategories.map((category, index) => (
              <SkillCategoryCard key={index} category={category} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured Swaps */}
      <section className="py-20 px-4 bg-section-bg">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Recent Skill Swaps</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              See how our community members are exchanging skills and growing together
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {featuredSwaps.map((swap) => (
              <Card key={swap.id}>
                <CardContent className="p-6">
                  <div className="flex justify-between items-start mb-4">
                    <Badge 
                      variant={swap.status === "Active" ? "default" : "secondary"}
                      className={swap.status === "Active" ? "bg-accent" : ""}
                    >
                      {swap.status}
                    </Badge>
                    <span className="text-sm text-muted-foreground">{swap.duration}</span>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between">
                      <span className="font-medium">{swap.userA}</span>
                      <ArrowRight className="w-4 h-4 text-muted-foreground" />
                      <span className="font-medium">{swap.userB}</span>
                    </div>
                    <div className="text-center">
                      <div className="text-sm text-primary font-medium">{swap.skillA}</div>
                      <div className="text-xs text-muted-foreground">for</div>
                      <div className="text-sm text-accent font-medium">{swap.skillB}</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Browse Skills */}
      <section id="browse" className="py-20 px-4">
        <div className="container mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-4">Browse Available Skills</h2>
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
              Find skilled community members ready to share their expertise
            </p>
          </div>

          {/* Search */}
          <div className="max-w-2xl mx-auto mb-12">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground w-5 h-5" />
              <Input
                placeholder="Search skills, names, or locations..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="pl-10 py-3 text-lg"
              />
            </div>
          </div>

          {/* Results */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredUsers.map((user) => (
              <SkillCard key={user.id} user={user} />
            ))}
          </div>

          {filteredUsers.length === 0 && searchQuery && (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground mb-4">
                No results found for "{searchQuery}"
              </p>
              <Button 
                variant="outline" 
                onClick={() => handleSearch("")}
              >
                Clear Search
              </Button>
            </div>
          )}
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-primary text-primary-foreground">
        <div className="container mx-auto text-center">
          <h2 className="text-4xl font-bold mb-4">Ready to Start Your Skill Journey?</h2>
          <p className="text-xl mb-8 opacity-90 max-w-2xl mx-auto">
            Join thousands of learners and teachers in our vibrant skill-sharing community.
          </p>
          <Link to="/login">
            <Button size="lg" variant="secondary" className="text-lg px-8">
              Join SkillSwap Today
            </Button>
          </Link>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-muted">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-2 mb-4">
                <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
                  <Zap className="w-5 h-5 text-primary-foreground" />
                </div>
                <span className="text-xl font-bold">SkillSwap</span>
              </div>
              <p className="text-muted-foreground">
                Connecting learners and teachers worldwide through skill exchange.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Platform</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>How it works</li>
                <li>Browse skills</li>
                <li>Safety & trust</li>
                <li>Success stories</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Community</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Guidelines</li>
                <li>Help center</li>
                <li>Contact us</li>
                <li>Feedback</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-muted-foreground">
                <li>Terms of service</li>
                <li>Privacy policy</li>
                <li>Cookie policy</li>
                <li>Accessibility</li>
              </ul>
            </div>
          </div>
          <div className="border-t mt-8 pt-8 text-center text-sm text-muted-foreground">
            © 2024 SkillSwap. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;