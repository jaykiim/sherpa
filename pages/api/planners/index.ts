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
  const { plannerlist } = req.query;
  const idArr = JSON.parse(plannerlist as string);

  try {
    //
    if (Array.isArray(idArr) && idArr.length) {
      //
      const q = query(
        collection(db, "planners"),
        where(documentId(), "in", idArr)
      );

      const snap = await getDocs(q);

      const planners = snap.docs.map((doc) => doc.data());

      res.status(200).json(planners);
    }
    //
    else res.status(200).json([]);
    //
  } catch (error) {
    console.log(error);
    res.status(500).json(error);
  }
}
