import React, { useState } from "react";
import { useRouter } from "next/router";
import { nanoid } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";

// components
import { Objective, Period, KeyResultContainer } from "../";

// hooks
import {
  useUpdateKeyResultsMutation,
  useUpdateProjectMutation,
} from "../../apiSlice";

// types
import { KeyResult, Modal, Project } from "../../types";
import { toolkit } from "../../utils";

interface Props {
  setModal: React.Dispatch<React.SetStateAction<Modal>>;
}

const NewProjectForm = ({ setModal }: Props) => {
  //
  const projectId = nanoid();
  const initKr = [
    {
      id: nanoid(),
      name: "",
      color: toolkit.getRandomColor(),
      projectId,
      tools: { plans: [], tasks: [] },
    },
  ];

  const router = useRouter();
  const { data: session } = useSession();

  // * states ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // objective 입력
  const [objective, setObjective] = useState("");

  // period 입력
  const [period, setPeriod] = useState({ start: "", end: "" });

  // kr 입력
  const [keyresults, setKeyresults] = useState<KeyResult[]>(initKr);

  // * handler ----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  // 서버 등록
  const [updateProject, { isLoading: projectLoading }] =
    useUpdateProjectMutation();
  const [updateKeyresults, { isLoading: krLoading }] =
    useUpdateKeyResultsMutation();

  const onSubmit = async () => {
    //
    const krId = keyresults.map((kr) => kr.id);

    const project: Project = {
      id: projectId,
      name: objective,
      start: period.start,
      end: period.end,
      keyresults: krId,
    };

    try {
      await updateProject({ userId: session!.user.uid, project });
      await updateKeyresults({ projectId, krArr: keyresults });

      setObjective("");
      setKeyresults(initKr);
      setPeriod({ start: "", end: "" });
      setModal((s) => ({ ...s, open: false }));
      router.push(`/project/${project.id}`);
      //
    } catch (error) {
      console.log(error);
    }
  };

  // 등록 조건
  const invalidPeriod = period.end <= period.start;
  const disabled =
    !!keyresults.find((kr) => !kr.name) ||
    !objective ||
    invalidPeriod ||
    projectLoading ||
    krLoading;

  return (
    <article className="flex flex-col h-full">
      {/*  */}
      {/* TODO 헤더 */}

      <section className="flex items-center border-b border-gray-light ">
        <h1 className="p-3 font-bold uppercase sm:text-lg">New Project</h1>

        <button
          disabled={disabled}
          onClick={onSubmit}
          className={`ml-auto mr-3 btn-sm btn-hover-red btn-rounded ${
            disabled &&
            "hover:bg-white hover:text-gray-400 hover:border-gray-300 cursor-not-allowed"
          }`}
        >
          제출
        </button>
      </section>

      <form className="flex flex-1 flex-col px-3 py-6 gap-y-7 tracking-wide sm:p-6 overflow-y-auto">
        {/*  */}
        {/* TODO 목표 */}

        <Objective input={objective} setInput={setObjective} />

        {/* TODO 핵심 결과 */}

        <KeyResultContainer input={keyresults} setInput={setKeyresults} />

        {/* TODO 기간 */}

        <Period input={period} setInput={setPeriod} />
      </form>
    </article>
  );
};

export default NewProjectForm;
