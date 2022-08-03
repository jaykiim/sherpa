import type { NextPage } from "next";
import Head from "next/head";
import { getServerSideProps } from "../lib/serverprops";

// components
import { PageContainer } from "../components";

const Home: NextPage = () => {
  return (
    <div className="">
      <Head>
        <title>Sherpa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer></PageContainer>
    </div>
  );
};

export { getServerSideProps };

export default Home;
