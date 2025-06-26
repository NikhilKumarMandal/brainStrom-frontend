import { useState } from "react";
import Header from "../components/Header";
import QuestionList from "../components/QuestionList";
import FilterOptions from "../components/FilterOptions";

export default function HomePage() {
  const [filter, setFilter] = useState("");
  const [sortBy, setSortBy] = useState("");

  return (
    <div className="flex flex-col h-screen w-[80%] pt-2 gap-4 mx-auto bg-gray-900 text-white">
      <Header />
      <FilterOptions
        filter={filter}
        setFilter={setFilter}
        sortBy={sortBy}
        setSortBy={setSortBy}
      />

      {/* Scrollable QuestionList container */}
      <div className="flex-1 overflow-y-auto">
        <QuestionList filter={filter} sortBy={sortBy} />
      </div>
    </div>
  );
}
