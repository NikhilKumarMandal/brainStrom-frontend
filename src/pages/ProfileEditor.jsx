import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Save, ArrowLeft, Tag, Link2 } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "sonner";

const ProfileEditor = () => {
  const [skills, setSkills] = useState([
    { id: "1", name: "JavaScript", category: "frontend", icon: "🟨" },
    { id: "2", name: "Node.JS", category: "backend", icon: "🟢" },
    { id: "3", name: "MongoDB", category: "backend", icon: "🍃" },
    { id: "4", name: "TypeScript", category: "frontend", icon: "🔵" },
    { id: "5", name: "HTML", category: "frontend", icon: "🟠" },
    { id: "6", name: "ExpressJS", category: "backend", icon: "⚡" },
    { id: "7", name: "Git", category: "tools", icon: "🔴" },
    { id: "8", name: "GitHub", category: "tools", icon: "⚫" },
    { id: "9", name: "Backend Developer", category: "other", icon: "💻" },
    { id: "10", name: "AWS", category: "tools", icon: "🟡" },
  ]);

  const suggestedSkills = [
    { name: "ReactJS", icon: "⚛️", category: "frontend" },
    { name: "NextJS", icon: "⚫", category: "frontend" },
    { name: "HTML / CSS / JavaScript", icon: "🌐", category: "frontend" },
    { name: "Python", icon: "🐍", category: "backend" },
    { name: "TailwindCSS", icon: "💨", category: "frontend" },
    { name: "Java", icon: "☕", category: "backend" },
    { name: "CSS", icon: "🎨", category: "frontend" },
    { name: "Redux", icon: "🔄", category: "frontend" },
    { name: "PostgreSQL", icon: "🐘", category: "backend" },
    { name: "Figma", icon: "🎨", category: "tools" },
  ];

  const [socialLinks, setSocialLinks] = useState();

  const [newSkill, setNewSkill] = useState("");
  const [newLink, setNewLink] = useState({
    platform: "Instagram",
    username: "",
  });

  const addSkill = (skillName, category, icon) => {
    if (
      skillName.trim() &&
      !skills.find((s) => s.name.toLowerCase() === skillName.toLowerCase())
    ) {
      const skill = {
        id: Date.now().toString(),
        name: skillName.trim(),
        category,
        icon,
      };
      setSkills([...skills, skill]);
      toast({
        title: "Skill Added",
        description: `${skillName} has been added to your profile.`,
      });
    }
  };

  const addCustomSkill = () => {
    if (newSkill.trim()) {
      addSkill(newSkill, "other");
      setNewSkill("");
    }
  };

  const removeSkill = (id) => {
    setSkills(skills.filter((skill) => skill.id !== id));
  };

  const addSocialLink = () => {
    if (newLink.username.trim()) {
      const platform = availableSocialPlatforms.find(
        (p) => p.platform === newLink.platform
      );
      if (platform) {
        const link = {
          id: Date.now().toString(),
          platform: newLink.platform,
          url: `https://${platform.baseUrl}/${newLink.username}`,
          username: newLink.username,
          icon: platform.icon,
          baseUrl: platform.baseUrl,
        };
        setSocialLinks([...socialLinks, link]);
        setNewLink({ platform: "Instagram", username: "" });
        toast({
          title: "Link Added",
          description: `${newLink.platform} profile has been added.`,
        });
      }
    }
  };

  const removeSocialLink = (id) => {
    setSocialLinks(socialLinks.filter((link) => link.id !== id));
  };

  const handleSave = () => {
    toast({
      title: "Profile Updated",
      description: "Your profile has been successfully updated.",
    });
  };

  return (
    <div className="text-black">
      <div className="max-w-4xl mx-auto px-6 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <RouterLink to="/profile">
              <Button
                variant="outline"
                size="sm"
                className="bg-primary text-white"
              >
                <ArrowLeft className="h-4 w-4 mr-2" />
                Back to Profile
              </Button>
            </RouterLink>
          </div>
          <Button onClick={handleSave} className="bg-primary">
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Tag className="h-6 w-6 text-gray-400" />
            <h2 className="text-xl font-semibold">PROFILE TAGS</h2>
          </div>

          <div className="mb-4">
            <div className="flex items-center justify-between mb-4">
              <p className="text-gray-400">Search skills, tools, roles</p>
              <span className="text-gray-500 text-sm">Upto 10</span>
            </div>

            {/* Current Skills */}
            <div className="flex flex-wrap gap-2 mb-6">
              {skills.map((skill) => (
                <Badge
                  key={skill.id}
                  className="bg-primary border border-gray-600 text-white px-3 py-1.5 text-sm flex items-center gap-2 hover:bg-gray-700"
                >
                  <span>{skill.icon}</span>
                  {skill.name}
                  <button
                    onClick={() => removeSkill(skill.id)}
                    className="ml-1 hover:bg-gray-600 rounded-full p-0.5"
                  >
                    <X className="h-3 w-3" />
                  </button>
                </Badge>
              ))}
            </div>

            {/* Add Custom Skill */}
            <div className="flex gap-2 mb-6">
              <Input
                placeholder="Add custom skill..."
                value={newSkill}
                onChange={(e) => setNewSkill(e.target.value)}
                onKeyPress={(e) => e.key === "Enter" && addCustomSkill()}
              />
              <Button
                onClick={addCustomSkill}
                className="bg-gray-700 hover:bg-gray-600"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>

            {/* Suggested Skills */}
            <div>
              <h3 className="text-gray-400 mb-3">Suggested Skills</h3>
              <div className="flex flex-wrap gap-2">
                {suggestedSkills.map((skill, index) => (
                  <button
                    key={index}
                    onClick={() =>
                      addSkill(skill.name, skill.category, skill.icon)
                    }
                    className="bg-gray-800 border border-gray-600 text-white px-3 py-1.5 text-sm rounded-full flex items-center gap-2 hover:bg-gray-700 transition-colors"
                  >
                    <span>{skill.icon}</span>
                    {skill.name}
                    <Plus className="h-3 w-3 text-green-400" />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div>
          <div className="flex items-center gap-3 mb-6">
            <Link2 className="h-6 w-6 text-gray-400" />
            <h2 className="text-xl font-semibold">SOCIAL LINKS</h2>
          </div>

          {/* Current Social Links */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <div className="bg-gray-800 border border-gray-600 rounded-lg p-4 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="text-xl"></span>
                <div>
                  <p className="text-white font-medium">hi/</p>
                  <p className="text-gray-400 text-sm">hus</p>
                </div>
              </div>
              <button
                onClick={() => removeSocialLink()}
                className="text-gray-400 hover:text-red-400 p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            <select
              className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
              value={newLink.platform}
              onChange={(e) =>
                setNewLink({ ...newLink, platform: e.target.value })
              }
            >
              <option>hello</option>
            </select>
            <Input
              placeholder="Enter Profile Link..."
              value={newLink.username}
              onChange={(e) =>
                setNewLink({ ...newLink, username: e.target.value })
              }
              onKeyPress={(e) => e.key === "Enter" && addSocialLink()}
            />
            <Button
              onClick={addSocialLink}
              className="bg-gray-700 hover:bg-gray-600"
            >
              <Plus className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileEditor;
