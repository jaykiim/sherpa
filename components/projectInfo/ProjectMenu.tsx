import React from "react";

// styles
import {
  PhotographIcon,
  PresentationChartLineIcon,
} from "@heroicons/react/outline";

const menu = ["overview", "tools"];
const menuIcon = (menu: string) => {
  const style = "w-4 h-4 text-gray-400";

  switch (menu) {
    case "overview":
      return <PresentationChartLineIcon className={style} />;

    case "tools":
      return <PhotographIcon className={style} />;
  }
};

interface Props {
  projectId: string;
  detail?: boolean; // 상세페이지인지
}

const ProjectMenu = ({ projectId, detail }: Props) => {
  //
  // 부모 컴포넌트에 따른 메뉴 스타일
  const style = {
    container: detail ? "hidden bg-[#F7F6F3] m-0 sm:inline-block" : "",
    listItem: detail ? "p-4 hover:bg-[#E8E7E4]" : "p-1 hover:bg-gray-100",
  };

  return (
    <article className={`${style.container} mb-5  text-gray-400`}>
      <div className="flex flex-col gap-y-3 capitalize">
        {menu.map((name, i) => (
          <div
            key={i}
            className={`flex items-center gap-x-3 cursor-pointer ${style.listItem}`}
          >
            {menuIcon(name)}
            {name}
          </div>
        ))}
      </div>
    </article>
  );
};

export default ProjectMenu;
