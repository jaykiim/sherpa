import React, { createContext, Dispatch, SetStateAction } from "react";
import { Modal } from "../../types";

export const ModalContext =
  createContext<null | Dispatch<SetStateAction<Modal>>>(null);

interface Props {
  children: React.ReactNode;
  modal: Modal;
  setModal: Dispatch<SetStateAction<Modal>>;
}

const Modal = ({ children, modal, setModal }: Props) => {
  return (
    <main
      className={
        "overlay " +
        (modal.open
          ? "transition-opacity opacity-100 duration-500"
          : "transition-opacity opacity-0 -translate-x-full")
      }
    >
      <section
        className={`${modal.size} rounded-lg bg-white center-xy-absolute shadow-xl transition-all transform delay-400 duration-500 ease-in-out `}
      >
        <ModalContext.Provider value={setModal}>
          {children}
        </ModalContext.Provider>
      </section>
      <section
        className="w-screen h-full cursor-pointer"
        onClick={() => setModal({ ...modal, open: false })}
      />
    </main>
  );
};

export default Modal;
