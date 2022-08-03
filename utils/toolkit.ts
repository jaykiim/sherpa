import { Project, Projects } from "../types";

const sortProject = (projects: Project[]) => {
  const today = new Date();

  let closed: Project[] = [];
  let inProgress: Project[] = [];

  projects.filter((project) => {
    const end = new Date(project.end);
    today > end ? closed.push(project) : inProgress.push(project);
  });

  return { closed, inProgress };
};

export default { sortProject };
