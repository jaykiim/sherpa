import React from "react";
import { moment } from "../../utils";

interface Props {
  currentWeek: number[];
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
  date: number;
  border?: boolean;
}

const DayPicker = ({
  currentWeek,
  selectedDate,
  setSelectedDate,
  date,
  border,
}: Props) => {
  //
  // 현재 선택된 날짜
  const { year: currentYear, month: currentMonth } =
    moment.dateMap(selectedDate);

  return (
    <div
      className={`flex mt-5 border border-[#E8E7E4] ${
        border ? "rounded-md" : "border-b-0 rounded-t-md"
      }`}
    >
      {currentWeek.map((day, i) => (
        <span
          key={i}
          onClick={() =>
            setSelectedDate(new Date(currentYear, currentMonth - 1, day))
          }
          className={`cursor-pointer w-full text-center text-[#c2c1bf] font-light border-[#E8E7E4] border-l ${
            i === 0 && "border-l-0"
          } ${day === date && "bg-[#F7F6F3]"}`}
        >
          {day}
        </span>
      ))}
    </div>
  );
};

export default DayPicker;
