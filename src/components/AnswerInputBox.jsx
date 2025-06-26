import React, { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createDiscussion } from "../http/api";
import RichTextEditor from "./RichTextEditor";

export default function AnswerInputBox({ id }) {
  const [answer, setAnswer] = useState("");
  const queryClient = useQueryClient();

  const { mutate, isPending } = useMutation({
    mutationFn: (formData) => createDiscussion(formData),
    onSuccess: () => {
      setAnswer("");
      queryClient.invalidateQueries(["discussions", id]);
    },
    onError: () => {
      alert("Failed to submit answer");
    },
  });

  const onSubmit = () => {
    if (!answer.trim()) return alert("Answer is empty");
    mutate({ ticketId: id, content: answer });
  };

  return (
    <div className="flex flex-col gap-2 p-6">
      <RichTextEditor content={answer} onChange={setAnswer} />
      <button
        onClick={onSubmit}
        disabled={isPending}
        className="self-end bg-amber-900 text-white rounded-full px-6 py-2 mt-2 hover:bg-amber-800 hover:border-none transition disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {isPending ? "Submitting..." : "Submit"}
      </button>
    </div>
  );
}
