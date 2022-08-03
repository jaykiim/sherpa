import React, { useState } from "react";
import { useSession } from "next-auth/react";

// components
import { Drawer, Header, Login } from "../index";

const PageContainer = () => {
  //
  const { data: session } = useSession();
  console.log(session);

  // 드로어 열림 닫힘
  const [drawer, setDrawer] = useState(false);

  if (!session) return <Login />;

  return (
    <div className="min-h-screen">
      <Header setDrawer={setDrawer} />
      <Drawer drawer={drawer} setDrawer={setDrawer}>
        <></>
      </Drawer>
    </div>
  );
};

export default PageContainer;
