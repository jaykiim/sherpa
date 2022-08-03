import React from "react";
import { useSession } from "next-auth/react";
import { useGetProjectsQuery, useGetUserQuery } from "../apiSlice";
import { toolkit } from "../utils";

const useGetSortedProjects = () => {
  //
  // 사용자 프로젝트 id 배열 가져오기
  const { data: session } = useSession();
  const { data: user } = useGetUserQuery(session!.user.uid);

  // 프로젝트 객체 배열 가져오기
  const projectlist = JSON.stringify(user?.projects || ["-1"]);
  const { data: projects } = useGetProjectsQuery(projectlist);

  // 진행 중 / 종료 프로젝트 구분
  const sortedProjects = projects && toolkit.sortProject(projects);

  return sortedProjects;
};

export default useGetSortedProjects;
