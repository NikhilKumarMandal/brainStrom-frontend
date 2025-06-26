import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { getTicketById, getTopDiscussion } from "../http/api";
import { IoWarningOutline } from "react-icons/io5";
import QuestionCard from "../components/QuestionCard";
import QuestionMetaData from "../components/QuestionMetaData";
import AnswerInputBox from "../components/AnswerInputBox";
import AnswerCard from "../components/AnswerCard";

export default function ProblemPage() {
  const { id } = useParams();

  const {
    data: ticket,
    isLoading: ticketLoading,
    isError: ticketError,
  } = useQuery({
    queryKey: ["ticket", id],
    queryFn: () => getTicketById(id),
    enabled: !!id,
  });

  const {
    data: topDiscussion,
    isLoading: discussionLoading,
    isError: discussionError,
  } = useQuery({
    queryKey: ["topDiscussion", id],
    queryFn: () => getTopDiscussion(id),
    enabled: !!id,
  });

  if (ticketLoading || discussionLoading) {
    return (
      <div className="flex flex-col w-full items-center justify-center text-gray-400 mt-10 gap-3">
        <div className="w-12 h-12 border-4 border-cyan-400 border-t-transparent rounded-full animate-spin" />
        <p className="text-lg">Loading...</p>
      </div>
    );
  }

  if (ticketError || discussionError) {
    return (
      <div className="flex flex-col items-center justify-center text-red-400 mt-10 gap-3 text-xl">
        <IoWarningOutline className="text-6xl" />
        <p>Something went wrong</p>
      </div>
    );
  }

  const data = ticket?.data?.data;
  const answersData = topDiscussion?.data?.data || [];

  return (
    <div className="w-full flex flex-col gap-6 py-8 px-6 overflow-auto text-gray-300 bg-gray-900">
      <QuestionCard
        title={data.title}
        description={data.description}
        courses={data.courses}
      />
      <QuestionMetaData
        author={data.author}
        answers={data._count.discussions}
        createdAt={data.createdAt}
        isOpen={data.isOpen}
      />

      <AnswerInputBox id={id} />

      <div className="mb-6 mx-6 border-t border-gray-700" />

      <div className="flex flex-col gap-4">
        {answersData.map((answer) => (
          <AnswerCard key={answer.id} answer={answer} />
        ))}
      </div>
    </div>
  );
}
