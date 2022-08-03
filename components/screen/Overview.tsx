import React, { useState } from "react";
import { useRouter } from "next/router";

// components
import { Objective, Period } from "../";

// hooks
import { useGetProjectQuery } from "../../apiSlice";

const Overview = () => {
  //
  // 프로젝트 아이디
  const { id } = useRouter().query;

  // 프로젝트 정보
  const { data: project } = useGetProjectQuery(id as string);

  // * states -----------------------------------------------------------------------------------------------------------------------------------------------

  // objective 수정 입력
  const [objective, setObjective] = useState(project?.name || "");

  // period 수정 입력
  const [period, setPeriod] = useState({
    start: project?.start || "",
    end: project?.end || "",
  });

  // * -----------------------------------------------------------------------------------------------------------------------------------------------

  return (
    <div className="contentsContainer">
      {project && (
        <>
          <Objective
            input={objective}
            setInput={setObjective}
            defaultVal={project.name}
          />
          <Period
            input={period}
            setInput={setPeriod}
            defaultVal={{ start: project.start, end: project.end }}
          />
        </>
      )}
    </div>
  );
};

export default Overview;
