import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";
import { User } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //
  const { projectId } = req.query;

  // 프로젝트 조회
  if (req.method === "GET") {
    try {
      const docRef = doc(db, "projects", projectId as string);
      const snap = await getDoc(docRef);

      if (snap.exists()) res.status(200).json(snap.data());
      //
      else throw new Error("존재하지 않는 프로젝트입니다");
      //
    } catch (error) {
      //
      console.log(error);
      res.status(500).json(error);
    }
  }

  // 프로젝트 기본 정보 수정 또는 등록
  else if (req.method === "PATCH") {
    try {
      //
      const { userId, project } = req.body; // * userId 가 있으면 새 프로젝트 등록

      // 기존 project 문서 가져오기
      const docRef = doc(db, "projects", projectId as string);
      await setDoc(docRef, project);

      // * user 문서 projects 필드 수정 ---------------------------------------------------------------------------------------------------

      if (userId) {
        //
        // 기존 user 문서 가져오기
        const userRef = doc(db, "users", userId);
        const snap = await getDoc(userRef);
        const userDoc = snap.data() as User;

        await updateDoc(userRef, {
          projects: [...userDoc.projects, project.id],
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
