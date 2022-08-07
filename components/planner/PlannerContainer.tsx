import React, { useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import { Subheading, WeekPicker, DayCardContainer } from "../";

// hooks
import { useGetProjectQuery } from "../../apiSlice";

const today = new Date();

const PlannerContainer = () => {
  //
  // * project 정보 패치 ------------------------------------------------------------------------------------------------------------------------------------------------

  const { id: projectId } = useRouter().query;
  const { data: project } = useGetProjectQuery(projectId as string);

  // * week picker ------------------------------------------------------------------------------------------------------------------------------------------------

  // 선택된 날짜
  const [selectedDate, setSelectedDate] = useState(today);

  // 기본적으로 오늘 날짜의 플래너를 보여주고, 만약 종료된 프로젝트면 프로젝트 시작일의 날짜를 기본값을 함
  useEffect(() => {
    if (project) {
      const defaultDate =
        today > new Date(project.end) ? new Date(project.start) : today;
      setSelectedDate(defaultDate);
    }
  }, [project]);

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

      {project && (
        <DayCardContainer
          project={project}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          view={view}
        />
      )}
    </section>
  );
};

export default PlannerContainer;
