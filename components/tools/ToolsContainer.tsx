import React, { useEffect, useState } from "react";

// components
import { PlannerContainer, TaskerContainer, ToolsMenu, NoTools } from "../";

// types
import { KeyResult, Modal } from "../../types";

interface Props {
  selectedKr: KeyResult;
  setModal: React.Dispatch<React.SetStateAction<Modal>>;
}

const ToolsContainer = ({ selectedKr, setModal }: Props) => {
  //
  const [selectedMenu, setSelectedMenu] = useState(selectedKr.tools[0]);

  useEffect(() => {
    setSelectedMenu(selectedKr.tools[0]);
  }, [selectedKr]);

  // selectedMenu 에 따라 보여줄 컴포넌트
  const showTool = () => {
    switch (selectedMenu) {
      case "planner":
        return <PlannerContainer />;

      case "tasker":
        return <TaskerContainer />;

      default:
        return <NoTools />;
    }
  };

  return (
    <div className="pt-1">
      <header className="flex items-center justify-between">
        <ToolsMenu
          selectedKr={selectedKr}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />

        <button
          className="block ml-auto btn-outline-rounded lg:btn-sm"
          onClick={() =>
            setModal!({
              desc: "tools",
              size: "w-3/4 max-w-[500px] h-[50%] max-h-[700px] ",
              open: true,
            })
          }
        >
          새 도구
        </button>
      </header>
      <p className="-translate-y-1 ml-2 text-xs text-gray-400">
        ⚠️ PLANNER 도구는 KEY RESULTS 와 무관합니다
      </p>

      <div className="mt-7">{showTool()}</div>
    </div>
  );
};

export default ToolsContainer;
