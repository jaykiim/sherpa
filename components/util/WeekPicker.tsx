import React from "react";
import { moment } from "../../utils";

interface Props {
  start: string;
  end: string;
  selectedDate: Date;
  setSelectedDate: React.Dispatch<React.SetStateAction<Date>>;
}

const WeekPicker = ({ start, end, selectedDate, setSelectedDate }: Props) => {
  //
  // 시작 날짜
  const { year: startYr, month: startMt } = moment.dateMap(new Date(start));

  // 종료 날짜
  const { year: endYr, month: endMt } = moment.dateMap(new Date(end));

  // 클릭 날짜
  const { year, month, date } = moment.dateMap(selectedDate);

  // 클릭 날짜 calendar
  const { calendarByWeek, weekNum } = moment.projectCalendar(
    selectedDate,
    start,
    end
  );

  // years
  const years = () => {
    const result = [];
    for (let i = startYr; i <= endYr; i++) result.push(i + " 년");
    return result;
  };

  // months
  const months = (clickedYr: number) => {
    const isStartYr = clickedYr === startYr;
    const isEndYr = clickedYr === endYr;

    const startNum = isStartYr ? startMt : 1;
    const endNum = isEndYr ? endMt : 12;

    const result = [];
    for (let i = startNum; i <= endNum; i++) result.push(i + " 월");

    return result;
  };

  // weeks
  const weeks = () => {
    const result = [];
    for (let i = 1; i <= calendarByWeek.length; i++) result.push(i + " 주차");
    return result;
  };

  const selector = (field: "year" | "month" | "week", items: string[]) => {
    const defaultVal = () => {
      if (field === "year") return year + " 년";
      else if (field === "month") return month + " 월";
      else return weekNum + 1 + " 주차";
    };

    const onChange = (clicked: number) => {
      //
      let newDate;

      if (field === "year") {
        // 클릭한 연도에 존재하는 월 배열
        const clickedYearMonths = months(clicked);

        // clickedYearMonths 요소 포맷의 month
        const monthTag = month + " 월";

        // 클릭한 연도에 monthTag 존재 여부
        const clickedYearmonthExists = clickedYearMonths.includes(monthTag);

        if (clickedYearmonthExists) {
          // 존재하면 클릭한 연도의 month로 바꾸고
          newDate = new Date(clicked, month - 1, date);
        } else {
          // 존재하지 않으면 클릭한 연도의 시작 달로 바꿈
          newDate = new Date(clicked, parseInt(clickedYearMonths[0]) - 1, date);
        }
      }

      //
      else if (field === "month") {
        const clickedYearMonth = new Date(year, clicked - 1, 1);

        // 클릭한 월의 프로젝트 달력 (일주일 단위로 묶인 2차원 배열)
        const { calendarByWeek: clickedMonthDaysByWeek } =
          moment.projectCalendar(clickedYearMonth, start, end);

        // 클릭한 월에 weekNum 존재 여부
        const clickedMonthCurrentWeekExists =
          clickedMonthDaysByWeek.length >= weekNum + 1;

        // 클릭한 월에 date 존재 여부
        const dateExsists = clickedMonthDaysByWeek.flat().includes(date);

        if (clickedMonthCurrentWeekExists && dateExsists) {
          // 존재하면 클릭한 월의 date 그대로 하는데
          newDate = new Date(year, clicked - 1, date);
        } else {
          // 존재하지 않으면 weekNum 이 바뀌어야 하므로 date를 현재 클릭한 달의 마지막 주 첫 날로 바꿈
          const lastWeekFirstDay = clickedMonthDaysByWeek[
            clickedMonthDaysByWeek.length - 1
          ].filter((date) => typeof date !== "string")[0] as number;

          newDate = new Date(year, clicked - 1, lastWeekFirstDay);
        }
      }

      //
      else {
        // 선택한 주에 속한 날짜 (숫자만)
        const week = calendarByWeek[clicked - 1].filter(
          (date) => typeof date !== "string"
        ) as number[];

        newDate = new Date(year, month - 1, week[0]);
      }

      setSelectedDate(newDate);
    };

    return (
      <select
        name={field}
        id={field}
        value={defaultVal()}
        onChange={(e) => onChange(parseInt(e.target.value))}
        className="focus:outline-none border px-1 rounded-lg text-sm sm:text-[16px]"
      >
        {items.map((item, i) => (
          <option key={i} value={item}>
            {item}
          </option>
        ))}
      </select>
    );
  };

  return (
    <div className="flex gap-x-1">
      {years().length ? selector("year", years()) : <></>}
      {months(year).length ? selector("month", months(year)) : <></>}
      {selector("week", weeks())}
    </div>
  );
};

export default WeekPicker;
