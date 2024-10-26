"use client";
import { useContext } from "react";
import Meetings from "../meetings/meetings";
import { UserContext } from "@/context/userContext";
import Image from "next/image";
import { toFormattedDateToString } from "@/utils/functions/formmatter_date";
import DialogEditUser from "./dialog_edit_user/dialog_edit_user";


function DataUser() {
  const { user } = useContext(UserContext);

  return (
    <div className="w-fit max-xsm:w-full">
      <div className="relative z-10">
        <Image
          src={user?.photoUrl!}
          alt="Foto de perfil"
          className="absolute top-1/2 left-1/2 transform xsm:-translate-x-1/2  -translate-y-1/2 max-xsm:left-[15px] max-xl:w-[150px] max-md:w-[135px] max-sm:w-[120px] max-xsm:w-[110px] aspect-square rounded-full border-[2px] border-black bg-background"
          width={200}
          height={200}
        />
      </div>
      <div className="mt-[70px] max-xl:mt-[45px] max-md:mt-[35px] max-xsm:mt-[25px]">
        <div className="flex flex-col bg-terciary/30 rounded-[10px] p-[15px] text-[20px] max-xl:text-[18px] relative">
          <DialogEditUser />
          <p className="truncate">
            <span className="font-[500] w-full">Nome:</span> {user?.name}
          </p>
          <p>
            <span className="font-[500]">Email:</span> {user?.email}
          </p>
          <p>
            <span className="font-[500]">Total de Presenças:</span>{" "}
            {user?.totalPresence}
          </p>
          {user?.lastPresence && (
            <p>
              <span className="font-[500]">Ultima Presença: </span>
              {toFormattedDateToString(user?.lastPresence!)}
            </p>
          )}

          {user?.madeCaneYear && (
            <p>
              <span className="font-[500]">Fez o {process.env.NEXT_PUBLIC_NAME_CAMPING}:</span>{" "}
              {user?.madeCaneYear}
            </p>
          )}
        </div>
      </div>
    </div>
  );
}

export default DataUser;
