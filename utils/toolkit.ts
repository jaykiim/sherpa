import { Project, Projects } from "../types";

const normalize = <T extends { id: string; [index: string]: any }>(
  data: T[]
) => {
  return data.reduce((acc, { id, ...props }) => {
    return { ...acc, [id]: { id, ...props } };
  }, {});
};

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

const getRandomColor = () =>
  "#" + Math.round(Math.random() * 0xffffff).toString(16);

export default { normalize, sortProject, getRandomColor };
