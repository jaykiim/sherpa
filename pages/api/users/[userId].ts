import { doc, getDoc, setDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //
  const { userId } = req.query;

  // TODO user 조회

  if (req.method === "GET") {
    //
    try {
      const docRef = doc(db, "users", userId as string);
      const docSnap = await getDoc(docRef);

      let user;
      if (docSnap.exists()) user = docSnap.data();

      res.status(200).json(user);
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }

  // TODO user 등록/수정
  //
  else if (req.method === "PATCH") {
    //
    try {
      const userInfo = req.body;

      const docRef = doc(db, "users", userId as string);
      await setDoc(docRef, userInfo);

      res.status(200).json("success");
    } catch (error) {
      console.log(error);
      res.status(500).json(error);
    }
  }
}
