import React, { useState } from "react";

// components
import { PlannerContainer, TaskerContainer, ToolsMenu } from "../";

// types
import { KeyResult, Modal } from "../../types";

interface Props {
  selectedKr: KeyResult;
  setModal: React.Dispatch<React.SetStateAction<Modal>>;
}

const ToolsContainer = ({ selectedKr, setModal }: Props) => {
  //
  const [selectedMenu, setSelectedMenu] = useState(selectedKr.tools[0]);

  // selectedMenu 에 따라 보여줄 컴포넌트
  const showTool = () => {
    switch (selectedMenu) {
      case "planner":
        return <PlannerContainer />;

      case "tasker":
        return <TaskerContainer />;
    }
  };

  return (
    <div className="pt-5">
      <header className="flex items-center justify-between">
        <ToolsMenu
          selectedKr={selectedKr}
          selectedMenu={selectedMenu}
          setSelectedMenu={setSelectedMenu}
        />

        <button
          className="block ml-auto btn-outline-rounded "
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

      <div className="mt-5">{showTool()}</div>
    </div>
  );
};

export default ToolsContainer;
