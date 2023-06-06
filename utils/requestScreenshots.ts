import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "@/firebase";

export const requestScreenshots = async (date: string, newsAgency: string) => {
  const q = query(
    collection(firestore, newsAgency),
    where("date", ">=", `${date}T00:00:00.000Z`),
    where("date", "<=", `${date}T23:59:59.999Z`)
  );

  const querySnapshot = await getDocs(q);
  const screenshotData: any[] = [];

  querySnapshot.forEach((doc) => {
    screenshotData.push(doc.data());
  });

  return screenshotData;
};
