import React from "react";

// types
import { Project } from "../../types";

interface Props {
  project: Project;
}

const ProjectCard = ({ project }: Props) => {
  const { start, end } = project;

  return (
    <div className="flex flex-col h-full">
      <h1 className="flex-1 text-lg mt-1 capitalize font-semibold">
        {project.name}
      </h1>
      <p className="ml-auto text-sm text-gray-400">
        {start} ~ {end}
      </p>
    </div>
  );
};

export default ProjectCard;
