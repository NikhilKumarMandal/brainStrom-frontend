import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Github,
  Linkedin,
  Twitter,
  Globe,
  Mail,
  Briefcase,
  GraduationCap,
} from "lucide-react";

export default function ProfilePage() {
  const user = {
    name: "Alex Johnson",
    email: "alex.johnson@example.com",
    avatar: "/placeholder.svg?height=120&width=120",
    location: "San Francisco, CA",
    joinDate: "March 2021",
    socialLinks: [
      {
        platform: "GitHub",
        url: "https://github.com/alexjohnson",
        icon: Github,
      },
      {
        platform: "LinkedIn",
        url: "https://linkedin.com/in/alexjohnson",
        icon: Linkedin,
      },
      {
        platform: "Twitter",
        url: "https://twitter.com/alexjohnson",
        icon: Twitter,
      },
      { platform: "Website", url: "https://alexjohnson.dev", icon: Globe },
    ],
    skills: [
      "React",
      "Next.js",
      "TypeScript",
      "Node.js",
      "Python",
      "PostgreSQL",
      "AWS",
      "Docker",
      "GraphQL",
      "Tailwind CSS",
      "MongoDB",
      "Redis",
    ],
    history: [
      {
        type: "work",
        title: "Senior Frontend Developer",
        company: "TechCorp Inc.",
        period: "2023 - Present",
        description:
          "Leading frontend development for enterprise applications, mentoring junior developers, and implementing modern React patterns.",
      },
      {
        type: "work",
        title: "Full Stack Developer",
        company: "StartupXYZ",
        period: "2021 - 2023",
        description:
          "Built and maintained multiple web applications using React, Node.js, and PostgreSQL. Improved application performance by 40%.",
      },
      {
        type: "education",
        title: "Bachelor of Computer Science",
        company: "University of California",
        period: "2017 - 2021",
        description:
          "Graduated with honors. Focused on software engineering and web development technologies.",
      },
      {
        type: "work",
        title: "Junior Developer",
        company: "WebSolutions Ltd.",
        period: "2020 - 2021",
        description:
          "Internship and part-time role developing responsive websites and learning industry best practices.",
      },
    ],
  };

  delete user.bio;

  return (
    <div className="p-4">
      <div className="mx-auto max-w-4xl space-y-6">
        {/* Header Card */}
        <Card className="overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 to-purple-600"></div>
          <CardContent className="relative pb-6">
            <div className="flex flex-col sm:flex-row sm:items-end sm:space-x-6">
              <Avatar className="h-24 w-24 border-4 border-white shadow-lg -mt-12 mb-4 sm:mb-0">
                <AvatarImage
                  src={user.avatar || "/placeholder.svg"}
                  alt={user.name}
                />
                <AvatarFallback className="text-2xl font-bold bg-gradient-to-br from-blue-500 to-purple-600 text-white">
                  {user.name
                    .split(" ")
                    .map((n) => n[0])
                    .join("")}
                </AvatarFallback>
              </Avatar>

              <div className="flex-1 space-y-2">
                <div>
                  <h1 className="text-3xl font-bold text-gray-900">
                    {user.name}
                  </h1>
                  <div className="flex items-center space-x-4 text-gray-600 mt-2">
                    <div className="flex items-center space-x-1">
                      <Mail className="h-4 w-4" />
                      <span className="text-sm">{user.email}</span>
                    </div>
                  </div>
                </div>

                <div className="flex space-x-2 pt-2">
                  {user.socialLinks.map((link) => {
                    const IconComponent = link.icon;
                    return (
                      <Button
                        key={link.platform}
                        variant="outline"
                        size="sm"
                        className="h-9 w-9 p-0 hover:bg-gray-100"
                        asChild
                      >
                        <a
                          href={link.url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <IconComponent className="h-4 w-4" />
                          <span className="sr-only">{link.platform}</span>
                        </a>
                      </Button>
                    );
                  })}
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <div className="grid gap-6 md:grid-cols-3">
          {/* Skills Card */}
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-green-500"></div>
                <span>Skills</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex flex-wrap gap-2">
                {user.skills.map((skill) => (
                  <Badge
                    key={skill}
                    variant="secondary"
                    className="bg-blue-50 text-blue-700 hover:bg-blue-100"
                  >
                    {skill}
                  </Badge>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* History Card */}
          <Card className="md:col-span-2">
            <CardHeader>
              <CardTitle className="flex items-center space-x-2">
                <div className="h-2 w-2 rounded-full bg-purple-500"></div>
                <span>History</span>
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="max-h-96 overflow-y-auto pr-2 space-y-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
                {user.history.map((item, index) => (
                  <div key={index} className="relative">
                    <div className="flex items-start space-x-4">
                      <div className="flex-shrink-0">
                        <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gray-100">
                          {item.type === "work" ? (
                            <Briefcase className="h-5 w-5 text-gray-600" />
                          ) : (
                            <GraduationCap className="h-5 w-5 text-gray-600" />
                          )}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between">
                          <h3 className="text-lg font-semibold text-gray-900">
                            {item.title}
                          </h3>
                          <span className="text-sm text-gray-500 font-medium">
                            {item.period}
                          </span>
                        </div>
                        <p className="text-sm font-medium text-gray-600 mb-1">
                          {item.company}
                        </p>
                        <p className="text-sm text-gray-700">
                          {item.description}
                        </p>
                      </div>
                    </div>
                    {index < user.history.length - 1 && (
                      <div className="absolute left-5 top-10 h-6 w-px bg-gray-200"></div>
                    )}
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}
