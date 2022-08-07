import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { NextApiRequest, NextApiResponse } from "next";
import { db } from "../../../lib/firebase";
import { Project } from "../../../types";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  //
  if (req.method === "PATCH") {
    try {
      //
      const { planner, projectId, selectedDate } = req.body;
      console.log(planner, projectId, selectedDate);

      const docRef = doc(db, "planners", planner.id);
      await setDoc(docRef, planner);

      // * 기존에 없던 도큐먼트인 경우 project 도큐먼트의 planners 배열 수정해줘야함 ---------------------------------------------------------------------------------------------------

      // 기존 project 문서 가져오기
      const projectRef = doc(db, "projects", projectId as string);
      const snap = await getDoc(projectRef);
      const projectDoc = snap.data() as Project;

      // task --> planners --> 현재 날짜 planner id 배열
      const selectedDateRecs = projectDoc.planners[selectedDate];

      // 현재 날짜 planner id 배열 존재 && 그 중에 현재 planner.id 존재 ---> 아무것도 안함
      // 현재 날짜 planner id 배열 존재 but 현재 planner.id 미존재 ---> 기존 배열에 현재 id 추가
      // 현재 날짜 미존재 --> 새로운 배열

      const updatedIds = selectedDateRecs
        ? selectedDateRecs.includes(planner.id)
          ? selectedDateRecs
          : [...selectedDateRecs, planner.id]
        : [planner.id];

      await updateDoc(projectRef, {
        planners: {
          [selectedDate]: updatedIds,
        },
      });

      res.status(200).json("success");
      //
    } catch (error) {
      //
      console.log(error);
      res.status(500).json(error);
    }
  }
}
