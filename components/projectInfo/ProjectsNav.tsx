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
      <h3 className="text-gray-400 mb-1">{title}</h3>

      {projects.map((project) => (
        <ArrowDropdown
          key={project.id}
          title={project.name}
          style={{ container: "my-3", title: "text-sm" }}
        >
          <ProjectMenu projectId={project.id} />
        </ArrowDropdown>
      ))}
    </div>
  );
};

export default ProjectsNav;
