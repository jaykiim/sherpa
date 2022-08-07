import React from "react";

export interface RootProps {
  drawer?: boolean;
  setDrawer?: React.Dispatch<React.SetStateAction<boolean>>;
  modal?: boolean;
  setModal?: React.Dispatch<React.SetStateAction<Modal>>;
}

/* ==========================================================================================================================================================================================================================================
* users
========================================================================================================================================================================================================================================== */

export interface User {
  id: string;
  name: string;
  projects: string[] | [];
}

/* ==========================================================================================================================================================================================================================================
* projects
========================================================================================================================================================================================================================================== */

export interface Projects {
  [id: string]: Project;
}

export interface Project {
  id: string;
  name: string;
  start: string;
  end: string;
  keyresults: string[];
  planners: {
    [date: string]: string[];
  };
}

/* ==========================================================================================================================================================================================================================================
* key results
========================================================================================================================================================================================================================================== */

export interface KeyResult {
  id: string;
  name: string;
  color: string;
  projectId: string;
  tools: string[] | [];
  tasks: string[] | [];
  plans: string[] | [];
}

/* ==========================================================================================================================================================================================================================================
* tasks
========================================================================================================================================================================================================================================== */

export interface Tasks {
  [taskId: string]: Task;
}

export interface Task {
  id: string;
  name: string;
  leadTime: string;
  actualTime: string;
  done: boolean;
  records: {
    [date: string]: string[];
  };
  keyresultId: string;
}

/* ==========================================================================================================================================================================================================================================
* records
========================================================================================================================================================================================================================================== */

export interface Records {
  [recordId: string]: Record;
}

export interface Record {
  id: string;
  name: string;
  time: string;
  taskId: string;
}

/* ==========================================================================================================================================================================================================================================
* timer
========================================================================================================================================================================================================================================== */

export interface TimerInfo {
  [taskId: string]: TaskTimerInfo;
}

export interface TaskTimerInfo {
  timerId: number;
  totalSec: number;
}

/* ==========================================================================================================================================================================================================================================
* planners
========================================================================================================================================================================================================================================== */

export interface Planners {
  [plannerId: string]: Planner;
}

export interface Planner {
  id: string;
  projectId: string;
  comment: string;
  date: string;
  feedback: Feedbacks;
  plan: Plans;
}

export interface Feedbacks {
  [id: string]: Feedback;
}

export interface Feedback {
  id: string;
  content: string;
}

export interface Plans {
  [id: string]: Plan;
}

export interface Plan {
  id: string;
  content: string;
  done: boolean;
}

/* ==========================================================================================================================================================================================================================================
* utils
========================================================================================================================================================================================================================================== */

// modal -------------------------------------------------------------------------

export interface Modal {
  desc: string;
  size: string;
  open: boolean;
}

// table -------------------------------------------------------------------------

export interface TableContext<ValueType> {
  write?: boolean;
  values?: ValueType[];
  setValues?: React.Dispatch<React.SetStateAction<ValueType[]>>;
  error?: string;
  setError?: React.Dispatch<React.SetStateAction<string>>;
}

export interface TableHead {
  name: string;
  width: number;
  edit?: string;
}
