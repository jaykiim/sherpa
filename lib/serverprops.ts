import { GetServerSideProps } from "next";
import { getProviders, getSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async (context) => {
  const providers = await getProviders();
  const session = await getSession(context);

  return {
    props: {
      providers,
      session,
    },
  };
};
