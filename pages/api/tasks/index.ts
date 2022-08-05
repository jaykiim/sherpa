import {
  collection,
  collectionGroup,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";
import { Task } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //
  if (req.method === "GET") {
    try {
      //
      const { krId } = req.query;

      const q = query(
        collectionGroup(db, "tasks"),
        where("keyresultId", "==", krId)
      );

      const snap = await getDocs(q);

      const tasks = snap.docs.map((doc) => doc.data());

      res.status(200).json(tasks);
      //
    } catch (error) {
      //
      console.log(error);
      res.status(500).json(error);
    }
  }
  //
  else if (req.method === "PATCH") {
    //
    try {
      //
      const { keyresultId, tasks } = req.body;

      // 넘어온 tasks id
      const ids = tasks.map((task: Task) => task.id);

      // 기존 task id
      const q = query(
        collection(db, "tasks"),
        where("keyresultId", "==", keyresultId)
      );
      const snap = await getDocs(q);
      const prevIds = snap.docs.map((doc) => doc.data()).map((task) => task.id);

      // 지울 task id
      const toDelete = prevIds.filter((id) => !ids.includes(id));

      // * tasks 컬렉션 문서 추가/수정 및 삭제 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      const batch = writeBatch(db);

      tasks.forEach((task: Task) => {
        const docRef = doc(db, "tasks", task.id);
        batch.set(docRef, task);
      });

      toDelete.forEach((id: string) => {
        const docRef = doc(db, "tasks", id);
        batch.delete(docRef);
      });

      await batch.commit();

      // * keyresult 문서 tasks 속성 수정 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      // keyresult 문서 주소
      const krDoc = doc(db, "keyresults", keyresultId);

      await updateDoc(krDoc, { tasks: ids });

      res.status(200).json("success");
      //
    } catch (error) {
      //
      console.log(error);
      res.status(500).json(error);
    }
  }
}
