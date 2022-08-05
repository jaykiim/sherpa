import React, { useState } from "react";
import BtnEdit from "../util/BtnEdit";
import DateSelector from "../util/DateSelector";
import Subheading from "../util/Subheading";

interface Props {
  input: { start: string; end: string };
  setInput: React.Dispatch<
    React.SetStateAction<{
      start: string;
      end: string;
    }>
  >;
  defaultVal?: { start: string; end: string }; // 기존에 저장되있던 값 (상세페이지에서만 넘어옴)
  onSubmit?: (
    setWrite: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
}

const Period = ({ defaultVal, input, setInput, onSubmit }: Props) => {
  //
  const [write, setWrite] = useState(false);

  // 입력창 보여줄 조건
  const isWriteMode = defaultVal ? (write ? true : false) : true;

  return (
    <div className="flex flex-col gap-y-2">
      <Subheading title="period">
        {defaultVal && (
          <BtnEdit
            write={write}
            setWrite={setWrite}
            onSubmit={() => onSubmit!(setWrite)}
            onCancel={() => {
              setWrite(false);
              setInput(defaultVal);
            }}
            disable={!input}
          />
        )}
      </Subheading>

      {isWriteMode ? (
        <div className="flex flex-col gap-y-3 mt-3 ml-2">
          <DateSelector
            id="start"
            label="시작"
            input={input}
            setInput={setInput}
          />
          <DateSelector
            id="end"
            label="종료"
            input={input}
            setInput={setInput}
          />
        </div>
      ) : (
        <p>
          {defaultVal!.start} ~ {defaultVal!.end}
        </p>
      )}
    </div>
  );
};

export default Period;
