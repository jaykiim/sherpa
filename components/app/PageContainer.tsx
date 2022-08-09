import React, { useState } from "react";
import { useSession } from "next-auth/react";

// components
import {
  ProjectsNavContainer,
  ProjectMenu,
  Modal,
  NewProjectForm,
  ToolsSettingForm,
  DeleteProjectForm,
  Drawer,
  Header,
  Login,
} from "../";

// types
import { Modal as ModalType } from "../../types";
import { useRouter } from "next/router";

interface Props {
  children: React.ReactNode;
  projectId?: string; // 프로젝트 상세 페이지에서만 넘어옴
  style?: string;
}

const PageContainer = ({ children, projectId }: Props) => {
  //
  const router = useRouter();
  const { data: session } = useSession();

  // 모달 열림 닫힘
  const [modal, setModal] = useState<ModalType>({
    desc: "",
    size: "",
    open: false,
  });

  // 모달 컨텐츠
  const modalContents = () => {
    //

    switch (modal.desc) {
      case "newProject":
        return <NewProjectForm />;

      case "tools":
        return <ToolsSettingForm />;

      case "deleteProject":
        return <DeleteProjectForm />;
    }
  };

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

  if (!session) router.push("/login");

  return (
    <div className="min-h-screen">
      <Header setDrawer={setDrawer} />
      <Drawer drawer={drawer} setDrawer={setDrawer}>
        <div className="p-3 mt-5">
          <ProjectsNavContainer />
        </div>
      </Drawer>

      <Modal modal={modal} setModal={setModal}>
        {modalContents()}
      </Modal>

      <div className={projectId ? "flex min-h-screen" : "pageContainer"}>
        {projectId && <ProjectMenu projectId={projectId} detail />}
        {childrenWithProps}
      </div>
    </div>
  );
};

export default PageContainer;
