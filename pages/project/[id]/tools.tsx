import React, { useEffect, useState } from "react";
import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { getServerSideProps } from "../../../lib/serverprops";

// components
import { PageContainer, Tools } from "../../../components";
import { useGetKeyResultsQuery, useGetProjectQuery } from "../../../apiSlice";

// hooks

const ToolsPage: NextPage = () => {
  const { id } = useRouter().query;

  const { data: project } = useGetProjectQuery(id as string);

  // kr 배열 가져오기
  const krlist = JSON.stringify(project?.keyresults || ["-1"]);
  const { data: keyresults } = useGetKeyResultsQuery(krlist);

  // keyresults 배열 패치 되면 첫번째 kr id 로컬스토리지에 저장
  useEffect(() => {
    if (keyresults) {
      localStorage.setItem("kr", keyresults[0].id);
    }
  }, [keyresults]);

  // 패치 완료 --> 로컬스토리지에 0번 kr id 저장 --> Tools --> ToolsContainer --> if 새 도구 버튼 클릭 --> ToolsSettingForm --> localStorage.getItem
  // 패치 완료 --> 로컬스토리지에 0번 kr id 저장 --> Tools --> if 다른 kr 클릭 --> KeyResultList --> 로컬스토리지 갱신

  return (
    <div>
      <Head>
        <title>Sherpa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer projectId={id as string}>
        {keyresults && <Tools keyresults={keyresults} />}
      </PageContainer>
    </div>
  );
};

export { getServerSideProps };

export default ToolsPage;
