import React from "react";

interface Props {
  title: string;
  disabled: boolean;
  onSubmit: () => Promise<void>;
}

const ModalSubmitHeader = ({ title, disabled, onSubmit }: Props) => {
  //

  return (
    <section className="flex items-center border-b border-gray-light ">
      <h1 className="p-3 font-bold uppercase sm:text-lg">{title}</h1>

      <button
        disabled={disabled}
        onClick={onSubmit}
        className={`ml-auto mr-3 btn-outline-rounded ${
          disabled &&
          "hover:bg-white hover:text-gray-400 hover:border-gray-300 cursor-not-allowed"
        }`}
      >
        제출
      </button>
    </section>
  );
};

export default ModalSubmitHeader;
