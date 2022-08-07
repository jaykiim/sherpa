const toIsoStr = (date: Date) => date.toISOString().split("T")[0];

const dateMap = (date: Date) => {
  return {
    year: date.getFullYear(),
    month: date.getMonth() + 1,
    date: date.getDate(),
    day: date.getDay(),
  };
};

// TODO project calendar ==================================================================================================================================================================

// ex. 시작: 2022-08-12, 선택일: 2022-08-31
// ---> 달력: [[12, 13], [14, 15, 16, 17, 18, 19, 20], ...]
// ---> 선택일: 4주차

// * 윤년 계산기 --------------------------------------------------------------------------------------------------------------------------------------------------------

const isLeapYear = (year: number) => {
  if ((year % 4 === 0 && year % 100 !== 0) || year % 400 === 0) return true;
  else return false;
};

// * 달력 --------------------------------------------------------------------------------------------------------------------------------------------------------

const calendar = (date: Date) => {
  //
  // 윤년이 아닐 경우 월별 일수
  const monthlyDays = [31, 28, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31];

  // 날짜 분해
  const { year, month } = dateMap(date);

  // 윤년일 경우
  if (isLeapYear(year)) monthlyDays[1] = 29;

  // 리턴값
  let result = [];

  // 시작 요일
  const startday = new Date(`${year}-${month}-1`).getDay();

  // 시작 요일 전까지 빈칸
  for (let i = 0; i < startday; i++) result.push("");

  // 날짜 채우기
  for (let i = 1; i <= monthlyDays[month - 1]; i++) result.push(i);

  // 마지막 날이 토요일 전에 끝나는 경우 남은 칸을 빈칸 처리
  const remained = 7 - (result.length % 7);
  if (remained < 7) for (let i = 0; i < remained; i++) result.push("");

  return result;
};

// * 프로젝트 달력 --------------------------------------------------------------------------------------------------------------------------------------------------------

const projectCalendar = (selected: Date, start: string, end: string) => {
  //
  // 선택 날짜
  const { year, month, date } = dateMap(selected);

  // 시작 날짜
  const {
    year: startYr,
    month: startMt,
    date: startDate,
  } = dateMap(new Date(start));

  // 종료 날짜
  const { year: endYr, month: endMt, date: endDate } = dateMap(new Date(end));

  // 선택 날짜 달력
  const selectedCalendar = calendar(new Date(year, month - 1, date));

  // * 달력 앞 뒤 자르기 ---------------------------------------------------------------------------------------------------------

  // 7개씩 묶기
  let calendarByWeek = [];

  for (let i = 0; i < selectedCalendar.length; i += 7) {
    calendarByWeek.push(selectedCalendar.slice(i, i + 7));
  }

  // 선택 연월 === 시작 연월 ?
  if (year === startYr && month === startMt) {
    //
    // 시작일 이전 주 제거
    const startIdx = calendarByWeek.findIndex((week) =>
      week.includes(startDate)
    );
    calendarByWeek = calendarByWeek.slice(startIdx);

    // 시작일 이전 날 제거
    const [first, ...rest] = calendarByWeek;
    const startDateIdx = first.findIndex((date) => date === startDate);
    calendarByWeek = [first.slice(startDateIdx), ...rest];
  }

  // 선택 연월 === 종료 연월 ? 종료일 이전 주 제거
  if (year === endYr && month === endMt) {
    //
    // 종료일 이후 주 제거
    const endIdx = calendarByWeek.findIndex((week) => week.includes(endDate));
    calendarByWeek = calendarByWeek.slice(0, endIdx + 1);

    // 종료일 이후 날 제거
    const lastweek = calendarByWeek[calendarByWeek.length - 1];
    const endDateIdx = lastweek.findIndex((date) => date === endDate);
    calendarByWeek = calendarByWeek.map((week, i) =>
      i === calendarByWeek.length - 1 ? week.slice(0, endDateIdx + 1) : week
    );
  }

  // 몇 주차?
  const weekNum = calendarByWeek.findIndex((week) => week.includes(date));

  return { calendarByWeek, weekNum };
};

// TODO 시간 합계 ==================================================================================================================================================================

const prefix = (num: number) => {
  return num.toString().length < 2 ? "0" + num : num;
};

const timeSum = (times: string[]) => {
  // times = ["1:00:23", "15:20:32", "2:07:05", "23:11:47"]

  const init = [0, 0, 0]; // [시, 분, 초]

  times.forEach((time) => {
    const [hr, min, sec] = time.split(":").map((timeStr) => Number(timeStr));

    init[0] += hr;
    init[1] += min;
    init[2] += sec;
  });

  // init = [26, 532, 340] 같은 식으로 되어있을 것임

  const secRound = Math.floor(init[2] / 60);
  const sec = init[2] % 60;

  const minRound = Math.floor(init[1] / 60);
  const min = (init[1] % 60) + secRound;

  const hour = init[0] + minRound;

  return `${prefix(hour)}:${prefix(min)}:${prefix(sec)}`;
};

// TODO 시간 뺄셈 ==================================================================================================================================================================

const timeDiff = (time1: string, time2: string) => {
  const times = [time1, time2];

  const secTimes = times.map((time) => {
    const [hr, min, sec] = time.split(":").map((unit) => +unit);
    return hr * 3600 + min * 60 + sec;
  });

  const diff = secTimes[0] - secTimes[1];

  const hours = Math.floor(diff / 3600);
  const minutes = Math.floor(diff / 60) % 60;
  const seconds = diff % 60;

  return `${prefix(hours)}:${prefix(minutes)}:${prefix(seconds)}`;
};

// TODO 초 합계를 00:00:00 형식으로 ==================================================================================================================================================================

const convertTotalsec = (sec: number) => {
  const hours = Math.floor(sec / 3600);
  const minutes = Math.floor(sec / 60) % 60;
  const seconds = sec % 60;

  return `${prefix(hours)}:${prefix(minutes)}:${prefix(seconds)}`;
};

export default {
  toIsoStr,
  dateMap,
  projectCalendar,
  timeSum,
  timeDiff,
  convertTotalsec,
};
