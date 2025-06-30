import { AskQuestionModal } from '@/components/AskQuestionModal';
import { QuestionsCard } from '@/components/QuestionsCard';
import { Button } from '@/components/ui/button';
import { getUserTicket } from '@/http/api'
import useNavigation from '@/utils/navigation';
import { useQuery } from '@tanstack/react-query';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import React, { useState } from 'react'

const LIMIT = 10

export default function UserTickets() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { gotoDiscussion } = useNavigation();
  const [queryParams, setQueryParams] = useState({
    limit: LIMIT,
    page: 1,
  });

  const {
    data: questions,
    isLoading: userTicketsLoading,
    refetch,
  } = useQuery({
    queryKey: ["tickets", queryParams],
    queryFn: () => {
      const filteredParams = Object.fromEntries(
        Object.entries(queryParams).filter((item) => !!item[1])
      );

      const queryString = new URLSearchParams(filteredParams).toString();
      const filters = {
        queryParams: queryString,
      };

      return getUserTicket(filters).then((res) => res.data);
    },
  });

  if (userTicketsLoading) return null;
  const tickets = questions?.data;
  const totalPages = questions?.data?.totalPages;

  return (
    <div>
      <div>
        <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Questions</h1>
            <p className="text-gray-600">
              View and manage all your asked questions in one place
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


        {/* Questions List */}
        <div className="space-y-4">
          {tickets?.length > 0 ? (
            tickets?.map((question) => (
              <QuestionsCard
                key={question.id}
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
        <div className="flex justify-center items-center gap-4 pt-6">
          <Button
            size="icon"
            variant="outline"
            disabled={queryParams.page === 1}
            onClick={() =>
              setQueryParams((prev) => ({ ...prev, page: prev.page - 1 }))
            }
            className="rounded-full p-3"
          >
            <ChevronLeft className="h-5 w-5" />
          </Button>

          <span className="px-4 py-2 rounded-full bg-primary text-white font-medium shadow-md text-sm">
            Page {queryParams.page} of {totalPages}
          </span>

          <Button
            size="icon"
            variant="outline"
            disabled={queryParams.page === totalPages}
            onClick={() =>
              setQueryParams((prev) => ({ ...prev, page: prev.page + 1 }))
            }
            className="rounded-full p-3"
          >
            <ChevronRight className="h-5 w-5" />
          </Button>
        </div>

      </div>

      {/* Ask Question Modal */}
      <AskQuestionModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        refetchQuestions={refetch}
      />

    </div>
  )
}
