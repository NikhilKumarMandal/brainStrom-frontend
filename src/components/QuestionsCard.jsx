import React from "react";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { MessageCircle, Pin, User, Calendar } from "lucide-react";

export const QuestionsCard = ({ question }) => {
  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  };

  return (
    <Card className="p-6 hover:shadow-md transition-all duration-200 border border-gray-200 bg-white">
      <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
        <div className="flex-1 space-y-3">
          <div className="flex items-start gap-3">
            {question.isPinned && (
              <Pin
                className="w-4 h-4 text-orange-500 mt-1 flex-shrink-0"
                fill="currentColor"
              />
            )}
            <h3 className="text-lg font-semibold text-gray-900 hover:text-blue-600 cursor-pointer transition-colors">
              {question.title}
            </h3>
          </div>

          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-600">
            <div className="flex items-center gap-1">
              <User className="w-4 h-4" />
              <span>{question.askedBy}</span>
            </div>
            <div className="flex items-center gap-1">
              <Calendar className="w-4 h-4" />
              <span>{formatDate(question.createdAt)}</span>
            </div>
          </div>

          <div>
            <Badge
              variant="outline"
              className="bg-blue-50 text-blue-700 border-blue-200"
            >
              {question.courses}
            </Badge>
          </div>
        </div>

        <div className="flex flex-col lg:flex-row items-start lg:items-center gap-4">
          <div className="flex items-center gap-2 bg-gray-50 rounded-lg px-3 py-2">
            <MessageCircle className="w-4 h-4 text-gray-600" />
            <span className="font-medium text-gray-900">
              {question._count.discussions}
            </span>
            <span className="text-sm text-gray-600">
              {question._count.discussions === 1 ? "Answer" : "Answers"}
            </span>
          </div>

          <Badge
            variant={question.isOpen ? "default" : "secondary"}
            className={
              question.isOpen
                ? "bg-green-100 text-green-800 border-green-200 hover:bg-green-200"
                : "bg-gray-100 text-gray-800 border-gray-200"
            }
          >
            {question.isOpen ? "Open" : "Closed"}
          </Badge>

          <Button
            variant="outline"
            size="sm"
            className="hover:bg-blue-50 hover:border-blue-300"
          >
            View Details
          </Button>
        </div>
      </div>
    </Card>
  );
};
