import React, { useState } from "react";

// components
import { KeyResultList, ToolsContainer } from "../";

// types
import { KeyResult as KeyResultType, RootProps } from "../../types";

interface Props extends RootProps {
  keyresults: KeyResultType[];
}

const Tools = ({ keyresults, setModal }: Props) => {
  const [selectedKrId, setSelectedKrId] = useState(keyresults[0].id);

  const selectedKr = keyresults.find(
    (kr) => kr.id === selectedKrId
  ) as KeyResultType;

  return (
    <div className="contentsContainer gap-y-2 divide-y">
      <KeyResultList
        keyresults={keyresults}
        selectedKr={selectedKrId}
        setSelectedKr={setSelectedKrId}
      />
      <ToolsContainer selectedKr={selectedKr} setModal={setModal!} />
    </div>
  );
};

export default Tools;
