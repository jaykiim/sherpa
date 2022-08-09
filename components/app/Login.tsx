import React from "react";
import Image from "next/image";
import Router from "next/router";
import { signIn, useSession } from "next-auth/react";

// styles
import facebook from "../../public/facebook.png";
import instagram from "../../public/instagram.png";
import google from "../../public/google.png";
import twitter from "../../public/twitter.png";

const Login = () => {
  const { data: session } = useSession();
  if (session) Router.push("/");

  const onLogoClick = (provider: string) =>
    signIn(provider, { callbackUrl: "/" });

  return (
    <div className="center-xy  h-screen bg-gray-50">
      <div className="w-[320px] -translate-y-1/2 p-6 rounded-lg flex flex-col gap-y-8">
        {/*  */}
        {/* GUIDE 제목 및 설명 */}

        <section>
          <h1 className="uppercase text-2xl font-extrabold">sherpa</h1>
          <p className="text-gray-400 text-sm">
            셰르파에 오신 것을 환영합니다!
          </p>
        </section>

        {/* GUIDE 로그인 양식 */}

        {/* <section className="flex flex-col gap-y-4">
          <div className="flex flex-col">
            <label htmlFor="email" className="text-sm text-gray-400">
              Email
            </label>
            <input
              type="text"
              id="email"
              className="bg-transparent border-b py-1 focus:outline-none"
            />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="text-sm text-gray-400">
              Password
            </label>
            <input
              type="password"
              id="password"
              className="bg-transparent border-b py-1 focus:outline-none"
            />
          </div>
        </section> */}

        <div className="flex-col gap-y-8">
          {/*  */}
          {/* GUIDE 로그인 (일반)  */}

          {/* <section className="flex flex-col gap-y-3 items-center">
            <button className="btn-rounded btn-md border-none bg-blue-600 text-white w-48 hover:bg-blue-700">
              로그인
            </button>

            <p className="cursor-pointer text-sm text-gray-400 ml-2 hover:text-gray-600">
              비밀번호를 잊으셨나요?
            </p>
          </section>

          <div className="w-full h-[1px] relative border-b">
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 text-sm bg-gray-50 p-2 text-gray-400">
              또는
            </div>
          </div> */}

          {/* GUIDE 로그인 (소셜) */}

          <div
            onClick={() => onLogoClick("google")}
            className="flex items-center border rounded-full cursor-pointer p-3 gap-x-4"
          >
            <Image src={google} width={35} height={35} />
            {/* <Image
              src={facebook}
              width={35}
              height={35}
              onClick={() => onLogoClick("facebook")}
              className="cursor-pointer"
            />
            <Image
              src={twitter}
              width={35}
              height={35}
              onClick={() => onLogoClick("twitter")}
              className="cursor-pointer"
            />
            <Image
              src={instagram}
              width={35}
              height={35}
              onClick={() => onLogoClick("instagram")}
              className="cursor-pointer"
            /> */}
            <div className="w-full text-center">
              <p>구글 계정으로 시작하기</p>
            </div>
          </div>

          {/* <p className="text-gray-400 text-sm tracking-wide group cursor-pointer">
            계정이 없으신가요?{" "}
            <b className="text-gray-600 group-hover:text-blue-600">회원가입</b>
          </p> */}
        </div>
      </div>
    </div>
  );
};

export default Login;
