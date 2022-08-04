import React, { useRef } from "react";
import dynamic from "next/dynamic";

// components
import { CarouselCard, ProjectCard } from "../../components";
const Carousel = dynamic(() => import("../util/Carousel"), { ssr: false });

// hooks
import useGetSortedProjects from "../../hooks/useGetSortedProjects";

// styles
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  PlusCircleIcon,
} from "@heroicons/react/outline";

// types
import { RootProps } from "../../types";

interface Props extends RootProps {
  title: string; // 표시할 제목
  closed?: boolean; // 진행 중 또는 종료
}

const ProjectList = ({ title, closed, setModal }: Props) => {
  const sortedProjects = useGetSortedProjects() || {
    closed: [],
    inProgress: [],
  };
  const projects = closed ? sortedProjects.closed : sortedProjects.inProgress;

  // 캐러셀 좌우 이동 버튼
  const left = useRef<HTMLButtonElement>(null!);
  const right = useRef<HTMLButtonElement>(null!);

  // 새 프로젝트 등록
  const addNewProject = () => {
    setModal!({
      desc: "newProject",
      size: "w-3/4 max-w-[500px] h-[95%] max-h-[700px] ",
      open: true,
    });
  };

  return (
    <article className="w-full flex flex-col gap-y-4 px-3">
      <section className="flex items-center lg:gap-x-3">
        {/*  */}
        {/* TODO 제목 */}

        <h1 className="whitespace-nowrap font-bold uppercase lg:text-xl">
          {title}
        </h1>

        {/* TODO 좌우 이동 버튼 */}

        <div className="flex">
          <div
            onClick={() => left.current.click()}
            className="hoverAnimation w-7 h-7 center-xy p-0"
          >
            <ChevronLeftIcon className="h-4 sm:h-5" />
          </div>

          <div
            onClick={() => right.current.click()}
            className="hoverAnimation w-7 h-7 center-xy p-0"
          >
            <ChevronRightIcon className="h-4 sm:h-5" />
          </div>
        </div>

        {/* TODO 새 프로젝트 */}

        {!closed && (
          <div className="ml-auto">
            <div
              onClick={addNewProject}
              className="hoverAnimation w-7 h-7 center-xy text-gray-400 hover:text-red-600 sm:hidden"
            >
              <PlusCircleIcon className="sm:hidden h-6" />
            </div>

            <button
              onClick={addNewProject}
              className="hidden btn-rounded btn-sm btn-hover-red sm:inline-block lg:btn-md"
            >
              + 새 프로젝트
            </button>
          </div>
        )}
      </section>

      {/* TODO 캐러셀 */}

      <Carousel btnRef={{ left, right }}>
        {projects.map((project) => (
          <CarouselCard
            key={project.id}
            style="cursor-pointer hover:shadow-lg"
            href={`project/${project.id}`}
          >
            <ProjectCard project={project} />
          </CarouselCard>
        ))}
      </Carousel>
    </article>
  );
};

export default ProjectList;
