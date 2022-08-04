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
  return (
    <div>
      <h3 className="text-gray-400 mb-2 font-light">{title}</h3>

      {projects.map((project) => (
        <ArrowDropdown
          key={project.id}
          title={project.name}
          style={{ container: "gap-x-1", title: "text-sm text-gray-400" }}
        >
          <ProjectMenu projectId={project.id} />
        </ArrowDropdown>
      ))}
    </div>
  );
};

export default ProjectsNav;
