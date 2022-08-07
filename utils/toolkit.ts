import { Project } from "../types";

const normalize = <T extends { [index: string]: any }>(
  data: T[],
  id: string
) => {
  // id 는 id 역할을 할 속성명임

  return data.reduce<{ [index: string]: T }>((acc, cur) => {
    return { ...acc, [cur[id]]: cur };
  }, {});
};

const denormalize = <T>(data: { [index: string]: T }) => {
  return Object.entries(data).reduce<T[]>((a, c) => [...a, c[1]], []);
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

export default { normalize, denormalize, sortProject, getRandomColor };
