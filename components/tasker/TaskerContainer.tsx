import React from "react";
import { useRouter } from "next/router";

// hooks
import { useGetProjectQuery, useGetTasksQuery } from "../../apiSlice";

// components
import { TaskTableContainer, TimerContainer } from "../";

const TaskerContainer = () => {
  //
  // * 데이터 패치 ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 현재 프로젝트
  const { id: projectId } = useRouter().query;
  const { data: project } = useGetProjectQuery(projectId as string);

  // 현재 kr 태스크
  const selectedKr = localStorage.getItem("kr");
  const { data: tasks } = useGetTasksQuery(selectedKr!);

  return (
    <div>
      {tasks && <TaskTableContainer tasks={tasks} />}
      {project && tasks && <TimerContainer project={project} tasks={tasks} />}
    </div>
  );
};

export default TaskerContainer;
