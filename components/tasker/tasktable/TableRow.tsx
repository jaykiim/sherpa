import React from "react";

// styles
import { CheckCircleIcon, TrashIcon } from "@heroicons/react/outline";

// types
import { Task } from "../../../types";

interface Props {
  task: Task;
  write?: boolean;
  taskInputs: Task[];
  setTaskInputs: (value: React.SetStateAction<Task[]>) => void;
  onTaskChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onSubmit?: (updatedTask: Task[]) => () => Promise<void>;
}

const TableRow = ({
  task,
  write,
  onTaskChange,
  taskInputs,
  setTaskInputs,
  onSubmit,
}: Props) => {
  //
  const { name, leadTime, actualTime, done } = task;

  const onRowDelete = () => {
    setTaskInputs!((s) => s?.filter((item) => item.id !== task.id));
  };

  const onDoneClick = async () => {
    const updatedTask = taskInputs.map((item) =>
      item.id === task.id ? { ...item, done: !item.done } : item
    );

    onSubmit && onSubmit(updatedTask)();
  };

  const renderCellContent = (label: "name" | "leadTime", value: string) => (
    <div
      className={`${
        label === "name" ? "col-span-3" : "col-span-1"
      } center-xy p-3 border-r`}
    >
      {write ? (
        <input
          type="text"
          id={task.id + "/" + label}
          value={value}
          onChange={onTaskChange}
          placeholder={label === "name" ? "태스크를 작성하세요" : "1:00"}
          className="bg-transparent w-full h-full focus:outline-none text-center"
        />
      ) : (
        <p className="leading-5">{value}</p>
      )}
    </div>
  );

  return (
    <div
      className={`w-full grid grid-cols-6 border border-t-0 text-xs sm:text-[16px]`}
    >
      {/*  */}
      {/* TODO 태스크 */}

      {renderCellContent("name", name)}

      {/* TODO 예상*/}

      {renderCellContent("leadTime", leadTime)}

      {/* TODO 실제 */}

      <div className="col-span-1 center-xy p-2 border-r">
        {write ? "-" : actualTime}
      </div>

      {write ? (
        //
        // TODO 삭제 버튼

        <button className="col-span-1 center-xy p-2 text-gray-300">
          <TrashIcon
            onClick={onRowDelete}
            className="w-6 h-6 hover:text-red-600"
          />
        </button>
      ) : (
        //
        // TODO 완료 버튼

        <button
          onClick={onDoneClick}
          className={`col-span-1 center-xy p-2 text-gray-300 ${
            write && "border-r"
          }`}
        >
          <CheckCircleIcon
            onClick={() => {}}
            className={`w-6 h-6 ${
              done && "text-green-600"
            } hover:text-green-600`}
          />
        </button>
      )}
    </div>
  );
};

export default TableRow;
