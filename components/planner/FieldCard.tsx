import React, { useEffect } from "react";

// types
import { Feedback, Plan } from "../../types";

interface Props {
  children: React.ReactNode;
  fieldName: string;
  write: boolean;
  contents: Plan[] | Feedback[] | string;
  setContents:
    | React.Dispatch<React.SetStateAction<string>>
    | React.Dispatch<React.SetStateAction<Plan[]>>
    | React.Dispatch<React.SetStateAction<Feedback[]>>;

  contentsOrigin: Plan[] | Feedback[] | string;
}

const FieldCard = ({
  children,
  fieldName,
  write,
  contentsOrigin,
  setContents,
}: Props) => {
  //

  useEffect(
    () =>
      /* @ts-ignore */
      setContents(contentsOrigin),
    [write]
  );

  function instanceofPlan(object: any): object is Plan {
    return true;
  }

  return (
    <div className="mt-5">
      <h3 className="text-sm text-[#c2c1bf] font-bold">{fieldName}</h3>

      {write ? (
        children
      ) : typeof contentsOrigin === "string" ? (
        <p className="mt-2 p-2 text-sm rounded-md bg-[#F7F6F3] min-h-[36px]">
          {contentsOrigin}
        </p>
      ) : !contentsOrigin ? (
        <p className="mt-2 p-2 text-sm rounded-md bg-[#F7F6F3] min-h-[36px]" />
      ) : (
        contentsOrigin.map((content, i) => (
          <div
            key={i}
            className={`mt-2 p-2 text-sm rounded-md bg-[#F7F6F3] min-h-[36px] ${
              instanceofPlan(content) && content.done && "bg-blue-100"
            }`}
          >
            {content.content}
          </div>
        ))
      )}
    </div>
  );
};

export default FieldCard;
