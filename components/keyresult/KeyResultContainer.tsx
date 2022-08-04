import React, { useState } from "react";
import { nanoid } from "@reduxjs/toolkit";
import { useRouter } from "next/router";

// components
import { Subheading, BtnEdit, KeyResult } from "../";

// types
import { KeyResult as KeyResultType } from "../../types";
import BtnNewField from "../util/BtnNewField";

const getRandomColor = () =>
  "#" + Math.round(Math.random() * 0xffffff).toString(16);

/* ========================================================================================================================================================================================================================================================
? 컴포넌트 설명 
overview 또는 프로젝트 생성 모달의 key results 파트 전체 
======================================================================================================================================================================================================================================================== */

interface Props {
  defaultVal: KeyResultType[]; // 기존 저장되있던 값 (overview 에서만 넘어옴)
  input: KeyResultType[];
  setInput: React.Dispatch<React.SetStateAction<KeyResultType[]>>;
}

const KeyResultContainer = ({ defaultVal, input, setInput }: Props) => {
  //
  // 현재 프로젝트 아이디
  const { projectId } = useRouter().query;

  //
  const [write, setWrite] = useState(false);

  // 입력창 보여줄 조건
  const isWriteMode = defaultVal ? (write ? true : false) : true;

  //
  const inputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.preventDefault();
    setInput((krArr) =>
      krArr.map((kr) =>
        kr.id === e.target.id ? { ...kr, name: e.target.value } : kr
      )
    );
  };

  // 새 입력 추가
  const addInput = () => {
    setInput((krArr) => [
      ...krArr,
      {
        id: nanoid(),
        color: getRandomColor(),
        name: "",
        projectId: projectId as string,
        tools: { plans: [], tasks: [] },
      },
    ]);
  };

  // 수정 취소
  const cancelWrite = () => {
    setWrite(false);
    setInput(defaultVal);
  };

  //
  const singleKr = (kr: KeyResultType) => (
    <KeyResult
      key={kr.id}
      id={kr.id}
      value={kr.name}
      onChange={inputChange}
      color={kr.color}
      isWriteMode={isWriteMode}
      krArr={input}
      setKrArr={setInput}
    />
  );

  return (
    <div className="flex flex-col gap-y-2">
      <Subheading title="key results">
        {defaultVal && (
          <BtnEdit
            write={write}
            setWrite={setWrite}
            onSubmit={() => {}}
            onCancel={cancelWrite}
            disable={false}
          />
        )}
      </Subheading>

      <div>
        {isWriteMode ? (
          <>
            {/*  */}
            {/* TODO 입력 */}

            <div className="max-h-[150px] overflow-y-auto">
              {input.map(singleKr)}
            </div>

            {/* TODO 입력 추가 */}

            <BtnNewField handleClick={addInput} />
          </>
        ) : (
          <div className="max-h-[150px] overflow-y-auto">
            {defaultVal.map(singleKr)}
          </div>
        )}
      </div>
    </div>
  );
};

export default KeyResultContainer;
