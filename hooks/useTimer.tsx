import React, { useState } from "react";
import { TaskTimerInfo, TimerInfo } from "../types";
import { moment } from "../utils";

interface Props {
  timeInit: string; // 00:00:00 형식 (초기 시각)
  taskId: string; // 어떤 태스크의 타이머인지 식별하기 위해
}

const useTimer = ({ timeInit, taskId }: Props) => {
  //
  // 리턴값 (표시할 시간)
  const [time, setTime] = useState(timeInit);

  // 타이머 초기값 분할 --> 초 단위 합산
  const [hr, min, sec] = timeInit.split(":").map((unit) => +unit);
  let totalSec = sec + min * 60 + hr * 3600;

  // * 타이머 시각 업데이트 함수 ------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const updateTimer = () => {
    //
    // 1. totalSec 을 1초 올린다
    totalSec++;

    // 2. 로컬 스토리지에서 타이머 정보를 가져온다 (타이머 시작 버튼 클릭 시 onTimerStart 실행 --> 로컬 스토리지에 타이머 정보 저장하므로 현 시점에서 무조건 존재)
    const savedTimerInfo: TimerInfo = JSON.parse(
      localStorage.getItem("timerInfo")!
    );

    // 3. 저장된 타이머 정보에서 현재 태스크의 타이머만 뺴내기
    const currentTaskTimer: TaskTimerInfo = savedTimerInfo[taskId];

    // 4. 현재 타이머 정보에서 totalSec 업데이트
    const updatedTaskTimer: TaskTimerInfo = { ...currentTaskTimer, totalSec };

    // 5. 전체 타이머 정보 업데이트
    const updatedTimer: TimerInfo = {
      ...savedTimerInfo,
      [taskId]: updatedTaskTimer,
    };
    localStorage.setItem("timerInfo", JSON.stringify(updatedTimer));

    // 6. totalSec 을 00:00:00 형식으로 변환
    const displayTime = moment.convertTotalsec(totalSec);

    // 7. 상태 업데이트
    setTime(displayTime);
  };

  // * 타이머 시작 함수 ------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 기존 등록 타이머 정보 확인 후 1초마다 updateTimer 실행하는 interval 등록
  // ---> 컴포넌트에서 사용 시, 타이머 시작 상태가 참일 때마다 useEffect 훅으로 이 함수를 실행할 것
  // ---> 따라서 기존 등록 타이머 정보 있을 시 해제 필수

  const onTimerStart = () => {
    //
    // 1. 로컬 스토리지에서 기존 등록된 타이머 정보 가져오기 ( 있을수도 있고 없을수도 있음 )
    const savedTimerInfo = localStorage.getItem("timerInfo");
    const parsedTimerInfo: TimerInfo | null =
      savedTimerInfo && JSON.parse(savedTimerInfo);

    // 2. 기존 타이머 존재 && 현재 태스크 타이머 존재 --> 해당 타이머 해제 ( 타이머 중복 등록 방지 )
    const existingTimerId = parsedTimerInfo && parsedTimerInfo[taskId]?.timerId;
    existingTimerId && clearInterval(existingTimerId);

    // 3. 1초마다 updateTimer 실행하는 interval 등록
    const timerId = setInterval(updateTimer, 1000);

    // 4. 로컬 스토리지에 타이머 정보 등록
    const timerInfo = parsedTimerInfo
      ? { ...parsedTimerInfo, [taskId]: { timerId, totalSec } }
      : { [taskId]: { timerId, totalSec } };

    localStorage.setItem("timerInfo", JSON.stringify(timerInfo));
  };

  // * 타이머 종료 함수 ------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const onTimerStop = (updateDB: () => Promise<void>) => {
    //
    // 1. 로컬 스토리지에서 타이머 정보를 가져온다
    const timerInfo: TimerInfo = JSON.parse(localStorage.getItem("timerInfo")!);

    // 2. 타이머 정보 중 현재 태스크 타이머 아이디 가져온다
    const currentTaskTimer: TaskTimerInfo = timerInfo[taskId];
    const currentTaskTimerId = currentTaskTimer.timerId;

    // 3. setInterval 해제
    clearInterval(currentTaskTimerId);

    // 4. 전체 타이머 정보 중 현재 태스크 정보 제외
    delete timerInfo[taskId];

    // 5. 현재 태스크 정보 제외한 타이머 정보로 로컬 스토리지 업데이트
    localStorage.setItem("timerInfo", JSON.stringify(timerInfo));

    // 6. DB 업데이트
    updateDB();
  };

  return { time, onTimerStart, onTimerStop };
};

export default useTimer;
