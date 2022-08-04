import React from "react";
import { PlusCircleIcon } from "@heroicons/react/outline";

interface Props {
  handleClick: () => void;
}

const BtnNewField = ({ handleClick }: Props) => {
  return (
    <div
      onClick={handleClick}
      className="group border border-dashed px-2 py-1 rounded-xl cursor-pointer hover:border-gray-500 sm:p-2"
    >
      <PlusCircleIcon className="h-6 text-gray-300 group-hover:text-gray-400" />
    </div>
  );
};

export default BtnNewField;
