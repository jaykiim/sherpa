import { deleteDoc, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";
import { Task } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //
  if (req.method === "PATCH") {
    try {
      //
      const { record, taskId, selectedDate } = req.body; // 새로운 id의 레코드일수도 있음

      // 기존 문서 업데이트 혹은 새로 저장
      const docRef = doc(db, "records", record.id as string);
      await setDoc(docRef, record);

      // * 새로 등록하는 경우 --> task 문서 records 필드 수정 ---------------------------------------------------------------------------------------------------

      if (taskId && selectedDate) {
        // 기존 task 문서 가져오기
        const taskRef = doc(db, "tasks", taskId);
        const snap = await getDoc(taskRef);
        const taskDoc = snap.data() as Task;

        // task --> records --> 현재 날짜 record id 배열
        const selectedDateRecs = taskDoc.records[selectedDate];

        // 현재 날짜 records id 배열 존재 && 그 중에 현재 record.id 존재 ---> 아무것도 안함
        // 현재 날짜 records id 배열 존재 but 현재 record.id 미존재 ---> 기존 배열에 현재 id 추가
        // 현재 날짜 미존재 --> 새로운 배열

        const updatedIds = selectedDateRecs
          ? selectedDateRecs.includes(record.id)
            ? false
            : [...taskDoc.records[selectedDate], record.id]
          : [record.id];

        if (updatedIds) {
          await updateDoc(taskRef, {
            records: {
              [selectedDate]: updatedIds,
            },
          });
        }
      }

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
      const { recordId, taskId, selectedDate } = req.body;

      const docRef = doc(db, "records", recordId);
      await deleteDoc(docRef);

      const taskRef = doc(db, "tasks", taskId);
      const snap = await getDoc(taskRef);
      const taskDoc = snap.data() as Task;

      // task --> records --> 현재 날짜 record id 배열
      const selectedDateRecs = taskDoc.records[selectedDate];

      // 현재 날짜 record id 배열 존재 && 그 중에 현재 recordId 존재 ---> recordId 없애기
      if (selectedDateRecs && selectedDateRecs.includes(recordId)) {
        const newRecordIdlist = selectedDateRecs.filter(
          (id) => id !== recordId
        );
        await updateDoc(taskRef, {
          records: {
            [selectedDate]: newRecordIdlist,
          },
        });
      }

      res.status(200).json("success");
      //
    } catch (error) {
      //
      console.log(error);
      res.status(500).json(error);
    }
  }
}
