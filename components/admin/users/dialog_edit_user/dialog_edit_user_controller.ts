import { UserModel } from "@/models/user";
import { formatterError } from "@/utils/functions/formatter_error";
import { FormEvent } from "react";
import { toast } from "react-toastify";
import { onGetUsers } from "../table_users/table_users_controller";
import { updateUser } from "@/repositories/userFireStore";

interface OnEditUser {
  e: FormEvent<HTMLFormElement>;
  user: UserModel;
  maxUsersTable: number;

  setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
  setUsers: React.Dispatch<React.SetStateAction<UserModel[]>>;
  setUserSelect: React.Dispatch<React.SetStateAction<UserModel | null>>;
}

export async function onEditUser({
  e,
  user,
  maxUsersTable,
  setIsLoading,
  setUsers,
  setUserSelect,
}: OnEditUser) {
  e.preventDefault();
  setIsLoading(true);
  try {
    const dataUser = await formatterDataUser({ user, e });
    if (verifyDataUser(dataUser)) {
      await updateUser(dataUser);
      toast.success("Usuário editado com sucesso.");
      await onGetUsers({ setUsers, maxUsersTable });
      setUserSelect(null);
    }
  } catch (error) {
    console.log(error);
    formatterError(error);
  } finally {
    setIsLoading(false);
  }
}

interface formatterDataUserProps {
  user: UserModel;
  e: FormEvent<HTMLFormElement>;
}

async function formatterDataUser({
  user,
  e,
}: formatterDataUserProps): Promise<UserModel> {
  const formData = new FormData(e.currentTarget);
  const lastPresenceString = formData.get("lastPresence") as string;
  const localDateString = `${lastPresenceString}T00:00:00`;
  const lastPresence = new Date(localDateString);

  const madeCaneYear =
    (formData.get("madeCaneYear") as string) != null
      ? parseInt(formData.get("madeCaneYear") as string)
      : null;

  var dataUser: UserModel = {
    id: user.id,
    name: formData.get("name") as string,
    email: user.email,
    madeCane: (formData.get("madeCane") as string) == "true" ? true : false,
    lastPresence: lastPresence,
    totalPresence: parseInt(formData.get("totalPresence") as string),
    namePhoto: user.namePhoto,
    photoUrl: user.photoUrl,
    madeCaneYear: null,
  };

  madeCaneYear != null && (dataUser.madeCaneYear = madeCaneYear);

  return dataUser;
}

function verifyDataUser(dataUser: UserModel): boolean {
  if (
    dataUser.id &&
    dataUser.name &&
    dataUser.email &&
    dataUser.madeCane != null &&
    dataUser.lastPresence != null &&
    dataUser.totalPresence != null &&
    dataUser.namePhoto &&
    dataUser.photoUrl
  ) {
    return true;
  }
  toast.error("Dados insuficientes");
  return false;
}
