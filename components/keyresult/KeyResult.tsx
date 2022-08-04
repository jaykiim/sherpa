import { XCircleIcon } from "@heroicons/react/outline";
import React from "react";
import { KeyResult } from "../../types";

interface Props {
  id: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  color: string;
  isWriteMode: boolean;
  krArr: KeyResult[];
  setKrArr: React.Dispatch<React.SetStateAction<KeyResult[]>>;
}

const KeyResult = ({
  id,
  value,
  onChange,
  color,
  isWriteMode,
  krArr,
  setKrArr,
}: Props) => {
  //
  const deleteKr = (id: string) =>
    setKrArr((krArr) => krArr.filter((kr) => kr.id !== id));

  console.log(color);

  return (
    <div className="group flex items-center gap-x-2">
      {/*  */}
      {/* TODO kr 색상 */}

      <div className="xy-center">
        <div className="circle-5" style={{ backgroundColor: color }} />
      </div>

      {isWriteMode ? (
        <>
          {/*  */}
          {/* TODO 입력 */}

          <input
            type="text"
            id={id}
            value={value}
            onChange={onChange}
            placeholder="핵심 결과를 입력하세요"
            className="w-full text-sm mt-2 pb-2 outline-none sm:text-md"
          />

          {/* TODO 제거 */}

          {krArr.length !== 1 && (
            <div
              onClick={() => deleteKr(id)}
              className="hidden ml-auto group-hover:block"
            >
              <XCircleIcon className="h-6 cursor-pointer p-0 hoverAnimation" />
            </div>
          )}
        </>
      ) : (
        <p>{value}</p>
      )}
    </div>
  );
};

export default KeyResult;
