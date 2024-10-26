import { db } from "@/lib/firebase_config";
import { IDataAuthUser, UserModel } from "@/models/user";
import {
  setDoc,
  doc,
  getDoc,
  updateDoc,
  collection,
  getDocs,
} from "firebase/firestore";
import { getPresencesByMeeting } from "./presenceFireStore";
import { createTableExcel } from "@/components/admin/users/table_users/table_users_controller";
import { toFormattedDateToString } from "@/utils/functions/formmatter_date";
import { uploadExcelPresences } from "./userStorage";

interface IPropsCreateUserFireStore {
  dataAuthUser: IDataAuthUser;
  idAuthUser: string;
}
export async function createUserFireStore({
  dataAuthUser,
  idAuthUser,
}: IPropsCreateUserFireStore) {
  var dataUser: UserModel = {
    id: idAuthUser,
    name: dataAuthUser.name,
    email: dataAuthUser.email,
    madeCane: dataAuthUser.madeCane,
    lastPresence: new Date(),
    totalPresence: 0,
    namePhoto: dataAuthUser.namePhoto,
    photoUrl: dataAuthUser.photoUrl,
    madeCaneYear: null,
  };
  if (dataAuthUser.madeCaneYear) {
    dataUser.madeCaneYear = dataAuthUser.madeCaneYear;
  }

  await setDoc(doc(db, `users`, idAuthUser), dataUser);
}

export async function getUser(idUser: string): Promise<UserModel | null> {
  const docSnap = await getDoc(doc(db, "users", idUser));
  if (docSnap.exists()) {
    return UserModel.fromJSON(docSnap.data());
  }
  return null;
}

export async function getAllUsers(): Promise<Array<UserModel>> {
  const querySnapshot = await getDocs(collection(db, "users"));
  const users: Array<UserModel> = [];
  querySnapshot.forEach((doc) => {
    users.push(UserModel.fromJSON(doc.data()));
  });
  return users;
}

export async function getAllUsersByMeeting(
  idMeeting: string
): Promise<Array<UserModel>> {
  const allPresences = await getPresencesByMeeting(idMeeting);
  const users: Array<UserModel> = [];
  if (allPresences && allPresences.length > 0) {
    const querySnapshot = await getDocs(collection(db, "users"));

    querySnapshot.forEach((doc) => {
      const user = UserModel.fromJSON(doc.data());
      if (allPresences.find((presence) => presence.id_user == user.id)) {
        users.push(user);
      }
    });
  }
  return users;
}

export async function updateUser(data: UserModel) {
  await updateDoc(doc(db, "users", data.id), {
    ...data,
  });
}

export async function resetPresences(users: UserModel[]) {
  const backup = await createTableExcel(users);
  const path = `backup/${toFormattedDateToString(new Date())}.xlsx`;
  await uploadExcelPresences({ blobImage: backup, path });
  for (const user of users) {
      user.totalPresence = 0;
      await updateUser(user);
  }
}
