import React, { useState } from "react";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUp, ArrowDown } from "lucide-react";

const DiscussionItem = ({ discussion }) => {
  const [upvotes, setUpvotes] = useState(discussion.upvotes);
  const [downvotes, setDownvotes] = useState(discussion.downvotes);
  const [userVote, setUserVote] = useState(null);

  const handleUpvote = () => {
    if (userVote === "up") {
      setUpvotes((prev) => prev - 1);
      setUserVote(null);
    } else {
      if (userVote === "down") {
        setDownvotes((prev) => prev - 1);
      }
      setUpvotes((prev) => prev + 1);
      setUserVote("up");
    }
  };

  const handleDownvote = () => {
    if (userVote === "down") {
      setDownvotes((prev) => prev - 1);
      setUserVote(null);
    } else {
      if (userVote === "up") {
        setUpvotes((prev) => prev - 1);
      }
      setDownvotes((prev) => prev + 1);
      setUserVote("down");
    }
  };

  const score = upvotes - downvotes;

  return (
    <Card className="p-6 bg-white shadow-sm border border-gray-200 hover:shadow-md transition-shadow duration-200">
      <div className="flex gap-4">
        {/* Vote Section */}
        <div className="flex flex-col items-center space-y-2 min-w-[50px]">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleUpvote}
            className={`p-2 rounded-full hover:bg-green-50 ${
              userVote === "up"
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
            onClick={handleDownvote}
            className={`p-2 rounded-full hover:bg-red-50 ${
              userVote === "down"
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
                {discussion.author}
              </span>
              <span className="mx-2">•</span>
              <span>{discussion.timestamp}</span>
            </div>
          </div>

          <p className="text-gray-800 leading-relaxed mb-4">
            {discussion.content}
          </p>
        </div>
      </div>
    </Card>
  );
};

export default DiscussionItem;
