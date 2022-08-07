import React, { useState } from "react";

// hooks
import {
  useDeleteRecordMutation,
  useUpdateRecordMutation,
} from "../../../apiSlice";

// components
import { BtnEdit } from "../../";

// styles
import { MinusCircleIcon } from "@heroicons/react/outline";

// types
import { Record as RecordType } from "../../../types";

interface Props {
  record: RecordType;
  taskId: string;
  selectedDate: Date;
}

const Record = ({ record, taskId, selectedDate }: Props) => {
  const [write, setWrite] = useState(false);
  const [input, setInput] = useState(record.name);

  // * update --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const [updateRecord, { isLoading: updatedLoading }] =
    useUpdateRecordMutation();
  const onSubmit = async () => {
    //
    const updatedRecord = { ...record, name: input };

    try {
      await updateRecord({ record: updatedRecord });
      setWrite(false);
      setInput(record.name);
    } catch (error) {
      console.log(error);
    }
  };

  const disabled = updatedLoading || !input;

  // * delete --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const [deleteRecord, { isLoading: deleteLoading }] =
    useDeleteRecordMutation();
  const onDelete = async () => {
    try {
      await deleteRecord({
        recordId: record.id,
        taskId,
        selectedDate: selectedDate.toLocaleDateString(),
      });
      setWrite(false);
    } catch (error) {
      console.log(error);
    }
  };

  const disableDelete = !!deleteLoading;

  // * cancel --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const onCancel = () => {
    setWrite(false);
    setInput(record.name);
  };

  return (
    <div className="flex items-center justify-between text-gray-400 text-sm">
      {write ? (
        <div className="flex ml-1">
          <button
            onClick={onDelete}
            disabled={disableDelete}
            className="w-8 h-8 center-xy group hoverAnimation"
          >
            <MinusCircleIcon className="w-6 h-6 group-hover:text-red-600" />
          </button>

          <input
            type="text"
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="ml-2 focus:outline-none"
          />
        </div>
      ) : (
        <p className="ml-2">{record.name}</p>
      )}

      <div className="flex gap-x-3 items-center text-sm mr-1">
        <span>{record.time}</span>
        <BtnEdit
          write={write}
          setWrite={setWrite}
          onSubmit={onSubmit}
          onCancel={onCancel}
          disable={disabled}
        />
      </div>
    </div>
  );
};

export default Record;
