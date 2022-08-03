import React from "react";
import Link from "next/link";

// styles
import { MenuIcon } from "@heroicons/react/outline";

interface HeaderProps {
  setDrawer: React.Dispatch<React.SetStateAction<boolean>>;
}

const Header = ({ setDrawer }: HeaderProps) => {
  return (
    <header className="sticky z-40 top-0 bg-white border-b border-gray-100 px-[15px] py-[10px]">
      <div className="relative flex items-center">
        <div
          onClick={() => {
            setDrawer(true);
          }}
          className="w-8 h-8 center-xy -translate-x-[9px] hoverAnimation xl:p-0"
        >
          <MenuIcon className="h-5" />
        </div>

        <Link href="/">
          <h1 className="uppercase font-black cursor-pointer  xl:text-xl xl:absolute xl:left-1/2 xl:-translate-x-1/2">
            sherpa
          </h1>
        </Link>
      </div>
    </header>
  );
};

export default Header;
