"use client";
import React, { useEffect, useState } from "react";
import Header from "./header";
import { TriangleDownIcon } from "@radix-ui/react-icons";
import {
  filterUsers,
  onGetUsers,
  sortLastPresenceUsers,
  sortPresencesUsers,
} from "./table_users_controller";
import {
  toFormattedDateDDMMYYYYToString,
  toFormattedDateToString,
} from "@/utils/functions/formmatter_date";
import DialogEditUser from "../dialog_edit_user/dialog_edit_user";
import Footer from "./footer";
import { UserModel } from "@/models/user";
import Image from "next/image";

interface typeFilters {
  lastPresence: "asc" | "desc";
  presences: "asc" | "desc";
}

interface TebleUsersProps {
  idMeeting?: string;
}

function TableUsers({ idMeeting }: TebleUsersProps) {
  const [users, setUsers] = useState<UserModel[]>([]);
  const [userSelect, setUserSelect] = useState<UserModel | null>(null);
  const [textSearch, setTextSearch] = useState<string>("");
  const [filters, setFilters] = useState<typeFilters>({
    lastPresence: "asc",
    presences: "asc",
  });

  const [pagination, setPagination] = useState({
    page: 1,
    maxPage: 8,
    minPage: 1,
  });

  useEffect(() => {
    onGetUsers({ setUsers: setUsers, idMeeting: idMeeting });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleFilterLastPresence() {
    setFilters({
      presences: "asc",
      lastPresence: filters.lastPresence == "asc" ? "desc" : "asc",
    });
    sortLastPresenceUsers({ users, action: filters.lastPresence });
  }

  function handlePresences() {
    setFilters({
      lastPresence: "asc",
      presences: filters.presences == "asc" ? "desc" : "asc",
    });
    sortPresencesUsers({ users, action: filters.presences });
  }

  const [width, setWidth] = useState(
    typeof window !== "undefined" ? window.innerWidth : 0
  );

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  window.addEventListener("resize", handleResize);

  return (
    <div className="max-w-[800px] w-full min-h-[515px] max-sm:min-h-[480px] max-xsm:min-h-[460px] border-terciary border-[1px] rounded-[10px] flex flex-col flex-1">
      <Header
        users={users}
        setTextSearch={setTextSearch}
        setPagination={setPagination}
      />
      {users.length == 0 ? (
        <div className="w-full h-[400px] flex items-center justify-center">
          <p>Nenhum usuário foi encontrado</p>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-[40px_1fr_100px_190px] max-sm:grid-cols-[35px_1fr_100px_100px] gap-[10px] max-xsm:gap-[5px] px-[10px] border-y-[1px] border-terciary bg-terciary/20 items-center text-[17px] max-xsm:text-[16px] font-[600] py-[5px] ">
            <p className="col-start-2">Nome</p>

            <button
              onClick={() => handlePresences()}
              className="flex items-center justify-center"
            >
              <p>Presenças</p>
              <TriangleDownIcon
                className={`${
                  filters.presences == "asc" ? "" : "rotate-180"
                } duration-200`}
              />
            </button>

            <button
              onClick={() => handleFilterLastPresence()}
              className="flex items-center justify-center"
            >
              <p>Última</p>
              <TriangleDownIcon
                className={`${
                  filters.lastPresence == "asc" ? "" : "rotate-180"
                } duration-200`}
              />
            </button>
          </div>

          {filterUsers({ users, textSearch }).length > 0 ? (
            (() => {
              const result = [];
              const filteredUsers = filterUsers({ users, textSearch });
              for (let i = 0; i < filteredUsers.length; i++) {
                const user = filteredUsers[i];

                if (i + 1 < pagination.minPage) continue;
                if (i + 1 > pagination.maxPage) break;

                result.push(
                  <div
                    onClick={() => setUserSelect(user)}
                    key={user.id}
                    className="grid grid-cols-[40px_1fr_100px_190px] max-sm:grid-cols-[35px_1fr_100px_100px] gap-[10px] max-xsm:gap-[5px] px-[10px] py-[3px] border-b-[1px] border-terciary bg-background hover:brightness-90 cursor-pointer max-xsm:text-[15px] items-center"
                  >
                    <Image
                      alt="perfil"
                      src={user.photoUrl}
                      width={40}
                      height={40}
                      className="rounded-full border-[1px] border-black aspect-square max-sm:w-[35px]"
                    />

                    <p className="truncate">{user.name}</p>

                    <p className="text-center">{user.totalPresence}</p>

                    <p className="text-center">
                      {width > 640
                        ? toFormattedDateToString(user.lastPresence)
                        : toFormattedDateDDMMYYYYToString(user.lastPresence)}
                    </p>
                  </div>
                );
              }
              return result;
            })()
          ) : (
            <p className="w-full h-[200px] flex items-center justify-center">
              Nenhum usuário foi encontrado com este nome
            </p>
          )}
          <Footer
            users={users}
            textSearch={textSearch}
            pagination={pagination}
            setPagination={setPagination}
          />
        </>
      )}
      {userSelect && (
        <DialogEditUser
          setUsers={setUsers}
          userSelect={userSelect}
          setUserSelect={setUserSelect}
        />
      )}
    </div>
  );
}

export default TableUsers;
