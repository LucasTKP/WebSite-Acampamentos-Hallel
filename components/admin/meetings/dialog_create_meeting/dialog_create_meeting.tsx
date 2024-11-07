"use client";
import React, { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { onCreateMeeting } from "./dialog_create_meeting_controller";
import { MeetingModel } from "@/models/meeting";


interface DialogRegisterMeetingProps {
  setMeetings: React.Dispatch<React.SetStateAction<MeetingModel[]>>;
}


function DialogRegisterMeeting({ setMeetings }: DialogRegisterMeetingProps) {
  const [isLoading, setIsLoading] = useState(false);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  function closeDialog() {
    if (cancelButtonRef.current) {
      cancelButtonRef.current.click();
    }
  }


  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="bg-primary text-background px-[20px] max-xsm:px-[10px] py-[3px] max-xsm:py-[1px] font-[500] max-xsm:text-[13px] rounded-[5px] hover:brightness-95 duration-200">
          Cadastrar
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-10" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]  w-[90vw] max-w-[450px] max-h-[70svh] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-10 flex flex-col overflow-auto">
          <Dialog.Title className="text-[20px] font-medium">
            Cadastre a reunião
          </Dialog.Title>
          <Dialog.Description className="mt-[10px] mb-5 text-[15px]">
            Adicione as informações da reunião nos campos abaixo
          </Dialog.Description>
          <form
            onSubmit={(e) =>
              onCreateMeeting({ e, setIsLoading, closeDialog, setMeetings })
            }
            className="flex flex-col items-start gap-y-[10px]"
          >
            <label className="w-full" htmlFor="theme">
              <p className="text-[15px] font-[500]">Tema:</p>
              <input
                className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/60"
                name="theme"
                placeholder="Adicione o tema da reunião"
                type="text"
                required
              />
            </label>

            <label className="w-full" htmlFor="description">
              <p className="text-[15px] font-[500]">Descrição:</p>
              <textarea
                className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/60"
                name="description"
                rows={4}
                placeholder="Adicione a descrição da reunião"
                required
              />
            </label>

            <label htmlFor="date">
              <p className="text-[15px] font-[500]">Data da reunião:</p>
              <input
                className="p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] border-[1px]"
                name="date"
                type="date"
                required
                defaultValue={new Date().toISOString().split("T")[0]}
              />
            </label>

            <label className="w-full" htmlFor="password">
              <p className="text-[15px] font-[500]">Password:</p>
              <input
                className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/60"
                name="password"
                placeholder="Digite a senha da reunião"
                required
              />
            </label>
            <div className="mt-[25px] flex w-full justify-end gap-x-[15px]">
              <Dialog.Close asChild>
                <button className="bg-red text-background hover:brightness-95 focus:shadow-green7 inline-flex h-[36px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none">
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                className="bg-primary text-background hover:brightness-95 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                type={"submit"}
                disabled={isLoading}
              >
                {isLoading ? (
                  <div className="relative flex items-center justify-center w-[25px] h-[25px] rounded-full border-[6px] border-t-gray-400 border-background animate-spin" />
                ) : (
                  "Salvar"
                )}
              </button>
            </div>
          </form>
          <Dialog.Close asChild>
            <button
              ref={cancelButtonRef}
              className="text-violet11 hover:bg-violet4 focus:shadow-violet7 absolute top-[10px] right-[10px] inline-flex h-[25px] w-[25px] appearance-none items-center justify-center rounded-full focus:shadow-[0_0_0_2px] focus:outline-none"
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

export default DialogRegisterMeeting;
