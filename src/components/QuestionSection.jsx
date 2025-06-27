import React from "react";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";
import { timeAgo } from "@/utils/formateTime";
import RichTextEditor from "./RichTextEditor";

const QuestionSection = ({ question }) => {
  return (
    <Card className="p-8 bg-white shadow-sm border border-gray-200">
      <div className="flex justify-between items-start">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          {question.title}
        </h1>
      </div>


      <RichTextEditor content={question.description} readOnly  />

      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
        <div className="flex items-center">
          <span className="font-medium text-gray-700">
            Asked by {question.user.name}
          </span>
          <span className="mx-2">•</span>
          <span>{timeAgo(question.createdAt)}</span>
        </div>
        <div className="flex items-center">
          <MessageSquare className="w-4 h-4 mr-1" />
          <span>{question._count.discussions} {question._count.discussions === 1 ? "Answer" : "Answers"}</span>
        </div>
      </div>
    </Card>
  );
};

export default QuestionSection;
