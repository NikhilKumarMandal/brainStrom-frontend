import React, { useEffect, useState } from "react";
import { QuestionFilters } from "../components/QuestionFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { QuestionsCard } from "../components/QuestionsCard";
import { getAllTicket } from "@/http/api";
import { useQuery } from "@tanstack/react-query";
import { AskQuestionModal } from "../components/AskQuestionModal";

const mockQuestions = [
  {
    id: "1",
    title: "How to implement React hooks effectively?",
    totalAnswers: 12,
    isOpen: true,
    isPinned: true,
    courseName: "Advanced React Development",
    askedBy: "John Doe",
    createdAt: "2024-01-15",
  },
  {
    id: "2",
    title: "Best practices for TypeScript configuration",
    totalAnswers: 8,
    isOpen: true,
    isPinned: false,
    courseName: "TypeScript Fundamentals",
    askedBy: "Jane Smith",
    createdAt: "2024-01-14",
  },
  {
    id: "3",
    title: "Database optimization techniques for large datasets",
    totalAnswers: 15,
    isOpen: false,
    isPinned: true,
    courseName: "Database Management",
    askedBy: "Mike Johnson",
    createdAt: "2024-01-13",
  },
  {
    id: "4",
    title: "CSS Grid vs Flexbox - when to use what?",
    totalAnswers: 6,
    isOpen: true,
    isPinned: false,
    courseName: "Modern CSS Techniques",
    askedBy: "Sarah Wilson",
    createdAt: "2024-01-12",
  },
  {
    id: "5",
    title: "API security best practices",
    totalAnswers: 9,
    isOpen: true,
    isPinned: false,
    courseName: "Backend Development",
    askedBy: "Alex Brown",
    createdAt: "2024-01-11",
  },
  {
    id: "6",
    title: "State management patterns in React",
    totalAnswers: 18,
    isOpen: false,
    isPinned: true,
    courseName: "Advanced React Development",
    askedBy: "Emily Davis",
    createdAt: "2024-01-10",
  },
];

const getAllTickets = async () => {
  const { data } = await getAllTicket();
  console.log(data.data);
  return data.data;
};

const TicketPage = () => {
  const [selectedCourse, setSelectedCourse] = useState("");
  const [pinFilter, setPinFilter] = useState("all");
  const [isModalOpen, setIsModalOpen] = useState(false);

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
      <div className="flex flex-col items-center justify-center gap-2 text-xl text-white m-auto h-screen">
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
              <QuestionsCard key={question.id} question={question} />
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
