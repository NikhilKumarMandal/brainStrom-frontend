import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import QuestionSection from "../components/QuestionSection";
import DiscussionItem from "../components/DiscussionItem";
import AddAnswerModel from "../components/AddAnswerModel";

function DiscussionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const questionData = {
    title: "How to implement efficient state management in React applications?",
    description:
      "I'm working on a large React application and struggling with state management. Currently using useState and useContext, but wondering if I should switch to Redux or Zustand. What are the best practices for managing complex state across multiple components?",
    author: "Sarah Johnson",
    timestamp: "2 hours ago",
    tags: ["React", "State Management", "Redux", "Performance"],
  };

  const discussions = [
    {
      id: 1,
      author: "Alex Chen",
      content:
        "For large applications, I'd recommend Zustand over Redux. It has a much simpler API and less boilerplate code. Here's a basic example of how you can structure your stores...",
      timestamp: "1 hour ago",
      upvotes: 12,
      downvotes: 2,
      replies: 3,
    },
    {
      id: 2,
      author: "Maria Rodriguez",
      content:
        "I've been using Redux Toolkit for years and it's fantastic. The learning curve is steeper than Zustand, but for complex applications with time-travel debugging needs, it's unmatched. The DevTools extension is invaluable for debugging.",
      timestamp: "45 minutes ago",
      upvotes: 8,
      downvotes: 1,
      replies: 1,
    },
    {
      id: 3,
      author: "David Kim",
      content:
        "Don't overlook the built-in React solutions! useReducer combined with Context can handle most use cases without external dependencies. Start simple and only add complexity when you actually need it.",
      timestamp: "30 minutes ago",
      upvotes: 15,
      downvotes: 0,
      replies: 2,
    },
    {
      id: 4,
      author: "Emily Thompson",
      content:
        "Has anyone tried Jotai? It's an atomic approach to state management that works really well for component-level state that needs to be shared. Much lighter than Redux for smaller state pieces.",
      timestamp: "15 minutes ago",
      upvotes: 6,
      downvotes: 1,
      replies: 0,
    },
  ];
  return (
    <>
      <div className="max-w-4xl mx-auto px-4 py-8">
        <QuestionSection question={questionData} />

        <div className="mt-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">
              Discussions ({discussions.length})
            </h2>
            <Button
              className="bg-blue-600 hover:bg-blue-700"
              onClick={() => setIsModalOpen(true)}
            >
              Add Your Answer
            </Button>
          </div>

          <div className="space-y-4">
            {discussions.map((discussion) => (
              <DiscussionItem key={discussion.id} discussion={discussion} />
            ))}
          </div>
        </div>
      </div>

      <AddAnswerModel
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}

export default DiscussionPage;
