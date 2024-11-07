"use client";
import React, { useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { onEditMeeting } from "./dialog_edit_meeting_controller";
import { MeetingModel } from "@/models/meeting";
import { toFormattedDateYYYYMMDDToString } from "@/utils/functions/formmatter_date";
import Select, { StylesConfig } from "react-select";
import Link from "next/link";

interface DialogEditMeetingProps {
  setMeetings: React.Dispatch<React.SetStateAction<MeetingModel[]>>;
  meetingSelect: MeetingModel;
  setMeetingSelect: React.Dispatch<React.SetStateAction<MeetingModel | null>>;
}

function DialogEditMeeting({
  setMeetings,
  meetingSelect,
  setMeetingSelect,
}: DialogEditMeetingProps) {
  const [isLoading, setIsLoading] = useState(false);
  const customStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid black",
      borderRadius: "8px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? process.env.NEXT_PUBLIC_COLOR_PRIMARY : "white",
      color: "black",
    }),
  };

  const options = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" },
  ];

  return (
    <Dialog.Root open={!!meetingSelect}>
      <Dialog.Portal>
        <Dialog.Overlay
          className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-10"
          onClick={() => setMeetingSelect(null)}
        />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]  w-[90vw] max-w-[450px] max-h-[70svh] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[25px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-10 flex flex-col overflow-auto">
          <Dialog.Title className="text-[20px] font-medium">
            Edite esta reunião
          </Dialog.Title>
          <Dialog.Description className="mt-[10px] mb-[5px] text-[15px]">
            Modifique as informações da reunião nos campos abaixo
          </Dialog.Description>
          <form
            onSubmit={(e) =>
              onEditMeeting({
                e,
                meeting: meetingSelect,
                setIsLoading,
                setMeetingSelect,
                setMeetings,
              })
            }
            className="flex flex-col items-start gap-y-[10px]"
          >
            <label className="w-full" htmlFor="theme">
              <p className="text-[15px] font-[500]">Tema:</p>
              <input
                className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/60"
                id="theme"
                name="theme"
                placeholder="Adicione o tema da reunião"
                type="text"
                required
                defaultValue={meetingSelect.theme}
              />
            </label>

            <label className="w-full" htmlFor="description">
              <p className="text-[15px] font-[500]">Descrição:</p>
              <textarea
                className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/60"
                id="description"
                name="description"
                rows={4}
                placeholder="Adicione a descrição da reunião"
                required
                defaultValue={meetingSelect.description}
              />
            </label>

            <label htmlFor="date">
              <p className="text-[15px] font-[500]">Data da reunião:</p>
              <input
                className="p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]"
                id="date"
                name="date"
                type="date"
                required
                defaultValue={toFormattedDateYYYYMMDDToString(
                  meetingSelect.date
                )}
              />
            </label>

            <label className="w-full" htmlFor="password">
              <p className="text-[15px] font-[500]">Password:</p>
              <input
                className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/60"
                id="password"
                name="password"
                placeholder="Digite a senha da reunião"
                required
                defaultValue={meetingSelect.password}
              />
            </label>

            <div className="w-full">
              <p className="text-[15px] font-[500]">Visível?</p>
              <Select
                options={options}
                required
                id="isVisible"
                name="isVisible"
                className="w-full"
                styles={customStyles}
                defaultValue={options.find(
                  (option) => option.value === meetingSelect.isVisible
                )}
              />
            </div>

            <div className="w-full">
              <p className="text-[15px] font-[500]">
                Permitir registro de presenças?
              </p>
              <Select
                options={options}
                required
                id="isOpen"
                name="isOpen"
                className="w-full"
                styles={customStyles}
                defaultValue={options.find(
                  (option) => option.value === meetingSelect.isOpen
                )}
              />
            </div>

            <div className="mt-[15px] flex w-full justify-end gap-x-[15px]">
              <Link
                href={`/admin/${meetingSelect.id}/${meetingSelect.theme}`}
                className="bg-background text-black outline outline-black outline-offset-[-2px] outline-[2px] hover:brightness-95 focus:shadow-green7 inline-flex h-[36px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none mr-auto"
              >
                <p>Presenças</p>
              </Link>
              <Dialog.Close asChild>
                <button
                  onClick={() => setMeetingSelect(null)}
                  className="bg-red text-background hover:brightness-95 focus:shadow-green7 inline-flex h-[36px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                >
                  Cancelar
                </button>
              </Dialog.Close>
              <button
                className="bg-primary text-background hover:brightness-95 focus:shadow-green7 inline-flex h-[35px] items-center justify-center rounded-[4px] px-[15px] font-medium leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
                type="submit"
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
              onClick={() => setMeetingSelect(null)}
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

export default DialogEditMeeting;
