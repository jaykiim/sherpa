import React from "react";

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  placeholder?: string;
}

const InputUnderlineSpread = ({ input, setInput, placeholder }: Props) => {
  return (
    <input
      id="project-title"
      value={input}
      autoFocus
      onChange={(e) => setInput(e.target.value)}
      type="text"
      placeholder={placeholder}
      className="w-full mt-2 pb-2 growing-underline-gradient sm:text-lg"
    />
  );
};

export default InputUnderlineSpread;
