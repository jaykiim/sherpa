import React from "react";
import { Task } from "../../../types";
import Table from "../../util/Table";

interface Props {
  rows: Task[];
}

const TableRows = ({ rows }: Props) => {
  console.log(rows);

  return <></>;
};

export default TableRows;
