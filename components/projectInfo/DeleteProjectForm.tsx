import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useDeleteProjectMutation, useGetProjectQuery } from "../../apiSlice";
import ModalSubmitHeader from "../util/ModalSubmitHeader";

const DeleteProjectForm = () => {
  //
  const router = useRouter();

  const { data: session } = useSession();
  const { id: projectId } = router.query;
  const { data: project } = useGetProjectQuery(projectId as string);

  const [input, setInput] = useState("");
  const [error, setError] = useState("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value !== project!.name) {
      setError("프로젝트 명과 일치하지 않습니다");
    } else setError("");

    setInput(e.target.value);
  };

  const [deleteProject] = useDeleteProjectMutation();
  const onSubmit = async () => {
    try {
      await deleteProject({
        userId: session!.user.uid,
        projectId: projectId as string,
      });
      setError("");
      setInput("");
      router.push(`/`);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <article className="flex flex-col h-full">
      {project && (
        <>
          <ModalSubmitHeader
            title="프로젝트 삭제"
            disabled={!!error}
            onSubmit={onSubmit}
          />

          <div className="flex flex-col p-2 justify-center h-full bg-red-100">
            <p className="text-red-700 text-lg">⚠️ 정말 삭제하시겠습니까?</p>
            <p className="text-xs text-gray-500">
              프로젝트를 삭제하시려면 프로젝트명 (OBJECTIVE) 를 입력하세요
            </p>

            <div className="mt-3">
              <input
                type="text"
                id="projectName"
                className="focus:outline-none w-full py-1 px-2 rounded-md bg-transparent border border-gray-700 placeholder:text-sm placeholder:text-gray-500"
                value={input}
                onChange={onChange}
                placeholder="여기에 OBJECTIVE 입력"
              />
            </div>

            <p className="text-xs mt-2">{error}</p>
          </div>
        </>
      )}
    </article>
  );
};

export default DeleteProjectForm;
