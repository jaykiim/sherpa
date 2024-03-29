import React, { useContext, useEffect, useState } from "react";
import { useRouter } from "next/router";

// components
import { Objective, Period, KeyResultContainer } from "../";

// hooks
import {
  useGetKeyResultsQuery,
  useGetProjectQuery,
  useUpdateProjectMutation,
} from "../../apiSlice";
import { KeyResult, Project, RootProps } from "../../types";
import { ModalContext } from "../util/Modal";

const Overview = ({ setModal }: RootProps) => {
  //
  // 프로젝트 아이디
  const { id } = useRouter().query;

  // 프로젝트 정보
  const { data: project } = useGetProjectQuery(id as string);

  // kr 배열 가져오기
  const krlist = JSON.stringify(project?.keyresults || ["-1"]);
  const { data: keyresultsData } = useGetKeyResultsQuery(krlist);

  // * states -----------------------------------------------------------------------------------------------------------------------------------------------

  // objective 수정 입력
  const [objective, setObjective] = useState("");

  // period 수정 입력
  const [period, setPeriod] = useState({ start: "", end: "" });

  // key result 수정 입력
  const [keyresults, setKeyresults] = useState([{}]);

  useEffect(() => {
    if (project && keyresultsData) {
      setObjective(project.name);
      setPeriod({ start: project.start, end: project.end });
      setKeyresults(keyresultsData);
    }
  }, [project, keyresultsData]);

  // * -----------------------------------------------------------------------------------------------------------------------------------------------

  const [updateProject] = useUpdateProjectMutation();
  const onSubmit = async (
    setWrite: React.Dispatch<React.SetStateAction<boolean>>
  ) => {
    if (!project) return;

    const reqbody: Project = {
      ...project,
      name: objective,
      start: period.start,
      end: period.end,
    };

    try {
      await updateProject({ project: reqbody });
      setWrite(false);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="contentsContainer">
      {project && (
        <>
          <Objective
            input={objective}
            setInput={setObjective}
            defaultVal={project.name}
            onSubmit={onSubmit}
          />
          <Period
            input={period}
            setInput={setPeriod}
            defaultVal={{ start: project.start, end: project.end }}
            onSubmit={onSubmit}
          />

          {keyresultsData && (
            <KeyResultContainer
              defaultVal={keyresultsData}
              input={keyresults as KeyResult[]}
              setInput={
                setKeyresults as React.Dispatch<
                  React.SetStateAction<KeyResult[]>
                >
              }
            />
          )}

          <button
            onClick={() =>
              setModal!({
                desc: "deleteProject",
                size: "w-11/12 sm:w-3/4 max-w-[500px] h-[30%] max-h-[300px] ",
                open: true,
              })
            }
            className="ml-auto bg-red-700 text-gray-50 py-1 px-2 text-sm rounded-md hover:bg-red-600"
          >
            프로젝트 삭제
          </button>
        </>
      )}
    </div>
  );
};

export default Overview;
