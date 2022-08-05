import React from "react";

interface Props {
  children?: React.ReactNode;
  title: string;
}

const Subheading = ({ children, title }: Props) => {
  return (
    <div className="flex items-center gap-x-3">
      <label className="label-bg-gray font-bold">{title}</label>

      {children}
    </div>
  );
};

export default Subheading;
