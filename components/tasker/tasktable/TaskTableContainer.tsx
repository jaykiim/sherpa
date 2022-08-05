import React, { useEffect, useState } from "react";
import { nanoid } from "@reduxjs/toolkit";

// components
import { Subheading, BtnEdit, TableHead, TableRow, BtnNewField } from "../../";

// hooks
import { useGetTasksQuery, useUpdateTasksMutation } from "../../../apiSlice";

// types
import { Task } from "../../../types";

const TaskTableContainer = () => {
  //
  // 데이터 패치
  const selectedKr = localStorage.getItem("kr");
  const { data: tasks } = useGetTasksQuery(selectedKr!);

  // * 입력 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 수정 상태
  const [write, setWrite] = useState(false);

  // 입력값 상태
  const [taskInputs, setTaskInputs] = useState(tasks || []);

  useEffect(() => {
    if (tasks) setTaskInputs(tasks);
  }, [tasks]);

  // 유효성 에러
  const [error, setError] = useState("");

  // 입력 추가 시 기본값
  const defaultTask: Task = {
    id: nanoid(),
    name: "",
    leadTime: "",
    actualTime: "",
    done: false,
    records: {},
    keyresultId: selectedKr!,
  };

  // * 입력 핸들러 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 입력값 변경
  const onTaskChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();

    const [taskId, label] = e.target.id.split("/");

    // 예상 시간 정규식
    const leadTimeRegex = /^([1-9]?[0-9]?[0-9]):([0-5][0-9])$/;

    // 예상 시간 유효성 검사
    if (label === "leadTime") {
      const isLeadTimeCorrect = leadTimeRegex.test(e.target.value);

      isLeadTimeCorrect
        ? setError("")
        : setError("예상 시간은 00:00 형식으로 입력해주세요");
    }

    setTaskInputs((s) => {
      return s!.map((item) =>
        item.id === taskId ? { ...item, [label]: e.target.value } : item
      );
    });
  };

  // 입력 취소
  const onCancel = () => {
    setWrite(false);
    setTaskInputs(tasks!); // tasks 가 존재해야 수정 버튼이 렌더되므로 수정 버튼 > 취소 클릭 시점엔 tasks 무조건 존재
    setError("");
  };

  // * 서버 저장 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const [updateTasks, { isLoading }] = useUpdateTasksMutation();
  const onSubmit = (updatedTask: Task[]) => async () => {
    try {
      //
      await updateTasks({
        keyresultId: selectedKr as string,
        tasks: updatedTask,
      });
      setWrite(false);
      //
    } catch (error) {
      console.log(error);
    }
  };

  // 제출 불가: 태스크명을 하나라도 입력하지 않았거나 예상 필드에 잘못된 값을 입력했거나 제출 버튼 연속 누른 경우
  const disable =
    !!error ||
    !!taskInputs.find((taskInput) => !taskInput.name || !taskInput.leadTime) ||
    isLoading;

  return (
    <div>
      {tasks && (
        <>
          <Subheading title="task table">
            <BtnEdit
              write={write}
              setWrite={setWrite}
              onSubmit={onSubmit(taskInputs)}
              onCancel={onCancel}
              disable={disable}
            />
          </Subheading>

          {/* TODO 에러 메세지 */}

          <div className="my-3 text-xs text-red-600">{error}</div>

          {/* TODO 테이블 헤드 로우 */}

          <TableHead write={write} />

          {/* TODO 테이블 그냥 로우 */}

          {write
            ? taskInputs.map((task) => (
                <TableRow
                  key={task.id}
                  task={task}
                  write={write}
                  taskInputs={taskInputs}
                  setTaskInputs={setTaskInputs}
                  onTaskChange={onTaskChange}
                />
              ))
            : tasks.map((task) => (
                <TableRow
                  key={task.id}
                  task={task}
                  write={write}
                  taskInputs={taskInputs}
                  setTaskInputs={setTaskInputs}
                  onTaskChange={onTaskChange}
                  onSubmit={onSubmit}
                />
              ))}

          {/* TODO 태스크 추가 */}

          <div className="mt-5">
            {write && (
              <BtnNewField
                handleClick={() => setTaskInputs([...taskInputs, defaultTask])}
                desc="새 입력 추가"
              />
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default TaskTableContainer;
