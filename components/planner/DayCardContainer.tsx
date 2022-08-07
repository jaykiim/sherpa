import { nanoid } from "@reduxjs/toolkit";
import React, { useEffect, useRef } from "react";
import { useGetPlannersQuery } from "../../apiSlice";
import { Project } from "../../types";
import { moment } from "../../utils";
import DayCard from "./DayCard";

interface Props {
  project: Project;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  view: "day" | "week";
}

const DayCardContainer = ({
  project,
  selectedDate,
  setSelectedDate,
  view,
}: Props) => {
  //
  // 주간 뷰일 때 필요한 정보
  const { calendarByWeek, weekNum } = moment.projectCalendar(
    selectedDate,
    project.start,
    project.end
  );

  // * 스크롤 이동 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const scrollDestRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollDestRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [scrollDestRef, view]);

  // * 날짜 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 현재 주
  const currentWeek = calendarByWeek[weekNum];

  // 클릭 날짜 분해
  const { year, month } = moment.dateMap(selectedDate);

  // 현재 주의 모든 날짜를 localeDateString 으로 바꿈
  const currentWeekDatestrs = currentWeek
    .filter((date) => typeof date !== "string")
    .map((date) => {
      const dateInstance = new Date(year, month - 1, date as number);
      return dateInstance.toLocaleDateString();
    });

  // currentWeek 을 localeDateString 배열로 바꾼다
  // project.planners 에서 currentWeek 에 포함된 모든 날짜의 id 를 가져온다

  // * planner 데이터 패치 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 클릭 일자 플래너 아이디 목록
  const selectedDatePlannerIds: string[] = [];
  currentWeekDatestrs.forEach((date) => {
    if (project.planners[date])
      selectedDatePlannerIds.push(...project.planners[date]);
  });

  // 플래너 아이디 목록 직렬화
  const plannerIdlistStr = JSON.stringify(selectedDatePlannerIds || ["-1"]);

  const { data: planner } = useGetPlannersQuery(plannerIdlistStr);

  // * ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 현재 선택된 주 (빈칸 없음)
  const currentWeekWithoutBlank = currentWeek.filter(
    (day) => day !== ""
  ) as number[];

  // 현재 선택된 날짜 인덱스
  const idx = currentWeekWithoutBlank.findIndex(
    (date) => date === selectedDate.getDate()
  );

  return (
    <div className="flex overflow-x-scroll sm:max-w-[calc(100vw_-_250px)]">
      {planner &&
        (view === "week" ? (
          currentWeekWithoutBlank.map((date, i) => (
            <DayCard
              key={i}
              date={date}
              selectedDate={selectedDate}
              scrollDestRef={scrollDestRef}
              planner={planner}
            />
          ))
        ) : (
          <DayCard
            date={currentWeekWithoutBlank[idx]}
            selectedDate={selectedDate}
            setSelectedDate={setSelectedDate}
            currentWeek={currentWeekWithoutBlank}
            planner={planner}
          />
        ))}
    </div>
  );
};

export default DayCardContainer;
