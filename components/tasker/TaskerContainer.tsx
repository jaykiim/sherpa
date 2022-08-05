import React from "react";

// hooks
import { useGetTasksQuery } from "../../apiSlice";

// components
import { TaskTableContainer, TimerContainer } from "../";

const TaskerContainer = () => {
  return (
    <div>
      <TaskTableContainer />
      <TimerContainer />
    </div>
  );
};

export default TaskerContainer;
