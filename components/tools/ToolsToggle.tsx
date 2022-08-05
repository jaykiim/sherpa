import React, { useEffect } from "react";

// types
import { CheckedTools } from "./ToolsSettingForm";

interface Props {
  usingTools: string[];
  allTools: string[];
  setChecked: React.Dispatch<React.SetStateAction<CheckedTools>>;
}

const ToolsToggle = ({ allTools, usingTools, setChecked }: Props) => {
  //
  // 사용 중인 도구 기본 체크
  const isChecked = (tool: string) => usingTools.includes(tool);

  // checked 초기 상태 올바르게 수정
  useEffect(() => {
    //
    const checkMap = allTools.reduce(
      (a, tool) => ({ ...a, [tool]: isChecked(tool) }),
      {}
    ); // 실제 사용 중인 도구 map
    setChecked(checkMap);
  }, []);

  const onChange = (tool: string) => {
    setChecked((prev) => ({ ...prev, [tool]: !prev[tool] }));
  };

  return (
    <div>
      {allTools.map((tool, i) => (
        <div key={i} className="flex items-center gap-x-2">
          <input
            id={tool}
            type="checkbox"
            className="cursor-pointer"
            defaultChecked={isChecked(tool)}
            onChange={() => onChange(tool)}
          />
          <label htmlFor={tool} className="cursor-pointer">
            {tool}
          </label>
        </div>
      ))}
    </div>
  );
};

export default ToolsToggle;
