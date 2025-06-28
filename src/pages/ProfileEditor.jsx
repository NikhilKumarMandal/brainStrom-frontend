import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Plus, X, Save, ArrowLeft, Tag, Link2 } from "lucide-react";
import { Link as RouterLink } from "react-router-dom";
import { toast } from "sonner";
import {
  deleteProfileLink,
  updateProfileLinks,
  updateSkills,
} from "@/http/api";
import { useAuthStore } from "@/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const socialPlatforms = [
  {
    platform: "GitHub",
    field: "gitHubLink",
    baseUrl: "https://github.com",
  },
  {
    platform: "LinkedIn",
    field: "linkedinLink",
    baseUrl: "https://linkedin.com/in",
  },
  { platform: "X", field: "xLink", baseUrl: "https://x.com" },
  {
    platform: "Hashnode",
    field: "hashnodeLink",
    baseUrl: "https://hashnode.com/@",
  },
  { platform: "Other", field: "otherLink", baseUrl: "" },
];

const platformFieldMap = Object.fromEntries(
  socialPlatforms.map((p) => [p.platform, p.field])
);

const ProfileEditor = () => {
  const { user } = useAuthStore();
  const queryClient = useQueryClient();
  const [skills, setSkills] = useState([]);
  const [initialSkills, setInitialSkills] = useState([]);
  const [newSkill, setNewSkill] = useState("");
  const [linksToRemove, setLinksToRemove] = useState([]);
  const [socialLinks, setSocialLinks] = useState([]);
  const [newLink, setNewLink] = useState({ platform: "GitHub", username: "" });

  useEffect(() => {
    if (user?.skills) {
      setSkills(user.skills);
      setInitialSkills(user.skills);
    }

    if (user) {
      const initialLinks = socialPlatforms
        .map(({ platform, field }) => ({
          platform,
          field,
          url: user[field] || "",
        }))
        .filter((link) => link.url);

      setSocialLinks(initialLinks);
    }
  }, [user]);

  const suggestedSkills = [
    "ReactJS",
    "NextJS",
    "HTML / CSS / JavaScript",
    "Python",
    "TailwindCSS",
    "Java",
    "CSS",
    "Redux",
    "PostgreSQL",
    "Figma",
  ];

  const addSkill = (skillName) => {
    const trimmed = skillName.trim();
    if (!trimmed || skills.includes(trimmed)) {
      toast.info(`"${trimmed}" is already added or invalid.`);
      return;
    }
    if (skills.length >= 10) {
      toast.warning("You can only add up to 10 skills.");
      return;
    }
    setSkills([...skills, trimmed]);
  };

  const addCustomSkill = () => {
    if (newSkill.trim()) {
      addSkill(newSkill);
      setNewSkill("");
    }
  };

  const removeSkill = (skillName) => {
    setSkills(skills.filter((s) => s !== skillName));
  };

  const mutation = useMutation({
    mutationFn: ({ skillsToAdd, skillsToRemove }) =>
      updateSkills(skillsToAdd, skillsToRemove),
    onSuccess: () => {
      toast.success("Skills updated successfully!");
      setInitialSkills(skills);
      queryClient.invalidateQueries(["user"]);
    },
    onError: () => toast.error("Failed to update skills."),
  });

  const saveLinksMutation = useMutation({
    mutationFn: (links) => updateProfileLinks(links),
    onSuccess: () => {
      toast.success("Social links updated.");
      queryClient.invalidateQueries(["user"]);
    },
    onError: () => toast.error("Failed to update social links."),
  });

  const deleteLinkMutation = useMutation({
    mutationFn: async (fields) => {
      // either bulk call if API allows array
      return Promise.all(fields.map((field) => deleteProfileLink(field)));
    },
    onSuccess: () => {
      toast.success("Removed unused links.");
      queryClient.invalidateQueries(["user"]);
    },
    onError: () => toast.error("Failed to remove some links."),
  });

  const addSocialLink = () => {
    const input = newLink.username.trim();
    if (!input) return;

    const platform = socialPlatforms.find(
      (p) => p.platform === newLink.platform
    );
    if (!platform) return;

    const alreadyExists = socialLinks.some(
      (link) => link.platform === newLink.platform
    );
    if (alreadyExists) {
      toast.info(`${platform.platform} link already exists.`);
      return;
    }

    // make sure url is valid URL
    const isFullUrl = /^https?:\/\//i.test(input);
    let username = input.trim();
    username = username
      .replace(/^@+/, "")
      .replace(/^\/+/, "")
      .replace(/\/+$/, "");

    //  final URL
    let url;
    if (isFullUrl) {
      url = input;
    } else if (platform.platform === "Hashnode") {
      url = `https://hashnode.com/@${username}`;
    } else {
      const base = platform.baseUrl.replace(/\/$/, "");
      const cleanUser = username.replace(/^\/+/, "");
      url = `${base}/${cleanUser}`;
    }

    setSocialLinks([
      ...socialLinks,
      {
        platform: platform.platform,
        field: platform.field,
        url,
      },
    ]);

    setNewLink({ platform: "GitHub", username: "" });
    toast.success(`${platform.platform} link added.`);
  };

  const removeSocialLink = (platform) => {
    const field = platformFieldMap[platform];
    if (!field) return;

    setLinksToRemove((prev) => [...prev, field]);
    setSocialLinks((prev) => prev.filter((link) => link.platform !== platform));
  };

  const handleSaveAll = () => {
    const skillsToAdd = skills.filter((s) => !initialSkills.includes(s));
    const skillsToRemove = initialSkills.filter((s) => !skills.includes(s));

    if (skillsToAdd.length || skillsToRemove.length) {
      mutation.mutate({ skillsToAdd, skillsToRemove });
    }

    const linksObject = {};
    socialLinks.forEach(({ platform, url }) => {
      const field = platformFieldMap[platform];
      if (field && url?.trim()) {
        linksObject[field] = url.trim();
      }
    });

    if (Object.keys(linksObject).length) {
      saveLinksMutation.mutate(linksObject);
    }

    if (linksToRemove.length > 0) {
      deleteLinkMutation.mutate(linksToRemove);
      setLinksToRemove([]);
    }
  };

  return (
    <div className="text-black max-w-4xl mx-auto px-6 py-8">
      {/* Header */}
      <div className="flex items-center justify-between mb-8">
        <RouterLink to="/profile">
          <Button variant="outline" size="sm" className="bg-primary text-white">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Profile
          </Button>
        </RouterLink>
        <Button
          onClick={handleSaveAll}
          disabled={mutation.isPending || saveLinksMutation.isPending}
          className="bg-primary"
        >
          {mutation.isPending || saveLinksMutation.isPending ? (
            "Saving..."
          ) : (
            <>
              <Save className="h-4 w-4 mr-2" />
              Save
            </>
          )}
        </Button>
      </div>

      {/* Skills Section */}
      <section className="mb-10">
        <div className="flex items-center gap-3 mb-6">
          <Tag className="h-6 w-6 text-gray-400" />
          <h2 className="text-xl font-semibold">PROFILE TAGS</h2>
        </div>
        <div className="flex items-center justify-between mb-4">
          <p className="text-gray-400">Search skills, tools, roles</p>
          <span className="text-gray-500 text-sm">{skills.length}/10</span>
        </div>

        <div className="flex flex-wrap gap-2 mb-6">
          {skills.map((skill) => (
            <Badge
              key={skill}
              className="bg-primary text-white flex items-center gap-2 p-2"
            >
              {skill}
              <button onClick={() => removeSkill(skill)}>
                <X className="h-3 w-3" />
              </button>
            </Badge>
          ))}
        </div>

        <div className="flex gap-2 mb-6">
          <Input
            placeholder="Add custom skill..."
            value={newSkill}
            onChange={(e) => setNewSkill(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && addCustomSkill()}
          />
          <Button onClick={addCustomSkill} disabled={skills.length >= 10}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
        <h3 className="text-gray-400 mb-3">Suggested Skills</h3>
        <div className="flex flex-wrap gap-2">
          {suggestedSkills.map((skill) => (
            <button
              key={skill}
              onClick={() => addSkill(skill)}
              className="bg-gray-800 border border-gray-600 text-white px-3 py-1.5 rounded-full flex items-center gap-2"
            >
              {skill}
              <Plus className="h-3 w-3 text-green-400" />
            </button>
          ))}
        </div>
      </section>

      {/* Social Links */}
      <section>
        <div className="flex items-center gap-3 mb-6">
          <Link2 className="h-6 w-6 text-gray-400" />
          <h2 className="text-xl font-semibold">SOCIAL LINKS</h2>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
          {socialLinks.map((link) => (
            <div
              key={link.platform}
              className="bg-gray-800 border border-gray-600 rounded-lg p-4 flex items-center justify-between"
            >
              <div>
                <p className="text-white font-medium">{link.platform}</p>
                <a
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-blue-400 underline break-all"
                >
                  {link.url}
                </a>
              </div>
              <button
                onClick={() => removeSocialLink(link.platform)}
                className="text-gray-400 hover:text-red-400 p-1"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          ))}
        </div>
        <div className="flex gap-2 mb-6">
          <select
            className="px-3 py-2 bg-gray-800 border border-gray-600 rounded-md text-white"
            value={newLink.platform}
            onChange={(e) =>
              setNewLink({ ...newLink, platform: e.target.value })
            }
          >
            {socialPlatforms.map((p) => (
              <option key={p.platform}>{p.platform}</option>
            ))}
          </select>
          <Input
            placeholder="Enter username or full URL..."
            value={newLink.username}
            onChange={(e) =>
              setNewLink({ ...newLink, username: e.target.value })
            }
            onKeyPress={(e) => e.key === "Enter" && addSocialLink()}
          />
          <Button onClick={addSocialLink}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </div>
  );
};

export default ProfileEditor;
