
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { 
  Users, 
  Calendar, 
  MessageCircle, 
  Star, 
  Trophy, 
  Bell,
  Settings,
  User,
  BookOpen,
  Clock,
  Zap,
  Heart,
  CheckCircle
} from "lucide-react";

interface DashboardProps {
  user: any;
}

// Mock data for matches and sessions
const mockMatches = [
  {
    id: 1,
    name: "Sarah Chen",
    bio: "Frontend developer passionate about design",
    skillsToTeach: ["React", "UI/UX Design"],
    skillsToLearn: ["Node.js", "Database Design"],
    rating: 4.9,
    sessions: 12,
    matchPercentage: 95
  },
  {
    id: 2,
    name: "Marcus Johnson",
    bio: "Full-stack engineer and guitar enthusiast",
    skillsToTeach: ["Python", "Django"],
    skillsToLearn: ["React", "TypeScript"],
    rating: 4.8,
    sessions: 8,
    matchPercentage: 88
  },
  {
    id: 3,
    name: "Elena Rodriguez",
    bio: "Multilingual teacher and cooking lover",
    skillsToTeach: ["Spanish", "Italian Cooking"],
    skillsToLearn: ["Photography", "Video Editing"],
    rating: 5.0,
    sessions: 15,
    matchPercentage: 82
  }
];

const mockSessions = [
  {
    id: 1,
    partner: "Sarah Chen",
    skill: "React Fundamentals",
    date: "Today, 2:00 PM",
    type: "Learning",
    status: "confirmed"
  },
  {
    id: 2,
    partner: "Marcus Johnson", 
    skill: "Guitar Basics",
    date: "Tomorrow, 4:00 PM",
    type: "Teaching",
    status: "pending"
  },
  {
    id: 3,
    partner: "Elena Rodriguez",
    skill: "Spanish Conversation",
    date: "Friday, 6:00 PM", 
    type: "Learning",
    status: "confirmed"
  }
];

export const Dashboard = ({ user }: DashboardProps) => {
  const [activeTab, setActiveTab] = useState("overview");

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-3">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <Zap className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                SkillSwap
              </span>
            </div>
            
            <div className="flex items-center space-x-4">
              <Button variant="ghost" size="sm">
                <Bell className="w-5 h-5" />
              </Button>
              <Button variant="ghost" size="sm">
                <Settings className="w-5 h-5" />
              </Button>
              <Avatar>
                <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white">
                  {getInitials(user.name)}
                </AvatarFallback>
              </Avatar>
            </div>
          </div>
        </div>
      </header>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <div className="lg:w-80">
            <Card className="mb-6">
              <CardHeader className="text-center">
                <Avatar className="w-20 h-20 mx-auto mb-4">
                  <AvatarFallback className="bg-gradient-to-r from-blue-600 to-purple-600 text-white text-2xl">
                    {getInitials(user.name)}
                  </AvatarFallback>
                </Avatar>
                <CardTitle>{user.name}</CardTitle>
                <CardDescription>{user.bio || "SkillSwap Member"}</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-2">SKILLS I TEACH</h4>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsToTeach.map((skill: string) => (
                        <Badge key={skill} className="bg-green-100 text-green-800 border-green-200">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                  <div>
                    <h4 className="font-medium text-sm text-gray-500 mb-2">SKILLS I LEARN</h4>
                    <div className="flex flex-wrap gap-1">
                      {user.skillsToLearn.map((skill: string) => (
                        <Badge key={skill} variant="outline" className="border-blue-200 text-blue-800">
                          {skill}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Trophy className="w-5 h-5 text-yellow-500" />
                  Your Stats
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Sessions Completed</span>
                    <span className="font-semibold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Skills Exchanges</span>
                    <span className="font-semibold">0</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-sm text-gray-600">Rating</span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-semibold">New</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
              <TabsList className="grid w-full grid-cols-4">
                <TabsTrigger value="overview">Overview</TabsTrigger>
                <TabsTrigger value="matches">Matches</TabsTrigger>
                <TabsTrigger value="sessions">Sessions</TabsTrigger>
                <TabsTrigger value="messages">Messages</TabsTrigger>
              </TabsList>

              <TabsContent value="overview" className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">New Matches</CardTitle>
                      <Users className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">3</div>
                      <p className="text-xs text-muted-foreground">Perfect skill exchange partners</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Upcoming Sessions</CardTitle>
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">2</div>
                      <p className="text-xs text-muted-foreground">Sessions this week</p>
                    </CardContent>
                  </Card>
                  
                  <Card>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">Unread Messages</CardTitle>
                      <MessageCircle className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">1</div>
                      <p className="text-xs text-muted-foreground">New conversation</p>
                    </CardContent>
                  </Card>
                </div>

                <Card>
                  <CardHeader>
                    <CardTitle>Recent Activity</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                        <span className="text-sm">Profile created successfully</span>
                        <span className="text-xs text-gray-500 ml-auto">Just now</span>
                      </div>
                      <div className="flex items-center gap-3">
                        <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                        <span className="text-sm">Found 3 potential matches</span>
                        <span className="text-xs text-gray-500 ml-auto">Just now</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="matches" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Your Matches</h2>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    Refresh Matches
                  </Button>
                </div>
                
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                  {mockMatches.map((match) => (
                    <Card key={match.id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <div className="flex items-start justify-between">
                          <div className="flex items-center gap-3">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-to-r from-pink-500 to-orange-500 text-white">
                                {getInitials(match.name)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <CardTitle className="text-lg">{match.name}</CardTitle>
                              <div className="flex items-center gap-2">
                                <div className="flex items-center gap-1">
                                  <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                                  <span className="text-sm">{match.rating}</span>
                                </div>
                                <span className="text-sm text-gray-500">•</span>
                                <span className="text-sm text-gray-500">{match.sessions} sessions</span>
                              </div>
                            </div>
                          </div>
                          <Badge className="bg-green-100 text-green-800 border-green-200">
                            {match.matchPercentage}% match
                          </Badge>
                        </div>
                      </CardHeader>
                      <CardContent>
                        <p className="text-sm text-gray-600 mb-4">{match.bio}</p>
                        <div className="space-y-3">
                          <div>
                            <h4 className="font-medium text-sm mb-1">Can teach you:</h4>
                            <div className="flex flex-wrap gap-1">
                              {match.skillsToTeach.map((skill) => (
                                <Badge key={skill} className="bg-green-100 text-green-800 border-green-200 text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                          <div>
                            <h4 className="font-medium text-sm mb-1">Wants to learn:</h4>
                            <div className="flex flex-wrap gap-1">
                              {match.skillsToLearn.map((skill) => (
                                <Badge key={skill} variant="outline" className="border-blue-200 text-blue-800 text-xs">
                                  {skill}
                                </Badge>
                              ))}
                            </div>
                          </div>
                        </div>
                        <div className="flex gap-2 mt-6">
                          <Button className="flex-1" variant="outline">
                            <MessageCircle className="w-4 h-4 mr-2" />
                            Message
                          </Button>
                          <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                            <Heart className="w-4 h-4 mr-2" />
                            Connect
                          </Button>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="sessions" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Your Sessions</h2>
                  <Button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <Calendar className="w-4 h-4 mr-2" />
                    Schedule Session
                  </Button>
                </div>
                
                <div className="space-y-4">
                  {mockSessions.map((session) => (
                    <Card key={session.id}>
                      <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-4">
                            <Avatar>
                              <AvatarFallback className="bg-gradient-to-r from-indigo-500 to-purple-500 text-white">
                                {getInitials(session.partner)}
                              </AvatarFallback>
                            </Avatar>
                            <div>
                              <h3 className="font-semibold">{session.skill}</h3>
                              <p className="text-sm text-gray-600">with {session.partner}</p>
                              <div className="flex items-center gap-2 mt-1">
                                <Clock className="w-4 h-4 text-gray-400" />
                                <span className="text-sm text-gray-500">{session.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-3">
                            <Badge 
                              variant={session.type === "Teaching" ? "default" : "secondary"}
                              className={session.type === "Teaching" ? "bg-green-100 text-green-800 border-green-200" : "bg-blue-100 text-blue-800 border-blue-200"}
                            >
                              {session.type}
                            </Badge>
                            <Badge 
                              variant={session.status === "confirmed" ? "default" : "secondary"}
                              className={session.status === "confirmed" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"}
                            >
                              {session.status === "confirmed" ? (
                                <CheckCircle className="w-3 h-3 mr-1" />
                              ) : (
                                <Clock className="w-3 h-3 mr-1" />
                              )}
                              {session.status}
                            </Badge>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </TabsContent>

              <TabsContent value="messages" className="space-y-6">
                <div className="flex justify-between items-center">
                  <h2 className="text-2xl font-bold">Messages</h2>
                  <Button variant="outline">
                    Mark All Read
                  </Button>
                </div>
                
                <Card>
                  <CardContent className="p-6">
                    <div className="text-center py-12">
                      <MessageCircle className="w-12 h-12 text-gray-400 mx-auto mb-4" />
                      <h3 className="text-lg font-medium text-gray-900 mb-2">No messages yet</h3>
                      <p className="text-gray-600 mb-6">
                        Start connecting with your matches to begin conversations!
                      </p>
                      <Button 
                        onClick={() => setActiveTab("matches")}
                        className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700"
                      >
                        View Matches
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </div>
    </div>
  );
};
