import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { RootProps } from "../../types";
import { DrawerContext } from "../app/Drawer";

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

interface Props extends RootProps {
  projectId: string;
  detail?: boolean; // 상세페이지인지 드로어인지
}

const ProjectMenu = ({ projectId, detail }: Props) => {
  //
  // 부모 컴포넌트에 따른 메뉴 스타일
  const style = {
    container: detail ? "hidden bg-[#F7F6F3] m-0 sm:block" : "",
    listItem: detail ? "p-4 hover:bg-[#E8E7E4]" : "ml-6 p-1 hover:bg-gray-100",
  };

  // 네비게이션
  const router = useRouter();
  const setDrawer = useContext(DrawerContext);
  const onClick = (menu: string) => {
    //
    // 드로어 닫기
    setDrawer && setDrawer(false);

    // path
    const path = menu === "overview" ? "" : menu;

    // 이동
    router.push(`/project/${projectId}/${path}`);
  };

  // 현재 선택된 메뉴
  const path = router.pathname.split("/");
  const lastPath = path[path.length - 1];
  const selectedMenu = lastPath === "[id]" ? "overview" : lastPath;

  // 현재 선택된 메뉴 bold 처리 하기
  const selectedMenuStyle = (name: string) => {
    if (name === selectedMenu && (projectId as string) === projectId) {
      return "text-gray-500 font-bold";
    }
  };

  return (
    <article
      className={`${style.container} ${detail && "w-[250px]"} text-gray-400`}
    >
      <div className="flex flex-col capitalize">
        {menu.map((name, i) => (
          <div
            key={i}
            className={`flex items-center gap-x-3 cursor-pointer ${
              style.listItem
            } ${selectedMenuStyle(name)}`}
            onClick={() => onClick(name)}
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
