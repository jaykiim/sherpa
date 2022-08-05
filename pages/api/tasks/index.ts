import { collectionGroup, getDocs, query, where } from "firebase/firestore";
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
}
