import React from "react";
import { nanoid } from "@reduxjs/toolkit";

// components
import FieldCard from "./FieldCard";

// styles
import { PlusCircleIcon, TrashIcon } from "@heroicons/react/outline";

// types
import { Feedback } from "../../types";

interface Props {
  write: boolean;
  defaultFeedback: Feedback[];
  feedback: Feedback[];
  setFeedback: React.Dispatch<React.SetStateAction<Feedback[]>>;
}

const Feedback = ({ write, defaultFeedback, feedback, setFeedback }: Props) => {
  const onDeleteClick = (i: number) => {
    setFeedback((s) => s.filter((item, idx) => idx !== i));
  };

  const handleNewPlan = () =>
    setFeedback([...feedback, { id: nanoid(), content: "새 피드백" }]);

  return (
    <FieldCard
      contentsOrigin={defaultFeedback}
      contents={feedback}
      setContents={setFeedback}
      fieldName="피드백"
      write={write}
    >
      {/*  */}
      {/* GUIDE 피드백 박스 ==================================================================================================================================================================================================== */}

      {feedback.map((input, i) => (
        <div
          key={i}
          className={`mt-2 p-2 text-sm rounded-md bg-[#F7F6F3] min-h-[36px] flex items-center justify-between`}
        >
          {/*  */}
          {/* TODO 피드백 입력 */}

          <input
            id={input.id}
            type="text"
            value={input.content}
            onChange={(e) =>
              setFeedback((s) =>
                s.map((item) =>
                  item.id === e.target.id
                    ? { ...item, content: e.target.value }
                    : item
                )
              )
            }
            className="w-full bg-transparent focus:outline-none"
          />

          {/* TODO 피드백 제거 버튼 */}

          <div
            onClick={() => onDeleteClick(i)}
            className="cursor-pointer text-gray-400 hover:text-red-600"
          >
            <TrashIcon className="w-5 h-5" />
          </div>
        </div>
      ))}

      {/* GUIDE 새 계획 추가 버튼 ==================================================================================================================================================================================================== */}

      <div
        onClick={handleNewPlan}
        className="mt-2 p-2 text-sm rounded-md h-[36px] border border-dashed flex items-center cursor-pointer text-gray-300 hover:text-gray-500 hover:border-gray-500"
      >
        <PlusCircleIcon className="w-5 h-5" />
        <p className="ml-2">새 피드백 추가</p>
      </div>
    </FieldCard>
  );
};

export default Feedback;
