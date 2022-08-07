import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

// components
import FieldCard from "./FieldCard";

// styles
import {
  CheckCircleIcon,
  PlusCircleIcon,
  TrashIcon,
} from "@heroicons/react/outline";

// types
import { Plan } from "../../types";

interface Props {
  write: boolean;
  defaultPlan: Plan[];
  plan: Plan[];
  setPlan: React.Dispatch<React.SetStateAction<Plan[]>>;
}

const Plan = ({ write, defaultPlan, plan, setPlan }: Props) => {
  //
  const onDoneClick = (i: number) => {
    setPlan((s) =>
      s.map((item, idx) => (idx === i ? { ...item, done: !item.done } : item))
    );
  };

  const onDeleteClick = (i: number) => {
    setPlan((s) => s.filter((item, idx) => idx !== i));
  };

  const handleNewPlan = () =>
    setPlan([...plan, { id: nanoid(), content: "새 계획", done: false }]);

  return (
    <FieldCard
      contentsOrigin={defaultPlan}
      contents={plan}
      setContents={setPlan}
      fieldName="계획"
      write={write}
    >
      {/*  */}
      {/* GUIDE 계획 박스 ==================================================================================================================================================================================================== */}

      {plan.map((input, i) => (
        <div
          key={i}
          className={`mt-2 p-2 text-sm rounded-md bg-[#F7F6F3] min-h-[36px] flex items-center justify-between ${
            input.done && "bg-blue-100"
          }`}
        >
          {/*  */}
          {/* TODO 계획 입력 */}

          <input
            id={input.id}
            type="text"
            value={input.content}
            onChange={(e) =>
              setPlan((s) =>
                s.map((item) =>
                  item.id === e.target.id
                    ? { ...item, content: e.target.value }
                    : item
                )
              )
            }
            className="w-full bg-transparent focus:outline-none"
          />

          <div className="flex gap-x-2 text-gray-400">
            {/*  */}
            {/* TODO 계획 완수 여부 버튼 */}

            <div onClick={() => onDoneClick(i)} className={`cursor-pointer`}>
              <CheckCircleIcon className="w-5 h-5" />
            </div>

            {/* TODO 계획 제거 버튼 */}

            <div
              onClick={() => onDeleteClick(i)}
              className="cursor-pointer text-gray-400 hover:text-red-600"
            >
              <TrashIcon className="w-5 h-5" />
            </div>
          </div>
        </div>
      ))}

      {/* GUIDE 새 계획 추가 버튼 ==================================================================================================================================================================================================== */}

      <div
        onClick={handleNewPlan}
        className="mt-2 p-2 text-sm rounded-md h-[36px] border border-dashed flex items-center cursor-pointer text-gray-300 hover:text-gray-500 hover:border-gray-500"
      >
        <PlusCircleIcon className="w-5 h-5" />
        <p className="ml-2">새 계획 추가</p>
      </div>
    </FieldCard>
  );
};

export default Plan;
