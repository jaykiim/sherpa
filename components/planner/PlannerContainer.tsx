import React, { useState } from "react";

// components
import { Subheading, WeekPicker, DayCardContainer } from "../";

// types
import { Project } from "../../types";

const today = new Date();

interface Props {
  project: Project;
}

const PlannerContainer = ({ project }: Props) => {
  //
  // * 선택된 날짜 ------------------------------------------------------------------------------------------------------------------------------------------------

  const defaultDate =
    today > new Date(project.end) || today < new Date(project.start)
      ? new Date(project.start)
      : today;

  const [selectedDate, setSelectedDate] = useState(defaultDate);

  // * 일간/주간 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 일간, 주간 뷰
  const [view, setView] = useState<"week" | "day">("day");

  return (
    <section>
      <Subheading title="planner" />

      <div className="mt-2 flex items-center justify-between gap-x-5">
        {project && (
          <WeekPicker
            start={project.start}
            end={project.end}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
          />
        )}

        {/*  */}
        {/* TODO 일간 주간 뷰 */}

        <div className="flex items-center text-gray-400 text-sm sm:text-[16px]">
          <span
            className={`cursor-pointer ${
              view === "day" && "text-red-600 font-bold"
            }`}
            onClick={() => setView("day")}
          >
            일간
          </span>

          <div className="w-0 h-3 mx-2 border" />

          <span
            className={`cursor-pointer ${
              view === "week" && "text-red-600 font-bold"
            }`}
            onClick={() => setView("week")}
          >
            주간
          </span>
        </div>
      </div>

      <div className="max-w-[100vw]">
        {project && (
          <DayCardContainer
            project={project}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            view={view}
          />
        )}
      </div>
    </section>
  );
};

export default PlannerContainer;
