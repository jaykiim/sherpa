import { doc, getDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";

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
      else throw new Error("존재하지 않는 프로젝트입니다");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  // 프로젝트 기본 정보 수정
  else if (req.method === "PATCH") {
    try {
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}
