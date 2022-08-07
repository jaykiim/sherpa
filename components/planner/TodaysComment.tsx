import React, { useState } from "react";
import FieldCard from "./FieldCard";

interface Props {
  write: boolean;
  defaultComment: string;
  comment: string;
  setComment: React.Dispatch<React.SetStateAction<string>>;
}

const TodaysComment = ({
  write,
  defaultComment,
  comment,
  setComment,
}: Props) => {
  //
  return (
    <FieldCard
      fieldName="오늘의 한마디"
      write={write}
      contentsOrigin={defaultComment}
      contents={comment}
      setContents={setComment}
    >
      <div className="mt-2 p-2 text-sm rounded-md bg-[#F7F6F3] min-h-[36px]">
        <input
          type="text"
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          autoFocus
          className="w-full bg-transparent focus:outline-none"
        />
      </div>
    </FieldCard>
  );
};

export default TodaysComment;
