import React from "react";
import { useRouter } from "next/router";

// hooks
import { useGetProjectQuery } from "../../apiSlice";
import Objective from "../projectInfo/Objective";

const Overview = () => {
  //
  // 프로젝트 아이디
  const { id } = useRouter().query;

  // 프로젝트 정보
  const { data: project } = useGetProjectQuery(id as string);

  return (
    <div className="p-4">
      <Objective />
    </div>
  );
};

export default Overview;
