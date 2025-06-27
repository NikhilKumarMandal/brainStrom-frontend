import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiscussion } from "@/http/api";
import { toast } from "sonner";
import RichTextEditor from "./RichTextEditor";

function AddAnswerModel({ isOpen, onClose, id }) {
  const [answer, setAnswer] = useState("");
  const queryClient = useQueryClient();

  const handleSubmit = () => {
    if (answer.trim()) {
      mutate({ ticketId: id, content: answer });
    }
  };

  const { mutate, isPending: isPosting } = useMutation({
    mutationFn: (formData) => createDiscussion(formData),
    onSuccess: () => {
      setAnswer("");
      queryClient.invalidateQueries(["discussions", id]);
      toast.success("Answer submitted successfully");
      onClose();
    },
    onError: () => {
      toast.warning("Failed to submit answer");
    },
  });

  const handleClose = () => {
    setAnswer("");
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={handleClose}>
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Add Your Answer</DialogTitle>
        </DialogHeader>

        <div className="space-y-4 py-4">
          <div className="space-y-2">
            <Label htmlFor="answer">Your Answer</Label>
            <RichTextEditor
              onChange={setAnswer}
              value={answer}
              placeholder="Share your knowledge and help others..."
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={(!answer.trim() || isPosting)}>
            {isPosting ? "Posting..." : "Post Answer"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddAnswerModel;
