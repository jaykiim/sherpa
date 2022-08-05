import React, { useEffect, useState } from "react";

// components
import { ModalSubmitHeader, ToolsToggle } from "../";

// hooks
import { useGetKeyResultQuery } from "../../apiSlice";

export interface CheckedTools {
  [index: string]: boolean;
}

const ToolsSettingForm = () => {
  //
  // * kr ------------------------------------------------------------------------------------------------------------------------------------------------

  // 현재 선택된 kr id
  const selectedKrId = localStorage.getItem("kr");

  // 현재 선택된 kr
  const { data: selectedKr } = useGetKeyResultQuery(selectedKrId!);

  // * tool ------------------------------------------------------------------------------------------------------------------------------------------------

  // 전체 도구
  const allTools = ["planner", "tasker"];

  // 전체 도구 map
  const allToolsMap = allTools.reduce(
    (a, tool) => ({ ...a, [tool]: false }),
    {}
  ); // 아직 데이터가 도착하지 않아서 일단 false 로 두고 ToolsToggle 최초 렌더 시 useEffect 로 올바르게 수정할것임

  // 현재 체크한 도구 상태
  const [checked, setChecked] = useState<CheckedTools>(allToolsMap);

  //
  const onSubmit = async () => {};
  const disabled = false;

  return (
    <div>
      {selectedKr && (
        <>
          <ModalSubmitHeader
            title="도구 사용 설정"
            disabled={disabled}
            onSubmit={onSubmit}
          />

          <div className="p-3 flex flex-col gap-y-3">
            <ToolsToggle
              allTools={allTools}
              usingTools={selectedKr.tools}
              setChecked={setChecked}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default ToolsSettingForm;
