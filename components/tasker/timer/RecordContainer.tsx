import React, { useEffect, useState } from "react";
import { moment } from "../../../utils";

// components
import { Record } from "../../";

// hooks
import useTimer from "../../../hooks/useTimer";

// styles
import { PlayIcon, StopIcon } from "@heroicons/react/outline";

// types
import { Record as RecordType, Task, TimerInfo } from "../../../types";
import { nanoid } from "@reduxjs/toolkit";
import { useUpdateRecordMutation } from "../../../apiSlice";

interface Props {
  task: Task;
  selectedDate: Date;
  records: RecordType[];
}

const RecordContainer = ({ task, selectedDate, records }: Props) => {
  //
  // * 현재 태스크 --> 선택 날짜의 record 배열 ---------------------------------------------------------------------------------------------------------------------------------------

  // 현재 태스크 --> 선택 날짜의 record ids
  const recordIds = Object.keys(task.records).length
    ? task.records[selectedDate.toLocaleDateString()]
    : [];

  const selectedDateRecords = records.filter(
    (record) => recordIds?.length && recordIds.includes(record.id)
  ); // 빈 배열일 수 있음

  // * 현재 태스크 --> 선택 날짜 시간 합계 ---------------------------------------------------------------------------------------------------------------------------------------

  // 현재 태스크 --> 선택 날짜 records 에서 시간만 가져오기 (빈 배열일 수 있음)
  const times = selectedDateRecords.map((record) => record?.time);

  const timeSum = times.length ? moment.timeSum(times) : "00:00:00";

  // * 저장된 타이머 ---------------------------------------------------------------------------------------------------------------------------------------

  // 로컬 스토리지에서 타이머 정보 가져오기
  const saved = localStorage.getItem("timerInfo");
  const savedInfo: TimerInfo = saved && JSON.parse(saved);

  // 현재 태스크 타이머 정보
  const savedTimerInfo = savedInfo && savedInfo[task.id];

  // 타이머 시작 정지 상태 초기값
  const startInit = savedTimerInfo ? true : false;

  // * 타이머 시각 초기값 ---------------------------------------------------------------------------------------------------------------------------------------
  // savedTimerInfo 있으면 --> 타이머 정지하지 않은 상태로 새로고침 or 재렌더된 것 --> 해당 값 다시 사용
  // savedTimerInfo 없으면 --> 현재 태스크의 선택 날짜 시간 합계 ( = timeSum )

  const timeInit = savedTimerInfo
    ? moment.convertTotalsec(savedTimerInfo.totalSec)
    : timeSum;

  // * 타이머 시작 로직 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 타이머 시작 정지 상태
  const [start, setStart] = useState(startInit);

  // 표시할 시각
  const { time, onTimerStart, onTimerStop } = useTimer({
    timeInit,
    taskId: task.id,
  });

  useEffect(() => {
    if (start) onTimerStart();
  }, [start]);

  // * 서버 저장 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------
  // --> records 컬렉션에 도큐먼트 생성
  // --> task 도큐먼트 --> records 필드 --> 선택 날짜 --> 배열에 새 도큐먼트 아이디 추가

  const [updatedRecord] = useUpdateRecordMutation();

  const updateDB = async () => {
    //
    // 새 record 도큐먼트 아이디
    const recordId = nanoid();

    // 기록될 시간
    const newTime =
      timeSum === "00:00:00" ? time : moment.timeDiff(time, timeSum);

    // record 도큐먼트
    const recordDoc = {
      id: recordId,
      name: "새 기록",
      time: newTime,
      taskId: task.id,
    };

    try {
      await updatedRecord({
        record: recordDoc,
        taskId: task.id,
        selectedDate: selectedDate.toLocaleDateString(),
      });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="rounded-lg border-t py-5">
      <div className="flex justify-between">
        {/*  */}
        {/* TODO task명 */}

        <h3 className="text-sm text-gray-500 w-fit py-1 px-3 rounded-lg bg-[#F7F6F3]">
          {task.name}
        </h3>

        {/* TODO task 시간 합계 및 시작 정지 버튼 */}

        {start ? (
          <div
            onClick={() => {
              setStart(false);
              onTimerStop(updateDB);
            }}
            className="flex items-center gap-x-2 group cursor-pointer text-sm"
          >
            <p className="group-hover:text-red-600">{time}</p>
            <StopIcon className="w-6 h-6 text-red-600" />
          </div>
        ) : (
          <div
            onClick={() => {
              setStart(true);
              onTimerStart();
            }}
            className="flex items-center gap-x-2 group cursor-pointer text-sm"
          >
            <p className="group-hover:text-red-600">{timeSum}</p>
            <PlayIcon className="w-6 h-6 group-hover:text-red-600" />
          </div>
        )}
      </div>

      <section className="mt-5 flex flex-col gap-y-2">
        {selectedDateRecords?.map((record, i) => (
          <div key={i}>
            <Record
              record={record}
              taskId={task.id}
              selectedDate={selectedDate}
            />
          </div>
        ))}
      </section>
    </div>
  );
};

export default RecordContainer;
