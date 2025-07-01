import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";
import { timeAgo } from "@/utils/formateTime";
import RichTextEditor from "./RichTextEditor";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useAuthStore } from "@/store/store";
import { toast } from "sonner";
import { vote } from "@/http/api";

const DiscussionItem = ({ discussion }) => {
  const queryClient = useQueryClient();
  const { user } = useAuthStore();

  const userVoteObj = discussion.votes?.find((v) => v.userId === user.id);
  const userVote = userVoteObj?.type;

  const { mutate: castVote, isPending: voting } = useMutation({
    mutationFn: ({ id, type }) => vote(id, type),
    onSuccess: () =>
      queryClient.invalidateQueries(["discussions", discussion.ticketId]),
    onError: (error) => {
      const message =
        error?.response?.data?.errors?.[0]?.message ||
        error?.response?.data?.errors?.[0]?.msg ||
        "Something went wrong";

      toast.error(message);
    },
  });

  const handleVote = (type) => {
    if (!voting) castVote({ id: discussion.id, type });
  };

  const score = discussion.upvotes - discussion.downvotes;

  return (
    <Card className="p-6 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center space-y-2 min-w-[50px]">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote("UPVOTE")}
            className={`p-2 rounded-full hover:bg-green-50 ${
              userVote === "UPVOTE"
                ? "bg-green-100 text-green-600"
                : "text-gray-500 hover:text-green-600"
            }`}
          >
            <ArrowUp className="w-5 h-5" />
          </Button>

          <span
            className={`font-bold text-lg ${
              score > 0
                ? "text-green-600"
                : score < 0
                  ? "text-red-500"
                  : "text-gray-600"
            }`}
          >
            {score}
          </span>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleVote("DOWNVOTE")}
            className={`p-2 rounded-full hover:bg-red-50 ${
              userVote === "DOWNVOTE"
                ? "bg-red-100 text-red-600"
                : "text-gray-500 hover:text-red-600"
            }`}
          >
            <ArrowDown className="w-5 h-5" />
          </Button>
        </div>

        <div className="flex-1">
          <div className="flex justify-between items-start mb-3">
            <div className="flex items-center text-sm text-gray-600">
              <span className="font-medium text-gray-900">
                {discussion.user.name}
              </span>
              <span className="mx-2">•</span>
              <span>{timeAgo(discussion.createdAt)}</span>
            </div>
          </div>

          <RichTextEditor content={discussion.content} readOnly />
        </div>
      </div>
    </Card>
  );
};

export default DiscussionItem;
