import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { timeAgo } from "@/utils/formateTime";
import RichTextEditor from "./RichTextEditor";
import { Badge } from "./ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useAuthStore } from "@/store/store";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateStatus } from "@/http/api";
import { toast } from "sonner";

const QuestionSection = ({ question }) => {
  const { user } = useAuthStore();
  const isAuthor = question?.userId === user?.id;

  const [showDialog, setShowDialog] = useState(false);
  const queryClient = useQueryClient();
  const questionId = question?.id;

  const { mutate, isPending } = useMutation({
    mutationFn: () => updateStatus(questionId, "COLSE"),
    onSuccess: () => {
      queryClient.invalidateQueries(["question", questionId]);
      setShowDialog(false);
    },
    onError: (error) => {
      const message =
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        "Something went wrong";

      toast.error(message);
      setShowDialog(false);
    },
  });

  return (
    <>
      <Card className="p-8 bg-white shadow-sm border border-gray-200">
        <div className="flex justify-between items-start">
          <h1 className="text-3xl font-bold text-gray-900 leading-tight">
            {question?.title}
          </h1>
        </div>

        <RichTextEditor content={question?.description} readOnly />

        <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
          <div className="flex items-center">
            <span className="font-medium text-gray-700">
              Asked by {question?.user.name}
            </span>
            <span className="mx-2">•</span>
            <span>{timeAgo(question?.createdAt)}</span>
            <span className="mx-2">•</span>
            <Badge
              variant={question?.status === "OPEN" ? "default" : "secondary"}
              className={`cursor-pointer ${
                question?.status === "OPEN"
                  ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
                  : "bg-gray-100 text-gray-800 border-gray-200"
              }`}
              onClick={() =>
                isAuthor && question.status === "OPEN" && setShowDialog(true)
              }
            >
              {question?.status === "OPEN" ? "Open" : "Closed"}
            </Badge>
          </div>
          <div className="flex items-center gap-2">
            <MessageSquare className="w-4 h-4 mr-1" />
            <span>
              {question?._count?.discussions}{" "}
              {question?._count?.discussions === 1 ? "Answer" : "Answers"}
            </span>
          </div>
        </div>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Close this Question?</DialogTitle>
          </DialogHeader>
          <p className="text-sm text-gray-500">
            Once closed, this question cannot be reopened. Are you sure?
          </p>
          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button variant="outline" onClick={() => setShowDialog(false)}>
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={() => mutate()}
              disabled={isPending}
            >
              {isPending ? "Closing..." : "Confirm Close"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default QuestionSection;
