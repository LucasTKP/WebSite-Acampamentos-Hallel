"use client";
import React, { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { toFormattedDateYYYYMMDDToString } from "@/utils/functions/formmatter_date";
import Select, { StylesConfig } from "react-select";
import { UserModel } from "@/models/user";
import Image from "next/image";
import { resetPresences } from "@/repositories/userFireStore";
import { toast } from "react-toastify";

interface DialogEditUserModelProps {
  users: UserModel[];
  countClick: number
  setCountClick: React.Dispatch<React.SetStateAction<number>>
}

function DialogConfirmResetPrecences({ users, countClick, setCountClick }: DialogEditUserModelProps) {
  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog.Root open={countClick >= 3 ? true : false}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-10"
          onClick={() => setCountClick(0)}
        />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]  w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-10 flex flex-col">
          <Dialog.Title className="text-[20px] font-medium">
            ATENÇÃO
          </Dialog.Title>
          <Dialog.Description className="mt-[10px] mb-5 text-[18px]">
            Cliando no botão confirmar, vai resetar todas as presenças de todos os usuários. Esta ação não pode ser desfeita.
          </Dialog.Description>
            <div className="mt-[25px] flex w-full justify-end gap-x-[15px]">
              <Dialog.Close asChild>
                <button
                  onClick={() => setCountClick(0)}
                  className="bg-red text-background hover:brightness-95 focus:shadow-green7 inline-flex h-[36px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                >
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                className="bg-primary text-background hover:brightness-95 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                onClick={async () => {
                  setIsLoading(true);
                  await resetPresences(users);
                  toast.success("Presenças resetadas com sucesso");
                  setCountClick(0);
                }}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="relative flex items-center justify-center w-[25px] h-[25px] rounded-full border-[6px] border-t-gray-400 border-background animate-spin" />
                ) : (
                  "Confirmar"
                )}
              </button>
            </div>
          <Dialog.Close asChild>
            <button
              onClick={() => setCountClick(0)}
              className="absolute top-[10px] right-[10px] h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
              aria-label="Close"
            >
              <Cross2Icon width={25} height={25} />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}

export default DialogConfirmResetPrecences;
