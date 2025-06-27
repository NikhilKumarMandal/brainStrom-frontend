import React from "react";
import { Card } from "@/components/ui/card";
import { MessageSquare } from "lucide-react";

const QuestionSection = ({ question }) => {
  return (
    <Card className="p-8 bg-white shadow-sm border border-gray-200">
      <div className="flex justify-between items-start mb-4">
        <h1 className="text-3xl font-bold text-gray-900 leading-tight">
          {question.title}
        </h1>
      </div>

      <p className="text-gray-700 text-lg leading-relaxed mb-6">
        {question.description}
      </p>

      <div className="flex items-center justify-between text-sm text-gray-500 pt-4 border-t border-gray-100">
        <div className="flex items-center">
          <span className="font-medium text-gray-700">
            Asked by {question.author}
          </span>
          <span className="mx-2">•</span>
          <span>{question.timestamp}</span>
        </div>
        <div className="flex items-center">
          <MessageSquare className="w-4 h-4 mr-1" />
          <span>4 answers</span>
        </div>
      </div>
    </Card>
  );
};

export default QuestionSection;
