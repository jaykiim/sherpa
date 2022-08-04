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
        res.status(200).json([]);
      }
      //
    } catch (error) {
      //
      console.log(error);
      res.status(500).json(error);
    }
  }
}
