import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import React, { useState } from "react";
import { UserModel } from "@/models/user";
import { downloadTableExcel } from "./table_users_controller";
import DialogConfirmResetPrecences from "./dialog_confirm_reset_presences";

interface HeaderProps {
  users: UserModel[];
  setTextSearch: React.Dispatch<React.SetStateAction<string>>;
}

function Header({ users, setTextSearch }: HeaderProps) {
  const [countClick, setCountClick] = useState(0);

  return (
    <div className="flex p-[15px] max-xsm:p-[10px] items-center justify-between gap-x-[15px]">
      <p onClick={()=> {
        setCountClick(countClick + 1);
      }} className="text-[18px] max-sm:text-[16px] text-terciary/80 text-nowrap">
        <span className="font-[500] text-terciary">{users.length}</span>{" "}
        usuários
      </p>
      <label className="flex justify-between border-terciary border-[1px] rounded-[5px] items-center px-[5px] w-[60%] max-xsm:text-[14px]">
        <input
          type="text"
          placeholder="Digite o nome do usuário"
          className="rounded-l-[5px] bg-transparent outline-none w-full"
          onChange={(e) => {
            setTextSearch(e.target.value);
          }}
        />
        <MagnifyingGlassIcon width={20} height={20} />
      </label>
      <button
        onClick={() => downloadTableExcel()}
        className="bg-primary text-background px-[20px] max-xsm:px-[10px] py-[3px] max-xsm:py-[1px] font-[500] max-xsm:text-[13px] rounded-[5px] hover:brightness-95 duration-200"
      >
        Exportar
      </button>
      <DialogConfirmResetPrecences countClick={countClick} setCountClick={setCountClick} />
    </div>
  );
}

export default Header;
