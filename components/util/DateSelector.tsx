import React from "react";

interface Props {
  id: "start" | "end";
  label: string;
  input: {
    start: string;
    end: string;
  };
  setInput: React.Dispatch<
    React.SetStateAction<{
      start: string;
      end: string;
    }>
  >;
}

const DateSelector = ({ id, label, input, setInput }: Props) => {
  return (
    <div className="flex items-center gap-x-11">
      <label className="font-bold text-gray-300">{label}</label>
      <input
        type="date"
        id={id}
        value={input[id]}
        onChange={(e) => setInput({ ...input, [id]: e.target.value })}
        className="focus:outline-none"
      />
    </div>
  );
};

export default DateSelector;
