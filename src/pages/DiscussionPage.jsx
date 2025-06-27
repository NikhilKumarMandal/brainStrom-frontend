import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import QuestionSection from "../components/QuestionSection";
import DiscussionItem from "../components/DiscussionItem";
import AddAnswerModel from "../components/AddAnswerModel";
import { getTicketById, getTopDiscussion } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

async function getQuestion(discussionId) {
  const data = await getTicketById(discussionId).then((res) => res.data);
  console.log(data.data);
  return data.data;
}

async function getDiscussions(discussionId) {
  const data = await getTopDiscussion(discussionId).then((res) => res.data);
  console.log(data.data);
  return data.data;
}

function DiscussionPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { discussionId } = useParams();

  const {
    data: questionData,
    isLoading: ticketLoading,
    isError: ticketError,
  } = useQuery({
    queryKey: ["ticket", discussionId],
    queryFn: () => getQuestion(discussionId),
    enabled: !!discussionId,
  });

  const {
    data: discussions,
    isLoading: discussionLoading,
    isError: discussionError,
  } = useQuery({
    queryKey: ["topDiscussion", discussionId],
    queryFn: () => getDiscussions(discussionId),
    enabled: !!discussionId,
  });

  if (ticketLoading || discussionLoading) return (
    <div className="flex flex-col items-center justify-center gap-2 text-xl text-black m-auto h-screen">
      <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
      Loading...
    </div>
  );

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
        id={discussionId}
      />
    </>
  );
}

export default DiscussionPage;
