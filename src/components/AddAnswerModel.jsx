import React, { useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";

function AddAnswerModel({ isOpen, onClose }) {
  const [answer, setAnswer] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleSubmit = () => {
    if (answer.trim()) {
      console.log("Submitting answer:", answer);
      setAnswer("");
      onClose();
    }
  };

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
            <Textarea
              id="answer"
              placeholder="Share your knowledge and help others..."
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="min-h-[150px]"
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={handleClose}>
            Cancel
          </Button>
          <Button onClick={handleSubmit} disabled={!answer.trim()}>
            Post Answer
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default AddAnswerModel;
