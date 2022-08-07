import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Project, KeyResult, Task, Record } from "./types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: [
    "User",
    "Projects",
    "Project",
    "KeyResults",
    "KeyResult",
    "Task",
    "Records",
  ],
  endpoints: (builder) => ({
    //
    // TODO user ================================================================================================================================================================================

    getUser: builder.query({
      query: (userId) => `/users/${userId}`,
      providesTags: ["User"],
    }),
    updateUser: builder.mutation({
      query: (userInfo) => ({
        url: `/users/${userInfo.id}`,
        method: "PATCH",
        body: userInfo,
      }),
      invalidatesTags: ["User"],
    }),

    // TODO projects ================================================================================================================================================================================

    getProjects: builder.query<Project[], string>({
      query: (projectlist) => ({
        url: `/projects`,
        method: "GET",
        params: { projectlist },
      }),
      providesTags: ["Projects"],
    }),

    getProject: builder.query<Project, string>({
      query: (projectId) => `/projects/${projectId}`,
      providesTags: ["Project"],
    }),

    updateProject: builder.mutation<
      string,
      { userId?: string; project: Project }
    >({
      query: ({ userId, project }) => ({
        url: `/projects/${project.id}`,
        method: "PATCH",
        body: { userId, project },
      }),
      invalidatesTags: ["Projects", "Project", "User"],
    }),

    // TODO keyresults ================================================================================================================================================================================

    getKeyResults: builder.query<KeyResult[], string>({
      query: (keyresultList) => ({
        url: `/keyresults`,
        method: "GET",
        params: { keyresultList },
      }),
      providesTags: ["KeyResults"],
    }),

    getKeyResult: builder.query<KeyResult, string>({
      query: (krId) => `/keyresults/${krId}`,
      providesTags: ["KeyResult"],
    }),

    updateKeyResults: builder.mutation<
      string,
      { projectId: string; krArr: KeyResult[] }
    >({
      query: ({ projectId, krArr }) => ({
        url: `/keyresults`,
        method: "PATCH",
        body: { projectId, krArr },
      }),
      invalidatesTags: ["Project", "KeyResults"],
    }),

    updateKeyResult: builder.mutation<string, KeyResult>({
      query: (kr) => ({
        url: `/keyresults/${kr.id}`,
        method: "PATCH",
        body: { kr },
      }),
      invalidatesTags: ["KeyResult", "KeyResults"],
    }),

    // TODO tasks ================================================================================================================================================================================

    getTasks: builder.query<Task[], string>({
      query: (krId) => ({
        url: `/tasks`,
        method: "GET",
        params: { krId },
      }),
      providesTags: ["Task"],
    }),

    updateTasks: builder.mutation<
      string,
      { keyresultId: string; tasks: Task[] }
    >({
      query: ({ keyresultId, tasks }) => ({
        url: `/tasks`,
        method: "PATCH",
        body: { keyresultId, tasks },
      }),
      invalidatesTags: ["Task"],
    }),

    // TODO records ================================================================================================================================================================================

    getRecords: builder.query<Record[], string>({
      query: (taskIdlist) => ({
        url: `/records`,
        method: "GET",
        params: { taskIdlist },
      }),
      providesTags: ["Records"],
    }),

    updateRecord: builder.mutation<
      string,
      { record: Record; taskId?: string; selectedDate?: string }
    >({
      query: ({ record, taskId, selectedDate }) => ({
        url: `/records/${record.id}`,
        method: "PATCH",
        body: { record, taskId, selectedDate },
      }),
      invalidatesTags: ["Records", "Task"],
    }),

    deleteRecord: builder.mutation<
      string,
      { recordId: string; taskId: string; selectedDate: string }
    >({
      query: ({ recordId, taskId, selectedDate }) => ({
        url: `/records/${recordId}`,
        method: "DELETE",
        body: { recordId, taskId, selectedDate },
      }),
      invalidatesTags: ["Records", "Task"],
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useGetProjectsQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
  useGetKeyResultsQuery,
  useGetKeyResultQuery,
  useUpdateKeyResultsMutation,
  useUpdateKeyResultMutation,
  useGetTasksQuery,
  useUpdateTasksMutation,
  useGetRecordsQuery,
  useUpdateRecordMutation,
  useDeleteRecordMutation,
} = apiSlice;
