import React from "react";
import { useSession } from "next-auth/react";
import { toolkit } from "../../utils";

import { ProjectsNav } from "../";

// hooks
import { useGetProjectsQuery, useGetUserQuery } from "../../apiSlice";

const ProjectsNavContainer = () => {
  //
  // 사용자 프로젝트 id 배열 가져오기
  const { data: session } = useSession();
  const { data: user } = useGetUserQuery(session!.user.uid);

  // 프로젝트 객체 배열 가져오기
  const projectlist = JSON.stringify(user?.projects || ["-1"]);
  const { data: projects } = useGetProjectsQuery(projectlist);

  // 진행 중 / 종료 프로젝트 구분
  const sortedProjects = projects && toolkit.sortProject(projects);

  return (
    <div className="flex flex-col gap-y-5 text-sm">
      {sortedProjects && (
        <>
          <ProjectsNav
            projects={sortedProjects.inProgress}
            title="진행 중인 프로젝트"
          />
          <ProjectsNav
            projects={sortedProjects.closed}
            title="종료된 프로젝트"
          />
        </>
      )}
    </div>
  );
};

export default ProjectsNavContainer;
