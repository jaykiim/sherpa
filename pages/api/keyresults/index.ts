import {
  collection,
  doc,
  documentId,
  getDocs,
  query,
  updateDoc,
  where,
  writeBatch,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";
import { KeyResult } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //
  if (req.method === "GET") {
    try {
      //
      const { keyresultList } = req.query;
      const idArr = JSON.parse(keyresultList as string);

      if (Array.isArray(idArr) && idArr.length) {
        //
        const q = query(
          collection(db, "keyresults"),
          where(documentId(), "in", idArr)
        );

        const snap = await getDocs(q);

        const keyresults = snap.docs.map((doc) => doc.data());

        res.status(200).json(keyresults);
      }
      //
      else {
        throw new Error();
      }
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
      const { projectId, krArr } = req.body;

      // 넘어온 kr id
      const idArr = krArr.map((kr: KeyResult) => kr.id);

      // 기존 kr id
      const q = query(
        collection(db, "keyresults"),
        where("projectId", "==", projectId)
      );
      const snap = await getDocs(q);
      const prevIdArr = snap.docs.map((doc) => doc.data()).map((kr) => kr.id);

      // 지울 kr id
      const toDelete = prevIdArr.filter((id) => !idArr.includes(id));

      // * keyresults 컬렉션 문서 추가/수정 및 삭제 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      const batch = writeBatch(db);

      krArr.forEach((kr: KeyResult) => {
        const docRef = doc(db, "keyresults", kr.id);
        batch.set(docRef, kr);
      });

      toDelete.forEach((id: string) => {
        const docRef = doc(db, "keyresults", id);
        batch.delete(docRef);
      });

      await batch.commit();

      // * project 문서 keyresults 속성 수정 ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------

      // 프로젝트 문서 주소
      const projectDoc = doc(db, "projects", projectId);

      await updateDoc(projectDoc, { keyresults: idArr });

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
  }
}
