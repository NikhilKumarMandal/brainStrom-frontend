import React, { useEffect, useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { createTeam } from "../http/api";
import CourseSelector from "../components/CourseSelector";
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

export default function CreateTeam() {
  const [teamName, setTeamName] = useState("");
  const [description, setDescription] = useState("");
  const [newSkill, setNewSkill] = useState("");
  const [skills, setSkills] = useState([]);
  const [selectedCourse, setSelectedCourse] = useState("");
  const [showErrors, setShowErrors] = useState(false);
  const [openLimitModal, setOpenLimitModal] = useState(false);
  const { user } = useAuthStore();
  const courses = user.enrolledCourses.map((c) => c.course.name);

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
      alert("Team created!");
      setTeamName("");
      setDescription("");
      setSkills([]);
      setNewSkill("");
      setCourse("");
    },
    onError: () => {
      alert("Failed to create team");
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
    setShowErrors(true);

    if (!teamName || !description || !selectedCourse) {
      alert("Team name, description, and course are required.");
      return;
    }

    const teamData = {
      name: teamName,
      description,
      course: selectedCourse,
      skills,
    };

    console.log("Submitting:", teamData);
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
            {courses.map((course) => (
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
            {skills.map((skill, i) => (
              <span
                key={i}
                className="text-xs bg-gray-700 text-gray-300 pl-3 py-1 rounded flex items-center justify-between gap-2"
              >
                {skill}
                <button
                  onClick={() => removeSkill(skill)}
                  className="text-red-400 text-lg p-1 bg-transparent focus:outline-none border-none hover:scale-110"
                >
                  <IoIosCloseCircleOutline className="text-xl" />
                </button>
              </span>
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
