import React, { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { moment, toolkit } from "../../utils";
import { useRouter } from "next/router";

// hooks
import { useUpdatePlannerMutation } from "../../apiSlice";

// components
import { BtnEdit, DatePicker, TodaysComment, Plan, Feedback } from "../";

// types
import {
  Feedback as FeedbackType,
  Plan as PlanType,
  Planner,
} from "../../types";

interface Props {
  date: number; // 현재 렌더할 날짜
  selectedDate: Date; // 선택된 날짜
  setSelectedDate?: React.Dispatch<React.SetStateAction<Date>>; // 일간 뷰일때만 넘어옴
  currentWeek?: number[]; // 일간 뷰일때만 넘어옴
  scrollDestRef?: React.RefObject<HTMLDivElement>; // 주간 뷰일때만 넘어옴
  planner: Planner[] | never[];
}

const today = new Date();

const DayCard = ({
  date,
  selectedDate,
  setSelectedDate,
  currentWeek,
  scrollDestRef,
  planner,
}: Props) => {
  //
  // ! 주간 뷰든 일간 뷰든 현재 주의 모든 planner 가 넘어옴 (빈 배열일 수 있음)

  const { id: projectId } = useRouter().query;

  // * 날짜 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 현재 선택된 날짜
  const { year, month } = moment.dateMap(selectedDate);

  // 현재 카드 날짜
  const currentDate = new Date(year, month - 1, date);

  // 요일 얻기
  const dayname = currentDate
    .toLocaleDateString("kr", { weekday: "long" })
    .slice(0, 1);

  // 날짜 표시
  const dateDisp = `${month}/${date} (${dayname})`;

  // * 카드에 표시할 데이터 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const plannerByDates = toolkit.normalize(planner, "date");
  const currentPlanner: Planner | undefined =
    plannerByDates[currentDate.toLocaleDateString()];

  // * 수정 시 입력 기본값 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 오늘의 한 마디
  const defaultComment = currentPlanner ? currentPlanner.comment : "";

  // 계획
  const defaultPlan = currentPlanner
    ? toolkit.denormalize(currentPlanner.plan)
    : [{ id: nanoid(), content: "", done: false }];

  // 피드백
  const defaultFeedback = currentPlanner
    ? toolkit.denormalize(currentPlanner.feedback)
    : [{ id: nanoid(), content: "" }];

  // * 수정 시 입력 상태 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 수정 상태
  const [write, setWrite] = useState(false);

  // 오늘의 한마디 입력
  const [comment, setComment] = useState(defaultComment);

  // 계획 입력
  const [plan, setPlan] = useState<PlanType[]>(defaultPlan);

  // 피드백 입력
  const [feedback, setFeedback] = useState<FeedbackType[]>(defaultFeedback);

  useEffect(() => {
    setComment(defaultComment);
    setPlan(defaultPlan);
    setFeedback(defaultFeedback);
  }, [selectedDate]);

  // * 서버 저장 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const [updatePlanner] = useUpdatePlannerMutation();
  const onSubmit = async () => {
    try {
      //
      const updatedPlanner: Planner = {
        ...currentPlanner,
        comment,
        feedback: toolkit.normalize(feedback, "id"),
        plan: toolkit.normalize(plan, "id"),
      };

      await updatePlanner({
        projectId: projectId as string,
        planner: updatedPlanner,
        selectedDate: selectedDate.toLocaleDateString(),
      });
      setWrite(false);
      setComment(defaultComment);
      setFeedback(defaultFeedback);
      setPlan(defaultPlan);
      //
    } catch (error) {
      console.log(error);
    }
  };

  const disabled = false;

  const onCancel = () => {
    setWrite(false);
    setComment(defaultComment);
    setFeedback(defaultFeedback);
    setPlan(defaultPlan);
  };

  return (
    <div className="w-full">
      {/*  */}
      {/* TODO (일간뷰) 날짜 피커 */}

      {currentWeek && setSelectedDate && (
        <DatePicker
          currentWeek={currentWeek}
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
          date={date}
        />
      )}

      {/* TODO 카드 */}

      <div
        ref={
          currentDate.toDateString() === today.toDateString()
            ? scrollDestRef
            : undefined
        }
        className={`mr-4 ${
          currentWeek ? "w-full mr-0" : "w-[300px] mt-7 my-4"
        } p-3 inline-block border border-[#E8E7E4]`}
      >
        <div
          className={`flex items-center gap-x-3 ${
            !currentWeek && "justify-between"
          }`}
        >
          <h3 className="text-sm text-[#c2c1bf] font-bold">{dateDisp}</h3>
          <BtnEdit
            write={write}
            setWrite={setWrite}
            onSubmit={onSubmit}
            onCancel={onCancel}
            disable={disabled}
          />
        </div>

        <TodaysComment
          write={write}
          defaultComment={defaultComment}
          comment={comment}
          setComment={setComment}
        />

        <Plan
          write={write}
          plan={plan}
          setPlan={setPlan}
          defaultPlan={defaultPlan}
        />

        <Feedback
          write={write}
          feedback={feedback}
          setFeedback={setFeedback}
          defaultFeedback={defaultFeedback}
        />
      </div>
    </div>
  );
};

export default DayCard;
