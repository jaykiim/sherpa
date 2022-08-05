import React from "react";

// components
import { ArrowDropdown } from "../";

// types
import { KeyResult as KeyResultType } from "../../types";

interface Props {
  keyresults: KeyResultType[];
  selectedKr: string;
  setSelectedKr: React.Dispatch<React.SetStateAction<string>>;
}

const KeyResultList = ({ keyresults, selectedKr, setSelectedKr }: Props) => {
  //
  const onKrClick = (id: string) => {
    setSelectedKr(id);
    localStorage.setItem("kr", id);
  };

  return (
    <ArrowDropdown title="key results ">
      <div className="ml-8 mt-2 max-h-[110px] overflow-y-auto">
        {keyresults.map((kr) => (
          <div
            key={kr.id}
            onClick={() => onKrClick(kr.id)}
            className="cursor-pointer flex items-center gap-x-2 group"
          >
            {/*  */}
            {/* TODO 컬러칩 */}

            <div className="xy-center">
              <div className="circle-5" style={{ backgroundColor: kr.color }} />
            </div>

            {/* TODO Key Result */}

            <p
              className={`text-sm mt-2 pb-2 group-hover:font-bold ${
                kr.id === selectedKr && "font-bold"
              }`}
            >
              {kr.name}
            </p>
          </div>
        ))}
      </div>
    </ArrowDropdown>
  );
};

export default KeyResultList;
