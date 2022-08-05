import React, { useState } from "react";

// components
import { Subheading, BtnEdit, Table, TableRows } from "../../";

// hooks
import { useGetTasksQuery } from "../../../apiSlice";

const TaskTableContainer = () => {
  //
  const [write, setWrite] = useState(false);
  const selectedKr = localStorage.getItem("kr");

  const { data: tasks } = useGetTasksQuery(selectedKr!);

  // * 서버 저장 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------

  const onCancel = () => {
    setWrite(false);
  };

  const onSubmit = () => {};

  const disable = false;

  return (
    <div>
      <Subheading title="task table">
        <BtnEdit
          write={write}
          setWrite={setWrite}
          onSubmit={onSubmit}
          onCancel={onCancel}
          disable={disable}
        />
      </Subheading>

      <Table.Container cols={6} style="mt-3">
        <Table.Head id="task" width={3}>
          태스크
        </Table.Head>
        <Table.Head id="expect" width={1}>
          예상
        </Table.Head>
        <Table.Head id="real" width={1}>
          실제
        </Table.Head>
        <Table.Head id="done" width={1}>
          {write ? <p>삭제</p> : <p>완료</p>}
        </Table.Head>

        {tasks && <TableRows rows={tasks} />}
      </Table.Container>
    </div>
  );
};

export default TaskTableContainer;
