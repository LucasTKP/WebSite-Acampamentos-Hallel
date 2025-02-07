import { db } from "@/lib/firebase_config";
import { MeetingModel } from "@/models/meeting";
import {
  collection,
  doc,
  getDocs,
  limit,
  orderBy,
  query,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";

export async function createMeeting(dataMeeting: Omit<MeetingModel, "id">) {
  const docRef = doc(collection(db, "meetings"));
  const id = docRef.id;

  await setDoc(docRef, { ...dataMeeting, id });
}

export async function getSomeMeetings(): Promise<Array<MeetingModel> | null> {
  const q = query(collection(db, "meetings"), where("isVisible", "==", true), orderBy("date", "desc"), limit(3));

  const querySnapshot = await getDocs(q);
  const meetings: Array<MeetingModel> = [];
  querySnapshot.forEach((doc) => {
    meetings.push(MeetingModel.fromJSON(doc.data()));
  });
  if (meetings.length > 0) {
    return meetings;
  }
  return null;
}

export async function getAllMeetings(): Promise<Array<MeetingModel> | []> {
  const meetings: Array<MeetingModel> = [];

  const querySnapshot = await getDocs(collection(db, "meetings"));
  querySnapshot.forEach((doc) => {
    meetings.push(MeetingModel.fromJSON(doc.data()));
  });
  return meetings;
}

export async function editMeeting(dataMeeting: MeetingModel) {
  await updateDoc(doc(db, "meetings", dataMeeting.id), {
    ...dataMeeting,
  });
}
