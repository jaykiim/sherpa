import React from "react";

interface Props {
  write: boolean;
}

const TableHead = ({ write }: Props) => {
  const cellstyle = "p-1 border-r text-center";

  return (
    <div
      className={`mt-3 w-full grid grid-cols-6 rounded-t-lg border border-[#E8E7E4] text-xs bg-[#F7F6F3] sm:text-[16px]`}
    >
      <div className={`col-span-3 ${cellstyle}`}>태스크</div>
      <div className={`col-span-1 ${cellstyle}`}>예상</div>
      <div className={`col-span-1 ${cellstyle}`}>실제</div>
      <div className={`col-span-1 ${cellstyle} border-r-0`}>
        {write ? "삭제" : "완료"}
      </div>
    </div>
  );
};

export default TableHead;
