import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { createTeam } from "../http/api";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useAuthStore } from "@/store/store";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { X } from "lucide-react";
import useNavigation from "@/utils/navigation";
import { hasMinWords } from "@/utils/formateString";

export default function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [openLimitModal, setOpenLimitModal] = useState(false);
  const { user } = useAuthStore();
  const courses = user?.enrolledCourses?.map((c) => c?.course?.name);

  const { gotoMyTeams } = useNavigation();

  useEffect(() => {
    if (courses.length === 1) {
      setSelectedCourse(courses[0]);
    }
  }, [courses]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (teamData) => {
      const { data } = await createTeam(teamData);
      return data;
    },
    onSuccess: () => {
      setTeamName("");
      setDescription("");
      setSkills([]);
      setNewSkill("");
      toast.success("Team create successfully");
      gotoMyTeams();
    },
    onError: () => {
      const message =
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        "Something went wrong";

      toast.error(message);
    },
  });

  const addSkill = () => {
    const trimmed = newSkill.trim();
    if (!trimmed || skills.includes(trimmed)) return;

    if (skills.length >= 10) {
      setOpenLimitModal(true);
      return;
    }

    setSkills([...skills, trimmed]);
    setNewSkill("");
  };

  const removeSkill = (skillToRemove) => {
    setSkills(skills.filter((skill) => skill !== skillToRemove));
  };

  const handleCreate = (e) => {
    e.preventDefault();

    if (!teamName || !description || !selectedCourse) {
      toast.info("All fields are required.");
      return;
    }

    // if (!hasMinWords(teamName, 1)) {
    //   toast.error("Team name should be at least 1 words long.");
    //   return;
    // }

    // if (!hasMinWords(description, 5)) {
    //   toast.error("Description should be at least 5 words long.");
    //   return;
    // }

    if (skills?.length === 0) {
      toast.error("You must add at least one skill.");
      return;
    }

    const teamData = {
      name: teamName,
      description,
      course: selectedCourse,
      skills,
    };

    mutate(teamData);
  };

  return (
    <div className="w-full text-black p-6 flex flex-col items-center justify-center gap-6 text-center">
      <h1 className="text-3xl font-bold">Create a New Team</h1>

      <div className="w-full max-w-lg flex flex-col gap-4 bg-white/80 backdrop-blur-sm text-black p-6 rounded-lg shadow-lg">
        <Input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Team Name"
        />

        <Select
          value={selectedCourse}
          onValueChange={setSelectedCourse}
          required
        >
          <SelectTrigger className={"w-full"}>
            <SelectValue placeholder="Select a course" />
          </SelectTrigger>
          <SelectContent>
            {courses?.map((course) => (
              <SelectItem key={course} value={course}>
                {course}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>

        <Textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          placeholder="Team Description"
          rows={4}
        />

        <div>
          <div className="flex gap-2 mb-2">
            <Input
              type="text"
              value={newSkill}
              onChange={(e) => setNewSkill(e.target.value)}
              onKeyDown={(e) =>
                e.key === "Enter" && (e.preventDefault(), addSkill())
              }
              placeholder="Add a technology and press Enter"
            />
            <button
              onClick={addSkill}
              className="px-4 py-2 rounded-md border text-sm transition border-gray-500 text-white hover:bg-gray-800 hover:border-gray-400 focus:outline-none bg-primary "
            >
              Add
            </button>
          </div>

          <div className="flex flex-wrap gap-2">
            {skills?.map((skill, i) => (
              <Badge
                key={skill}
                variant="outline"
                className="text-md gap-2 border-gray-200 text-gray-600 px-2 pt-0"
              >
                {skill}
                <button onClick={() => removeSkill(skill)}>
                  <X className="h-3 w-3" />
                </button>
              </Badge>
            ))}
          </div>
        </div>

        <button
          onClick={handleCreate}
          disabled={isPending}
          className="mt-4 px-4 py-2 rounded-md border text-sm transition border-gray-500 text-white hover:bg-gray-800 hover:border-gray-400 focus:outline-none disabled:opacity-50 bg-primary"
        >
          {isPending ? "Creating..." : "Create Team"}
        </button>
      </div>

      {openLimitModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg w-full max-w-sm relative text-center">
            <h2 className="text-lg font-semibold mb-2">Skill Limit Reached</h2>
            <p className="text-gray-300 mb-4">
              Maximum limit of adding skills is reached.
              <br />
              You can only add 10 skills.
            </p>
            <button
              onClick={() => setOpenLimitModal(false)}
              className="mt-2 px-4 py-2 rounded-md bg-amber-700 hover:bg-amber-600 text-white text-sm"
            >
              Okay
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
