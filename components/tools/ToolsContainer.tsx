import React from "react";
import { KeyResult, Modal } from "../../types";

interface Props {
  selectedKr: KeyResult;
  setModal: React.Dispatch<React.SetStateAction<Modal>>;
}

const ToolsContainer = ({ selectedKr, setModal }: Props) => {
  //

  return (
    <div className="pt-5">
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
    </div>
  );
};

export default ToolsContainer;
