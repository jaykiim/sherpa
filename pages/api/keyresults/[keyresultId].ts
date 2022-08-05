import { doc, getDoc } from "firebase/firestore";
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
      const { keyresultId } = req.query;

      const docRef = doc(db, "keyresults", keyresultId as string);
      const kr = (await getDoc(docRef)).data();

      res.status(200).json(kr);
      //
    } catch (error) {
      //
      console.log(error);
      res.status(500).json(error);
    }
  }
}
