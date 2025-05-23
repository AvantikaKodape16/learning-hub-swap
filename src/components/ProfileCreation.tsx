
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Plus, User, BookOpen, Clock, MapPin } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface ProfileCreationProps {
  onComplete: (profileData: any) => void;
}

const skillCategories = [
  "Programming", "Design", "Languages", "Music", "Cooking", "Sports", 
  "Business", "Marketing", "Writing", "Photography", "Art", "Crafts"
];

const timezones = [
  "UTC-8 (PST)", "UTC-5 (EST)", "UTC+0 (GMT)", "UTC+1 (CET)", "UTC+8 (CST)"
];

export const ProfileCreation = ({ onComplete }: ProfileCreationProps) => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    bio: "",
    timezone: "",
    skillsToTeach: [] as string[],
    skillsToLearn: [] as string[],
    availability: "flexible"
  });
  const [newSkill, setNewSkill] = useState("");
  const [skillType, setSkillType] = useState<"teach" | "learn">("teach");

  const addSkill = () => {
    if (!newSkill.trim()) return;
    
    const skillKey = skillType === "teach" ? "skillsToTeach" : "skillsToLearn";
    if (formData[skillKey].includes(newSkill)) {
      toast({
        title: "Skill already added",
        description: "This skill is already in your list.",
        variant: "destructive"
      });
      return;
    }
    
    setFormData(prev => ({
      ...prev,
      [skillKey]: [...prev[skillKey], newSkill]
    }));
    setNewSkill("");
  };

  const removeSkill = (skill: string, type: "teach" | "learn") => {
    const skillKey = type === "teach" ? "skillsToTeach" : "skillsToLearn";
    setFormData(prev => ({
      ...prev,
      [skillKey]: prev[skillKey].filter(s => s !== skill)
    }));
  };

  const handleNext = () => {
    if (currentStep === 1) {
      if (!formData.name || !formData.email) {
        toast({
          title: "Missing information",
          description: "Please fill in your name and email.",
          variant: "destructive"
        });
        return;
      }
    } else if (currentStep === 2) {
      if (formData.skillsToTeach.length === 0) {
        toast({
          title: "Add skills to teach",
          description: "Please add at least one skill you can teach.",
          variant: "destructive"
        });
        return;
      }
    }
    setCurrentStep(prev => prev + 1);
  };

  const handleComplete = () => {
    if (formData.skillsToLearn.length === 0) {
      toast({
        title: "Add skills to learn",
        description: "Please add at least one skill you want to learn.",
        variant: "destructive"
      });
      return;
    }
    
    toast({
      title: "Profile created!",
      description: "Welcome to SkillSwap! Let's find your perfect matches.",
    });
    
    onComplete(formData);
  };

  const steps = [
    { number: 1, title: "Basic Info", icon: User },
    { number: 2, title: "Skills to Teach", icon: BookOpen },
    { number: 3, title: "Skills to Learn", icon: BookOpen },
    { number: 4, title: "Preferences", icon: Clock }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl mx-auto">
        {/* Progress Steps */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-4">
            {steps.map((step, index) => (
              <div key={step.number} className="flex items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                  currentStep >= step.number 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white' 
                    : 'bg-gray-200 text-gray-500'
                }`}>
                  <step.icon className="w-5 h-5" />
                </div>
                {index < steps.length - 1 && (
                  <div className={`w-16 h-1 mx-2 ${
                    currentStep > step.number ? 'bg-gradient-to-r from-blue-600 to-purple-600' : 'bg-gray-200'
                  }`} />
                )}
              </div>
            ))}
          </div>
          <h2 className="text-2xl font-bold text-center text-gray-900">
            {steps[currentStep - 1].title}
          </h2>
        </div>

        <Card className="shadow-xl border-0">
          <CardHeader>
            <CardTitle className="text-center">Create Your SkillSwap Profile</CardTitle>
            <CardDescription className="text-center">
              Step {currentStep} of {steps.length}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {currentStep === 1 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Full Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
                    placeholder="Enter your full name"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
                    placeholder="your.email@example.com"
                    className="mt-1"
                  />
                </div>
                <div>
                  <Label htmlFor="bio">Bio (Optional)</Label>
                  <Textarea
                    id="bio"
                    value={formData.bio}
                    onChange={(e) => setFormData(prev => ({ ...prev, bio: e.target.value }))}
                    placeholder="Tell us about yourself and your learning goals..."
                    className="mt-1"
                    rows={3}
                  />
                </div>
              </div>
            )}

            {currentStep === 2 && (
              <div className="space-y-4">
                <div>
                  <Label>Skills You Can Teach</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="e.g., JavaScript, Guitar, Cooking..."
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button onClick={addSkill} type="button">
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.skillsToTeach.map((skill) => (
                      <Badge key={skill} variant="secondary" className="flex items-center gap-1">
                        {skill}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-red-500" 
                          onClick={() => removeSkill(skill, "teach")}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-blue-50 p-4 rounded-lg">
                  <h4 className="font-medium text-blue-900 mb-2">💡 Pro Tips</h4>
                  <ul className="text-sm text-blue-800 space-y-1">
                    <li>• Be specific about your skills (e.g., "React Development" vs "Programming")</li>
                    <li>• Include your experience level to help with matching</li>
                    <li>• Add both technical and soft skills</li>
                  </ul>
                </div>
              </div>
            )}

            {currentStep === 3 && (
              <div className="space-y-4">
                <div>
                  <Label>Skills You Want to Learn</Label>
                  <div className="flex gap-2 mt-2">
                    <Input
                      value={newSkill}
                      onChange={(e) => setNewSkill(e.target.value)}
                      placeholder="e.g., Python, Photography, Spanish..."
                      onKeyPress={(e) => e.key === 'Enter' && addSkill()}
                    />
                    <Button 
                      onClick={() => {
                        setSkillType("learn");
                        addSkill();
                      }} 
                      type="button"
                    >
                      <Plus className="w-4 h-4" />
                    </Button>
                  </div>
                  <div className="flex flex-wrap gap-2 mt-3">
                    {formData.skillsToLearn.map((skill) => (
                      <Badge key={skill} variant="outline" className="flex items-center gap-1">
                        {skill}
                        <X 
                          className="w-3 h-3 cursor-pointer hover:text-red-500" 
                          onClick={() => removeSkill(skill, "learn")}
                        />
                      </Badge>
                    ))}
                  </div>
                </div>
                <div className="bg-green-50 p-4 rounded-lg">
                  <h4 className="font-medium text-green-900 mb-2">🎯 Matching Magic</h4>
                  <p className="text-sm text-green-800">
                    Our algorithm will find users who can teach what you want to learn, 
                    and who want to learn what you can teach. It's a perfect skill exchange!
                  </p>
                </div>
              </div>
            )}

            {currentStep === 4 && (
              <div className="space-y-4">
                <div>
                  <Label htmlFor="timezone">Timezone</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, timezone: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="Select your timezone" />
                    </SelectTrigger>
                    <SelectContent>
                      {timezones.map((tz) => (
                        <SelectItem key={tz} value={tz}>{tz}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <Label htmlFor="availability">Availability</Label>
                  <Select onValueChange={(value) => setFormData(prev => ({ ...prev, availability: value }))}>
                    <SelectTrigger className="mt-1">
                      <SelectValue placeholder="How flexible is your schedule?" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="flexible">Very Flexible</SelectItem>
                      <SelectItem value="moderate">Moderately Flexible</SelectItem>
                      <SelectItem value="limited">Limited Availability</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h4 className="font-medium text-purple-900 mb-2">🚀 You're Almost Ready!</h4>
                  <p className="text-sm text-purple-800">
                    Complete your profile to start connecting with amazing skill exchange partners.
                  </p>
                </div>
              </div>
            )}

            <div className="flex justify-between pt-6">
              <Button 
                variant="outline" 
                onClick={() => setCurrentStep(prev => prev - 1)}
                disabled={currentStep === 1}
              >
                Previous
              </Button>
              {currentStep < steps.length ? (
                <Button onClick={handleNext} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Next
                </Button>
              ) : (
                <Button onClick={handleComplete} className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                  Complete Profile
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
