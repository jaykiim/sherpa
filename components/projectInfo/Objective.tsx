import React, { useState } from "react";
import { BtnEdit, Subheading, InputUnderlineSpread } from "../";

interface Props {
  input: string;
  setInput: React.Dispatch<React.SetStateAction<string>>;
  defaultVal?: string; // 기존 저장되있던 값 (프로젝트 상세페이지에서만 넘어옴)
  onSubmit?: (
    setWrite: React.Dispatch<React.SetStateAction<boolean>>
  ) => Promise<void>;
}

const Objective = ({ input, setInput, defaultVal, onSubmit }: Props) => {
  //
  // 수정 버튼 클릭 여부
  const [write, setWrite] = useState(false);

  // 입력창 보여줄 조건
  const isWriteMode = defaultVal ? (write ? true : false) : true;

  return (
    <section className="flex flex-col gap-y-2">
      <Subheading title="objective">
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
        <InputUnderlineSpread
          input={input}
          setInput={setInput}
          placeholder="달성할 과제를 입력하세요"
        />
      ) : (
        <p>{defaultVal}</p>
      )}
    </section>
  );
};

export default Objective;
