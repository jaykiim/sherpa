import React, { useState } from "react";
import { useSession } from "next-auth/react";

// components
import { ProjectsNavContainer, ProjectMenu } from "../";

// components
import { Drawer, Header, Login } from "../index";

interface Props {
  children: React.ReactNode;
  projectId?: string;
  style?: string;
}

const PageContainer = ({ children, projectId }: Props) => {
  //
  const { data: session } = useSession();

  // 모달 열림 닫힘
  const [modal, setModal] = useState(false);

  // 드로어 열림 닫힘
  const [drawer, setDrawer] = useState(false);

  // children 에 상태 전달
  const childrenWithProps = React.Children.map(children, (child) => {
    if (React.isValidElement(child))
      return React.cloneElement(child, {
        ...child.props,
        modal,
        setModal,
        drawer,
        setDrawer,
      });
  });

  if (!session) return <Login />;

  return (
    <div className="min-h-screen">
      <Header setDrawer={setDrawer} />
      <Drawer drawer={drawer} setDrawer={setDrawer}>
        <div className="p-3 mt-5">
          <ProjectsNavContainer />
        </div>
      </Drawer>

      <div className={projectId ? "flex min-h-screen" : "pageContainer"}>
        {projectId && <ProjectMenu projectId={projectId} detail />}
        {childrenWithProps}
      </div>
    </div>
  );
};

export default PageContainer;
