import React, { Dispatch, SetStateAction } from "react";

interface DrawerProps {
  children: React.ReactNode;
  drawer: boolean;
  setDrawer: Dispatch<SetStateAction<boolean>>;
}

const Drawer = ({ children, drawer, setDrawer }: DrawerProps) => {
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
        {children}
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
