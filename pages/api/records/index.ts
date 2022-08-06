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
  try {
    //
    const { taskIdlist } = req.query;

    const idArr = JSON.parse(taskIdlist as string);

    if (Array.isArray(idArr) && idArr.length) {
      //
      const q = query(
        collection(db, "records"),
        where(documentId(), "in", idArr)
      );
      const snap = await getDocs(q);

      const records = snap.docs.map((doc) => doc.data());

      res.status(200).json(records);
    }
    //
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
