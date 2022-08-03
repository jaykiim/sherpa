import React from "react";

// components
import { ProjectsNav } from "../";

// hooks
import useGetSortedProjects from "../../hooks/useGetSortedProjects";

const ProjectsNavContainer = () => {
  //
  // 진행 중 / 종료 프로젝트 구분
  const sortedProjects = useGetSortedProjects();

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
