import React from "react";
import { XCircleIcon } from "@heroicons/react/outline";

const NoTools = () => {
  return (
    <div className="center-xy mt-32 flex flex-col text-gray-400 ">
      <XCircleIcon className="w-24 h-24 text-gray-300" />
      <p className="text-lg font-bold">사용 중인 도구가 없습니다.</p>
      <p className="text-sm">새 도구 버튼을 클릭하여 추가해주세요.</p>
    </div>
  );
};

export default NoTools;
