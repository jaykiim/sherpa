import React, { createContext, Dispatch, SetStateAction } from "react";
import { LogoutIcon } from "@heroicons/react/outline";
import { useSession } from "next-auth/react";
import Image from "next/image";

export const DrawerContext =
  createContext<null | Dispatch<SetStateAction<boolean>>>(null);

interface DrawerProps {
  children: React.ReactNode;
  drawer: boolean;
  setDrawer: Dispatch<SetStateAction<boolean>>;
}

const Drawer = ({ children, drawer, setDrawer }: DrawerProps) => {
  const { data: session } = useSession();

  return (
    <main
      className={
        "overlay " +
        (drawer
          ? "transition-opacity opacity-100 duration-500 translate-x-0"
          : "transition-translate delay-500 opacity-0 -translate-x-full")
      }
    >
      <section
        className={
          " w-2/3 max-w-[500px] left-0 absolute bg-white h-full shadow-xl delay-400 duration-500 ease-in-out transition-all transform  " +
          (drawer ? " translate-x-0 " : " -translate-x-full ")
        }
      >
        <div className="p-3 border-b text-sm flex justify-between items-center">
          <div className="flex items-center gap-x-3">
            <Image
              alt="user profile picture"
              src={session!.user.image || ""}
              width={30}
              height={30}
              className="rounded-full"
            />

            <p>반갑습니다, {session!.user.name}님</p>
          </div>

          <div className="hoverAnimation w-7 h-7 center-xy p-0">
            <LogoutIcon className="w-5 h-5" />
          </div>
        </div>

        <DrawerContext.Provider value={setDrawer}>
          {children}
        </DrawerContext.Provider>
      </section>

      <section
        className=" w-screen h-full cursor-pointer "
        onClick={() => {
          setDrawer(false);
        }}
      />
    </main>
  );
};

export default Drawer;
