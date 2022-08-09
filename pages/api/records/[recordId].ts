import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";
import { Task } from "../../../types";
import { moment, toolkit } from "../../../utils";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //
  if (req.method === "PATCH") {
    try {
      //
      const { record, taskId, selectedDate } = req.body;

      const docRef = doc(db, "records", record.id as string);
      await setDoc(docRef, record);

      // 기존 task 문서 가져오기
      const taskRef = doc(db, "tasks", taskId);
      const snap = await getDoc(taskRef);
      const taskDoc = snap.data() as Task;

      // task --> records --> 현재 날짜 record id 배열
      const selectedDateRecs = taskDoc.records[selectedDate];

      // 현재 날짜 records id 배열 존재 && 그 중에 현재 record.id 존재 ---> 아무것도 안함
      // 현재 날짜 records id 배열 존재 but 현재 record.id 미존재 ---> 기존 배열에 현재 id 추가
      // 현재 날짜 미존재 --> 새로운 배열

      console.log("taskDoc.records", taskDoc.records);
      console.log("selectedDateRecs", selectedDateRecs);

      const updatedRecords = selectedDateRecs
        ? {
            ...taskDoc.records,
            [selectedDate]: [...selectedDateRecs, record.id],
          }
        : { ...taskDoc.records, [selectedDate]: [record.id] };

      console.log("updatedRecords", updatedRecords);

      // 새로운 시간 합계
      const taskActualTIme = taskDoc.actualTime
        ? taskDoc.actualTime
        : "00:00:00";
      const timeSum = moment.timeSum([taskActualTIme, record.time]);

      await updateDoc(taskRef, {
        records: updatedRecords,
        actualTime: timeSum,
      });

      res.status(200).json("success");
      //
    } catch (error) {
      //
      console.log(error);
      res.status(500).json(error);
    }
  }
  //
  else if (req.method === "DELETE") {
    try {
      //
      const { record, taskId, selectedDate } = req.body;

      const docRef = doc(db, "records", record.id as string);
      await deleteDoc(docRef);

      const taskRef = doc(db, "tasks", taskId);
      const snap = await getDoc(taskRef);
      const taskDoc = snap.data() as Task;

      // task --> records --> 현재 날짜 record id 배열
      const selectedDateRecs = taskDoc.records[selectedDate];

      // task --> records --> 현재 날짜 배열에 현재 record id 없애기
      const newRecordIdlist = selectedDateRecs.filter((id) => id !== record.id);

      // task --> actualTime 수정
      const actualTime = moment.timeDiff(taskDoc.actualTime, record.time);

      await updateDoc(taskRef, {
        records: {
          [selectedDate]: newRecordIdlist,
        },
        actualTime,
      });

      res.status(200).json("success");
      //
    } catch (error) {
      //
      console.log(error);
      res.status(500).json(error);
    }
  }
}
