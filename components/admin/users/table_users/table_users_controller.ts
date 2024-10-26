import { UserModel } from "@/models/user";
import {
  getAllUsers,
  getAllUsersByMeeting,
} from "@/repositories/userFireStore";
import { formatterError } from "@/utils/functions/formatter_error";
import { toFormattedDateDDMMYYYYToString } from "@/utils/functions/formmatter_date";
import * as XLSX from "xlsx";

interface onGetUsersProps {
  setUsers: React.Dispatch<React.SetStateAction<UserModel[]>>;
  idMeeting?: string;
}
export async function onGetUsers({ setUsers, idMeeting }: onGetUsersProps) {
  let users: UserModel[] = [];
  try {
    if (idMeeting) {
      users = await getAllUsersByMeeting(idMeeting);
    } else {
      users = await getAllUsers();
    }

    setUsers(sortPresencesUsers({ users, action: "desc" }));
  } catch (error) {
    console.log(error);
    formatterError(error);
  }
}

interface FilterUsersProps {
  users: UserModel[];
  textSearch: string;
}

export function filterUsers({
  users,
  textSearch,
}: FilterUsersProps): UserModel[] {
  const usersFiltered = users.filter((user) =>
    user.name.toLocaleLowerCase().includes(textSearch.toLocaleLowerCase())
  );
  return usersFiltered;
}
interface sortDateUsersProps {
  users: UserModel[];
  action: "asc" | "desc";
}

export function sortLastPresenceUsers({
  users,
  action,
}: sortDateUsersProps): UserModel[] {
  if (action === "asc") {
    return users.sort(
      (a, b) => a.lastPresence.getTime() - b.lastPresence.getTime()
    );
  } else {
    return users.sort(
      (a, b) => b.lastPresence.getTime() - a.lastPresence.getTime()
    );
  }
}

export function sortPresencesUsers({
  users,
  action,
}: sortDateUsersProps): UserModel[] {
  if (action === "asc") {
    return users.sort((a, b) => a.totalPresence - b.totalPresence);
  } else {
    return users.sort((a, b) => b.totalPresence - a.totalPresence);
  }
}

export async function downloadTableExcel(users: UserModel[]) {
  const dataBlob = await createTableExcel(users);
  const url = URL.createObjectURL(dataBlob);
  const a = document.createElement("a");
  const date = toFormattedDateDDMMYYYYToString(new Date());
  a.href = url;
  a.download = `Presenças ${date}.xlsx`;
  document.body.appendChild(a);
  a.click();
  document.body.removeChild(a);

}

export async function createTableExcel(data: UserModel[]): Promise<Blob> {
  const filteredData = data.map(
    ({ id, name, totalPresence, madeCane, madeCaneYear, lastPresence }) => ({
      "Id": id,
      "Nome": name,
      "Total de presenças": totalPresence,
      "Fez o Acampamento?": madeCane ? "Sim" : "Não",
      "Fez o Acampamento em": madeCaneYear,
      "Última presenca": lastPresence,
    })
  );

  const worksheet = XLSX.utils.json_to_sheet(filteredData);
  const workbook = XLSX.utils.book_new();
  XLSX.utils.book_append_sheet(workbook, worksheet, process.env.NEXT_PUBLIC_NAME_CAMPING ?? "Acampamento");

  const excelBuffer = XLSX.write(workbook, {
    bookType: "xlsx",
    type: "array",
  });

  return new Blob([excelBuffer], {
    type: "application/octet-stream",
  });
}
