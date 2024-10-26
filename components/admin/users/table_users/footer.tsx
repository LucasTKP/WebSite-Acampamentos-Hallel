import { UserModel } from "@/models/user";
import React, { useEffect } from "react";
import { filterUsers } from "./table_users_controller";
import DialogConfirmResetPrecences from "./dialog_confirm_reset_presences";

interface FooterProps {
  users: UserModel[];
  textSearch: string;
  pagination: { page: number; maxPage: number; minPage: number };
  setPagination: React.Dispatch<
    React.SetStateAction<{ page: number; maxPage: number; minPage: number }>
  >;
}
function Footer({
  users,
  textSearch,
  pagination,
  setPagination,
}: FooterProps) {

  const [countClick, setCountClick] = React.useState(0);

    
  return (
    <div className="flex justify-between items-center mt-auto px-[15px] pb-[5px] pt-[10px]">
      <DialogConfirmResetPrecences users={users} countClick={countClick} setCountClick={setCountClick} />
      <button
        disabled={pagination.page == 1}
        className="bg-terciary/20 px-[10px] rounded-[5px] border-[1px] border-terciary hover:bg-terciary/50 duration-200 disabled:bg-transparent disabled:text-black/40 disabled:border-black/40"
        onClick={() =>
          setPagination({
            page: pagination.page - 1,
            maxPage: pagination.maxPage - 8,
            minPage: pagination.minPage - 8,
          })
        }
      >
        Anterior
      </button>
      <p onClick={() => setCountClick(countClick + 1)}>
        Página <span className="font-[500]">{pagination.page}</span> de{" "}
        <span className="font-[500]">
          {Math.ceil(filterUsers({ users, textSearch }).length / 8)}
        </span>
      </p>
      <button
        disabled={
          pagination.page >=
          Math.ceil(filterUsers({ users, textSearch }).length / 8)
        }
        onClick={() =>
          setPagination({
            page: pagination.page + 1,
            maxPage: pagination.maxPage + 8,
            minPage: pagination.minPage + 8,
          })
        }
        className="bg-terciary/20 px-[10px] rounded-[5px] border-[1px] border-terciary hover:bg-terciary/50 duration-200 disabled:bg-transparent disabled:text-black/40 disabled:border-black/40"
      >
        Próxima
      </button>
    </div>
  );
}

export default Footer;
