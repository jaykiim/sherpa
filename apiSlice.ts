import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { Project, KeyResult } from "./types";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "/api" }),
  tagTypes: ["User", "Projects"],
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
    }),

    // TODO keyresults ================================================================================================================================================================================

    getKeyResults: builder.query<KeyResult[], string>({
      query: (keyresultList) => ({
        url: `/keyresults`,
        method: "GET",
        params: { keyresultList },
      }),
    }),
  }),
});

export const {
  useGetUserQuery,
  useUpdateUserMutation,
  useGetProjectsQuery,
  useGetProjectQuery,
  useGetKeyResultsQuery,
} = apiSlice;
