import React, { useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { useAuthStore } from "@/store/store";
import { useMutation } from "@tanstack/react-query";
import { createTicket } from "@/http/api";
import RichTextEditor from "./RichTextEditor";
import { toast } from "sonner";

export const AskQuestionModal = ({ isOpen, onClose, refetchQuestions }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [selectedCourse, setSelectedCourse] = useState("");
  const { user } = useAuthStore();
  const courses = user?.enrolledCourses?.map((c) => c.course?.name);

  useEffect(() => {
    if (courses?.length === 1) {
      setSelectedCourse(courses[0]);
    }
  }, [courses]);

  const { mutate, isPending } = useMutation({
    mutationFn: async (formData) => {
      const { data } = await createTicket(formData);
      return data;
    },
    onSuccess: () => {
      toast.success("Submitted");

      // Reset form and close modal
      setTitle("");
      setDescription("");
      setSelectedCourse("");
      refetchQuestions();
      onClose();
    },
    onError: (error) => {
      const message =
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        "Something went wrong";

      toast.error(message);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!title || !description || !selectedCourse) {
      toast.error("Please fill in all fields before submitting.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("courses", selectedCourse);

    mutate(formData);
  };

  const handleClose = () => {
    setTitle("");
    setDescription("");
    setSelectedCourse("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Ask a Question</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="title">Question Title</Label>
            <Input
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Enter your question title..."
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="description">Description</Label>
            <RichTextEditor
              content={description}
              onChange={setDescription}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="course">Course</Label>
            <Select
              value={selectedCourse}
              onValueChange={setSelectedCourse}
              required
            >
              <SelectTrigger>
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
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={handleClose}>
              Cancel
            </Button>
            <Button type="button" onClick={handleSubmit} disabled={isPending}>
              {isPending ? "Submitting..." : "Submit Question"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};
