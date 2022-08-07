import React, { useEffect, useState } from "react";
import { moment } from "../../../utils";

// components
import { Subheading, DatePicker, WeekPicker, RecordContainer } from "../../";

// hooks
import { useGetRecordsQuery } from "../../../apiSlice";

// types
import { Project, Task } from "../../../types";

// styles
import { ClockIcon } from "@heroicons/react/outline";

interface Props {
  project: Project;
  tasks: Task[];
}

const today = new Date();

const TimerContainer = ({ project, tasks }: Props) => {
  //
  // * WeekPicker ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 프로젝트 기간
  const { start, end } = project;

  // 종료된 (또는 아직 시작 안한) 프로젝트인지?
  const isClosed = today > new Date(end) || today < new Date(start);

  // 클릭 날짜 기본값
  const defaultDate = isClosed ? new Date(project.start) : today;

  // 클릭 날짜
  const [selectedDate, setSelectedDate] = useState(defaultDate);

  // * DatePicker ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 클릭 날짜 프로젝트 달력 및 주 번호
  const { calendarByWeek, weekNum } = moment.projectCalendar(
    selectedDate,
    start,
    end
  );

  // 클릭 날짜 속한 주 날짜 목록
  const currentWeek = calendarByWeek[weekNum].filter(
    (date) => typeof date !== "string"
  ) as number[];

  // * 선택 날짜 ---> 모든 task의 records 패치 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 현재 kr 에 등록된 task ---> 선택 날짜의 record id 목록
  const clickedDateRecordIds: string[] = [];

  tasks.forEach((task) => {
    //
    // 현재 kr --> 등록된 태스크 중 하나의 record 객체
    const records = task.records;

    // 그 중 클릭 날짜의 record 배열
    const selectedDateRecords = records[selectedDate.toLocaleDateString()];

    // 클릭 날짜에 record 배열 존재하면
    selectedDateRecords && clickedDateRecordIds.push(...selectedDateRecords);
  });

  // 선택 날짜에 record 가 없을수도 있으므로
  const recordIds = JSON.stringify(clickedDateRecordIds || ["-1"]);

  const { data: records } = useGetRecordsQuery(recordIds);

  // * 선택 날짜 ---> 모든 records 시간 합계 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const [totalTime, setTotalTime] = useState("00:00:00");

  useEffect(() => {
    if (records) {
      //
      // 모든 레코드 시간 배열
      const times: string[] = [];
      records.forEach((record) => times.push(record.time));

      const timesum = moment.timeSum(times);
      setTotalTime(timesum);
    }
  }, [records]);

  return (
    <div className="mt-7">
      <Subheading title="timer" />

      <div className="mt-2 flex items-center">
        <WeekPicker
          start={start}
          end={end}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />

        <div
          onClick={() => !isClosed && setSelectedDate(today)}
          className="ml-4 w-8 h-8 center-xy group hoverAnimation lg:p-0"
        >
          <ClockIcon className="w-6 h-6 text-gray-300 group-hover:text-gray-600" />
        </div>
      </div>

      <DatePicker
        currentWeek={currentWeek}
        selectedDate={selectedDate}
        setSelectedDate={setSelectedDate}
        date={selectedDate.getDate()}
      />

      <div className="border p-3">
        {/*  */}
        {/* TODO 클릭 날짜 시간 합계 */}

        <div className="rounded-lg center-xy py-3 text-lg font-extrabold tracking-wider md:text-xl">
          {totalTime}
        </div>

        <div>
          {records &&
            tasks.map((task) => (
              <div key={task.id}>
                <RecordContainer
                  task={task}
                  selectedDate={selectedDate}
                  records={records}
                />
              </div>
            ))}
        </div>
      </div>
    </div>
  );
};

export default TimerContainer;
