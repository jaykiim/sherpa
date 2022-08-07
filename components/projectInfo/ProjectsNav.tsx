import { useRouter } from "next/router";
import React from "react";

// components
import { ArrowDropdown, ProjectMenu } from "../";

// types
import { Project } from "../../types";

interface Props {
  projects: Project[];
  title: string;
}

const ProjectsNav = ({ projects, title }: Props) => {
  const { id: projectId } = useRouter().query;

  const navOpen = (currentId: string) => {
    if (projectId && currentId === projectId) return true;
  };

  return (
    <div>
      <h3 className="text-gray-400 mb-2 font-light">{title}</h3>

      {projects.map((project) => (
        <ArrowDropdown
          key={project.id}
          title={project.name}
          style={{
            container: "gap-x-1",
            title: "text-sm text-gray-400",
            arrow: "text-gray-400",
          }}
          defaultOpen={!!navOpen(project.id)}
        >
          <ProjectMenu projectId={project.id} />
        </ArrowDropdown>
      ))}
    </div>
  );
};

export default ProjectsNav;
