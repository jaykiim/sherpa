import React, { useRef } from "react";
import dynamic from "next/dynamic";

// components
import { CarouselCard, ProjectCard } from "../../components";
const Carousel = dynamic(() => import("../util/Carousel"), { ssr: false });

// hooks
import useGetSortedProjects from "../../hooks/useGetSortedProjects";

// styles
import { ChevronLeftIcon, ChevronRightIcon } from "@heroicons/react/outline";

interface Props {
  title: string; // 표시할 제목
  closed?: boolean; // 진행 중 또는 종료
}

const ProjectList = ({ title, closed }: Props) => {
  const sortedProjects = useGetSortedProjects() || {
    closed: [],
    inProgress: [],
  };
  const projects = closed ? sortedProjects.closed : sortedProjects.inProgress;

  // 캐러셀 좌우 이동 버튼
  const left = useRef<HTMLButtonElement>(null!);
  const right = useRef<HTMLButtonElement>(null!);

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
