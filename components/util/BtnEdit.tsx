import React from "react";
import { PencilIcon } from "@heroicons/react/outline";

interface Props {
  write: boolean;
  setWrite: React.Dispatch<React.SetStateAction<boolean>>;
  onSubmit: React.MouseEventHandler<HTMLButtonElement>;
  onCancel: React.MouseEventHandler<HTMLButtonElement>;
  disable: boolean;
}

const BtnEdit = ({ write, setWrite, onSubmit, onCancel, disable }: Props) => {
  return write ? (
    <div className="flex gap-x-2">
      <button
        onClick={onSubmit}
        disabled={disable}
        className="px-2 rounded-md border-2 text-sm text-gray-400 disabled:cursor-not-allowed"
      >
        확인
      </button>

      <button
        onClick={onCancel}
        className="px-2 rounded-md border-2 border-red-600 text-sm text-red-600 "
      >
        취소
      </button>
    </div>
  ) : (
    <PencilIcon
      onClick={() => setWrite(!write)}
      className="w-4 h-4 cursor-pointer text-gray-300 hover:text-gray-500"
    />
  );
};

export default BtnEdit;
