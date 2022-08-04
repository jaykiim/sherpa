import React from "react";
import Head from "next/head";
import { NextPage } from "next";
import { useRouter } from "next/router";
import { getServerSideProps } from "../../../lib/serverprops";
// components
import { PageContainer, Overview } from "../../../components";

const OverviewPage: NextPage = () => {
  const { id } = useRouter().query;

  return (
    <div>
      <Head>
        <title>Sherpa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer projectId={id as string}>
        <Overview />
      </PageContainer>
    </div>
  );
};

export { getServerSideProps };

export default OverviewPage;
