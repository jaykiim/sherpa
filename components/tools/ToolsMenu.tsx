import React from "react";

// types
import { KeyResult } from "../../types";

interface Props {
  selectedKr: KeyResult;
  selectedMenu: string;
  setSelectedMenu: React.Dispatch<React.SetStateAction<string>>;
}

const ToolsMenu = ({ selectedKr, selectedMenu, setSelectedMenu }: Props) => {
  //
  const menulist = selectedKr.tools;

  return (
    <div className="-translate-y-0.5 flex items-center gap-x-5">
      {menulist.map((menu, i) => (
        <div
          key={i}
          className="p-2 rounded-full cursor-pointer hover:bg-gray-50"
          onClick={() => setSelectedMenu(menu)}
        >
          <p
            className={`text-gray-400 uppercase ${
              menu === selectedMenu && "font-bold text-red-600"
            }`}
          >
            {menu}
          </p>
        </div>
      ))}
    </div>
  );
};

export default ToolsMenu;
