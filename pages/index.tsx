import { useSession } from "next-auth/react";
import { getServerSideProps } from "../lib/serverprops";
import Head from "next/head";

// components
import { PageContainer } from "../components";

// hooks
import { useGetUserQuery, useUpdateUserMutation } from "../apiSlice";

// types
import type { NextPage } from "next";
import { User } from "../types";
import ProjectList from "../components/projectInfo/ProjectList";
import { useEffect } from "react";

const Home: NextPage = () => {
  //
  // 유저 조회
  const { data: session } = useSession();
  const { data: user, isLoading } = useGetUserQuery(session!.user.uid);

  // * 유저 정보 없는 경우 ----------------------------------------------------------------------------------------------------------------
  // 로딩 중이지도 않은데 user === undefined

  const [updateUser] = useUpdateUserMutation();

  const addUser = async () => {
    //
    if (!isLoading && !user) {
      console.log("유저 등록");

      const userInfo: User = {
        id: session!.user.uid,
        name: session!.user.name as string,
        projects: [],
      };

      try {
        await updateUser(userInfo);
      } catch (e) {
        console.log(e);
      }
    }
  };

  useEffect(() => {
    addUser();
  }, [user]);

  return (
    <div className="">
      <Head>
        <title>Sherpa</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <PageContainer>
        <ProjectList title="진행 중인 프로젝트" />
        <ProjectList title="종료된 프로젝트" closed />
      </PageContainer>
    </div>
  );
};

export { getServerSideProps };

export default Home;
