import React, { useState } from "react";

// styles
import { ChevronRightIcon } from "@heroicons/react/outline";

interface Props {
  children: React.ReactNode;
  title: string;
  style?: {
    container?: string;
    title?: string;
  };
}

const ArrowDropdown = ({ children, title, style }: Props) => {
  const [open, setopen] = useState(false);

  return (
    <div>
      <div
        className={
          "flex items-center gap-x-2 text-sm uppercase sm:text-lg " +
          style?.container
        }
      >
        {/*  */}
        {/* TODO 화살표 */}

        <div className="center-xy w-6 h-6 hoverAnimation xl:p-0">
          <ChevronRightIcon
            onClick={() => setopen(!open)}
            className={`w-4 h-4 duration-200 transition-all ${
              open ? "rotate-90" : "rotate-0"
            }`}
          />
        </div>

        {/* TODO 제목 */}

        <h3 className={style?.title}>{title}</h3>
      </div>

      {open && children}
    </div>
  );
};

export default ArrowDropdown;
