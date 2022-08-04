import React, { useState } from "react";
import { useSession } from "next-auth/react";

// components
import { ProjectsNavContainer, ProjectMenu, Modal, NewProjectForm } from "../";

// components
import { Drawer, Header, Login } from "../index";
import { Modal as ModalType } from "../../types";

interface Props {
  children: React.ReactNode;
  projectId?: string;
  style?: string;
}

const PageContainer = ({ children, projectId }: Props) => {
  //
  const { data: session } = useSession();

  // 모달 열림 닫힘
  const [modal, setModal] = useState<ModalType>({
    desc: "",
    size: "",
    open: false,
  });

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

      <Modal modal={modal} setModal={setModal}>
        {modal.desc === "newProject" && <NewProjectForm setModal={setModal} />}
      </Modal>

      <div
        className={projectId ? "flex gap-x-10 min-h-screen" : "pageContainer"}
      >
        {projectId && <ProjectMenu projectId={projectId} detail />}
        {childrenWithProps}
      </div>
    </div>
  );
};

export default PageContainer;
