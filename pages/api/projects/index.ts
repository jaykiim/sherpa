import {
  collection,
  documentId,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //
  const { projectlist } = req.query;
  const projectarr = JSON.parse(projectlist as string);

  try {
    //
    if (Array.isArray(projectarr) && projectarr.length) {
      //
      const q = query(
        collection(db, "projects"),
        where(documentId(), "in", projectarr)
      ); // projectarr 배열 요소와 일치하는 id 가진 도큐먼트 모두 쿼리

      const snap = await getDocs(q);

      const projects = snap.docs.map((doc) => doc.data());

      res.status(200).json(projects);
    } else {
      res.status(200).json([]);
    }
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
