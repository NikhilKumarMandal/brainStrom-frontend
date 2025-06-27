import React, { useEffect, useState } from "react";
import { QuestionFilters } from "../components/QuestionFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { QuestionsCard } from "../components/QuestionsCard";
import { getAllTicket } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { AskQuestionModal } from "../components/AskQuestionModal";
import useNavigation from "@/utils/navigation";

const getAllTickets = async () => {
  const { data } = await getAllTicket();
  return data.data;
};

const TicketPage = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [pinFilter, setPinFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { gotoDiscussion } = useNavigation();

  const {
    data: questions,
    isLoading: isQuestionsLoading,
    refetch: refetchQuestions,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: getAllTickets,
  });

  const [filteredQuestions, setFilteredQuestions] = useState([]);

  useEffect(() => {
    if (questions) {
      setFilteredQuestions(questions);
    }
  }, [questions]);

  const courses = Array.from(new Set(questions?.map((q) => q.courses)));

  const handleFilter = (course, pin) => {
    let filtered = questions;

    if (course) {
      filtered = filtered.filter((q) => q.courseName === course);
    }

    if (pin === "pinned") {
      filtered = filtered.filter((q) => q.isPinned);
    } else if (pin === "unpinned") {
      filtered = filtered.filter((q) => !q.isPinned);
    }

    setFilteredQuestions(filtered);
    setSelectedCourse(course);
    setPinFilter(pin);
  };

  if (isQuestionsLoading) {
    return (
      <div className="flex flex-col items-center justify-center gap-2 text-xl text-black m-auto h-screen">
        <div className="w-16 h-16 border-4 border-gray-500 border-t-transparent rounded-full animate-spin" />
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Questions</h1>
            <p className="text-gray-600">
              Manage and explore student questions across all courses
            </p>
          </div>
          <Button
            className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus className="w-4 h-4 mr-2" />
            Ask Question
          </Button>
        </div>

        <QuestionFilters
          courses={courses}
          selectedCourse={selectedCourse}
          pinFilter={pinFilter}
          onFilter={handleFilter}
        />

        <div className="space-y-4">
          {filteredQuestions.length > 0 ? (
            filteredQuestions.map((question) => (
              <QuestionsCard key={question.id} question={question} gotoDiscussion={gotoDiscussion} />
            ))
          ) : (
            <div className="text-center py-12 bg-white rounded-xl border border-gray-200">
              <div className="text-gray-400 text-lg mb-2">
                No questions found
              </div>
              <div className="text-gray-500">
                Try adjusting your filters or ask a new question
              </div>
            </div>
          )}
        </div>
      </div>
      <AskQuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetchQuestions={refetchQuestions}
      />
    </div>
  );
};

export default TicketPage;
