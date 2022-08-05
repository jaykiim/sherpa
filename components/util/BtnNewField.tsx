import React from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";

interface Props {
  handleClick: () => void;
  desc?: string;
}

const BtnNewField = ({ handleClick, desc }: Props) => {
  return (
    <div
      onClick={handleClick}
      className="group flex items-center gap-x-4 border border-dashed px-2 py-1 rounded-xl cursor-pointer hover:border-gray-500 sm:p-2"
    >
      <PlusCircleIcon className="h-6 text-gray-300 group-hover:text-gray-400" />
      <p className="text-gray-400">{desc}</p>
    </div>
  );
};

export default BtnNewField;
