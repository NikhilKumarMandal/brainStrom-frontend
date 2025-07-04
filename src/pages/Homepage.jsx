import React, { useEffect, useState } from "react";
import { QuestionFilters } from "../components/QuestionFilters";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { QuestionsCard } from "../components/QuestionsCard";
import { AllTickets } from "../http/api";
import { useQuery } from "@tanstack/react-query";
import { AskQuestionModal } from "../components/AskQuestionModal";
import useNavigation from "@/utils/navigation";
import { ChevronRight, ChevronLeft } from "lucide-react";
import { useSearchParams } from "react-router-dom";
import { useAuthStore } from "../store/store";

const LIMIT = 10;

const HomePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { gotoDiscussion } = useNavigation();
  const [searchParams, setSearchParams] = useSearchParams();
  const [queryParams, setQueryParams] = useState({
    limit: LIMIT,
    page: 1,
  });
  const { user } = useAuthStore();

  const course = searchParams.get("course") || "";

  useEffect(() => {
    const onlyCourse = user?.enrolledCourses?.[0]?.course?.name;
    if (user?.enrolledCourses?.length === 1 && !searchParams.get("course")) {
      setSearchParams((prev) => {
        prev.set("course", onlyCourse);
        return prev;
      });
    }
  }, [user, searchParams, setSearchParams]);

  const {
    data: questionsData,
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["tickets", queryParams, course],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter(([, val]) => !!val)
      );

      const queryString = new URLSearchParams(filteredParams).toString();
      const filters = {
        queryParams: queryString,
        course,
      };

      return AllTickets(filters).then((res) => res.data);
    },
  });

  const tickets = questionsData?.data?.tickets || [];
  const totalPages = questionsData?.data?.totalPages || 1;

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

        {/* Filters */}
        <QuestionFilters
          courses={user?.enrolledCourses?.map((c) => c.course.name)}
          selectedCourse={course}
          onCourseChange={(value) => {
            if (value) {
              searchParams.set("course", value);
            } else {
              searchParams.delete("course");
            }
            setSearchParams(searchParams);
            setQueryParams((prev) => ({ ...prev, page: 1 }));
          }}
        />

        {/* Questions List */}
        <div className="space-y-4 mt-6">
          {isLoading ? (
            <div className="flex justify-center py-12">
              <div className="w-12 h-12 border-4 border-gray-400 border-t-transparent rounded-full animate-spin" />
            </div>
          ) : tickets?.length > 0 ? (
            tickets?.map((question) => (
              <QuestionsCard
                key={question?.id}
                question={question}
                gotoDiscussion={gotoDiscussion}
              />
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

        {/* Pagination */}
        {tickets?.length > 0 && (
          <div className="flex justify-center items-center gap-4 pt-8">
            <Button
              size="icon"
              variant="outline"
              disabled={queryParams.page === 1}
              onClick={() =>
                setQueryParams((prev) => ({
                  ...prev,
                  page: prev.page - 1,
                }))
              }
              className="rounded-full p-3"
            >
              <ChevronLeft className="h-5 w-5" />
            </Button>

            <span className="px-4 py-2 rounded-full bg-primary text-white font-medium shadow-md text-sm">
              Page {queryParams?.page} of {totalPages}
            </span>

            <Button
              size="icon"
              variant="outline"
              disabled={queryParams.page === totalPages}
              onClick={() =>
                setQueryParams((prev) => ({
                  ...prev,
                  page: prev.page + 1,
                }))
              }
              className="rounded-full p-3"
            >
              <ChevronRight className="h-5 w-5" />
            </Button>
          </div>
        )}
      </div>

      {/* Ask Question Modal */}
      <AskQuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetchQuestions={refetch}
      />
    </div>
  );
};

export default HomePage;
