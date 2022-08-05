import React, { useContext, useState } from "react";
import { useRouter } from "next/router";
import { nanoid } from "@reduxjs/toolkit";
import { useSession } from "next-auth/react";

// components
import { Objective, Period, KeyResultContainer, ModalSubmitHeader } from "../";

// hooks
import {
  useUpdateKeyResultsMutation,
  useUpdateProjectMutation,
} from "../../apiSlice";

// types
import { KeyResult, Project } from "../../types";
import { toolkit } from "../../utils";
import { ModalContext } from "../util/Modal";

const NewProjectForm = () => {
  //
  const projectId = nanoid();
  const initKr: KeyResult[] = [
    {
      id: nanoid(),
      name: "",
      color: toolkit.getRandomColor(),
      projectId,
      tools: [],
      plans: [],
      tasks: [],
    },
  ];

  const router = useRouter();
  const { data: session } = useSession();
  const setModal = useContext(ModalContext);

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
      setModal!((s) => ({ ...s, open: false }));
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

      <ModalSubmitHeader
        title="New Project"
        disabled={disabled}
        onSubmit={onSubmit}
      />

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
