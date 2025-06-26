import React from "react";
import { useQuery } from "@tanstack/react-query";
import { getAllTicket } from "../http/api";
import useNavigation from "../utils/navigation";
import { Chip, StatusChip } from "./Chip";

const getAllTickets = async () => {
  const { data } = await getAllTicket();
  return data;
};

export default function QuestionList() {
  const { data: allTickets, isLoading } = useQuery({
    queryKey: ["tickets"],
    queryFn: getAllTickets,
  });

  if (isLoading)
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-xl text-white m-auto h-screen">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
        Loading...
      </div>
    );

  const data = allTickets.data;

  return (
    <div className="w-[90%] px-6 py-4 mb-8 rounded-3xl bg-gray-800 shadow-lg text-white max-w-5xl mx-auto">
      {data.map((q, i) => (
        <div key={q.id}>
          <EachQuestion q={q} i={i} questionsLength={data.length} />
          {i < data.length - 1 && (
            <div className="border-t border-gray-700"></div>
          )}
        </div>
      ))}
    </div>
  );
}

function EachQuestion({ q, i, questionsLength }) {
  const { gotoProblemPage } = useNavigation();
  const isOpen = q.status === "OPEN";

  return (
    <div
      onClick={() => gotoProblemPage(q.id)}
      className="py-4 px-2 cursor-pointer flex justify-between items-center gap-4 transition-all"
    >
      {/* Left Side: Title + Discussion count */}
      <div>
        <div className="font-medium text-gray-300 text-white">{q.title}</div>
        <div className="text-sm text-gray-400">
          {q._count.discussions} answers
        </div>
      </div>

      {/* Right Side: Chips */}
      <div className="flex flex-col items-end space-y-2">
        <StatusChip
          label={isOpen ? "Open" : "Closed"}
          colorClass={isOpen ? "text-green-400" : "text-red-500"}
          borderClass={isOpen ? "border-green-400" : "border-red-500"}
        />
        <Chip tag={q.courses} />
      </div>
    </div>
  );
}
