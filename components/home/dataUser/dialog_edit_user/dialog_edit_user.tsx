"use client";
import React, { useRef, useState } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { onEditUser } from "./dialog_edit_user_controller";
import {
  toFormattedDateDDMMYYYYToString,
  toFormattedDateYYYYMMDDToString,
} from "@/utils/functions/formmatter_date";
import Select, { StylesConfig } from "react-select";
import Image from "next/image";
import EditImageProfile from "./edit_image_profile/edit_image_profile";
import { UserContext } from "@/context/userContext";

function DialogEditUser() {
  const { user, setUser } = React.useContext(UserContext);
  const [isLoading, setIsLoading] = useState(false);
  const [madeCane, setMadeCane] = React.useState<boolean>(user!.madeCane);
  const cancelButtonRef = useRef<HTMLButtonElement>(null);

  const customStyles: StylesConfig = {
    control: (provided) => ({
      ...provided,
      backgroundColor: "transparent",
      border: "1px solid black",
      borderRadius: "8px",
    }),
    option: (provided, state) => ({
      ...provided,
      backgroundColor: state.isFocused ? process.env.NEXT_PUBLIC_COLOR_PRIMARY  : "white",
      color: "black",
    }),
  };
  const options = [
    { value: true, label: "Sim" },
    { value: false, label: "Não" },
  ];

  const options2 = [
    { value: 2024, label: 2024 },
    { value: 2023, label: 2023 },
    { value: 2022, label: 2022 },
    { value: 2021, label: 2021 },
    { value: 2020, label: 2020 },
    { value: 2019, label: 2019 },
    { value: 2018, label: 2018 },
    { value: 2017, label: 2017 },
    { value: 2016, label: 2016 },
    { value: 2015, label: 2015 },
    { value: 2014, label: 2014 },
    { value: 2013, label: 2013 },
    { value: 2012, label: 2012 },
    { value: 2011, label: 2011 },
    { value: 2010, label: 2010 },
    { value: 2009, label: 2009 },
    { value: 2008, label: 2008 },
    { value: 2007, label: 2007 },
  ];

  const handleChange = (selectedOption: any) => {
    setMadeCane(selectedOption.value);
  };

  function closeDialog() {
    if (cancelButtonRef.current) {
      cancelButtonRef.current.click();
    }
  }

  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button className="w-fit self-end text-[16px] bg-primary text-background px-[20px] py-[3px] rounded-[5px] hover:brightness-95 duration-200">
          Editar
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="bg-black/50 data-[state=open]:animate-overlayShow fixed inset-0 z-10" />
        <Dialog.Content className="data-[state=open]:animate-contentShow fixed top-[50%] left-[50%]  w-[90vw] max-w-[450px] translate-x-[-50%] translate-y-[-50%] rounded-[6px] bg-background p-[20px] shadow-[hsl(206_22%_7%_/_35%)_0px_10px_38px_-10px,_hsl(206_22%_7%_/_20%)_0px_10px_20px_-15px] focus:outline-none z-10 flex flex-col">
          <Dialog.Title className="text-[20px] font-medium">
            Edite este usuário
          </Dialog.Title>
          <Dialog.Description className="mt-[10px] mb-5 text-[15px]">
            Modifique as informações do usuário nos campos abaixo
          </Dialog.Description>
          <div className="w-[120px] aspect-square rounded-full self-center border-[1px] border-black relative">
            <Image
              alt="Imagem do usuário"
              src={user!.photoUrl}
              width={1000}
              height={1000}
              className="rounded-full min-w-full aspect-square"
            />
            <EditImageProfile closeDialog={closeDialog} />
          </div>

          <form
            onSubmit={(e) =>
              onEditUser({
                e,
                user: user!,
                setIsLoading,
                setUser,
                closeDialog,
              })
            }
            className="flex flex-col items-start gap-y-[8px]"
          >
            <label className="w-full" htmlFor="name">
              <p className="text-[15px] font-[500]">Nome:</p>
              <input
                className="w-full p-[8px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px] placeholder:text-black/60"
                name="name"
                placeholder="Escreva o nome do usuário"
                type="text"
                required
                defaultValue={user!.name}
              />
            </label>
            <div className="flex items-center justify-between w-full max-xsm:flex-col gap-y-[10px]">
              <label className="flex flex-col w-[48%] max-xsm:w-full">
                <p className="text-[18px] max-sm:text-[16px]">
                  já fez o acampamento?
                </p>
                <Select
                  options={options}
                  required={true}
                  name="madeCane"
                  onChange={handleChange}
                  styles={customStyles}
                  defaultValue={options.find(
                    (option) => option.value === user!.madeCane
                  )}
                />
              </label>

              {madeCane && (
                <label className="flex flex-col w-[48%] max-xsm:w-full">
                  <p className="text-[18px] max-sm:text-[16px]">Em que ano?</p>
                  <Select
                    options={options2}
                    required={true}
                    name="madeCaneYear"
                    styles={customStyles}
                    defaultValue={options2.find(
                      (option) => option.value === user!.madeCaneYear
                    )}
                  />
                </label>
              )}
            </div>
            <div className="w-full">
              <p className="text-[15px] font-[500]">Email:</p>
              <div className="w-full p-[10px] rounded-[4px] px-[10px] text-[15px] leading-none shadow-[0_0_0_1px] outline-none focus:shadow-[0_0_0_2px]">
                <p>{user!.email}</p>
              </div>
            </div>
            <div className="flex items-center justify-between w-full max-xsm:flex-col gap-y-[10px]">
              <label htmlFor="totalPresence" className="w-[46%] max-xsm:w-full">
                <p className="text-[15px] font-[500]">
                  Total de Presença: {user!.totalPresence}
                </p>
              </label>
              <label htmlFor="lastPresence" className="w-[48%] max-xsm:w-full">
                <p className="text-[15px] font-[500]">
                  {"Última presença: " +
                    toFormattedDateDDMMYYYYToString(
                      new Date(user!.lastPresence)
                    )}
                </p>
              </label>
            </div>
            <div className="mt-[25px] max-sm:mt-[20px] max-xsm:mt-[15px] flex w-full justify-end gap-x-[15px]">
              <button onClick={() => closeDialog()} className="bg-red text-background hover:brightness-95 focus:shadow-green7 inline-flex py-[8px] items-center justify-center rounded-[4px] px-[15px] font-[500] leading-none focus:shadow-[0_0_0_2px] focus:outline-none ">
                Cancelar
              </button>
              <button
                className="bg-primary text-background hover:brightness-95 focus:shadow-green7 inline-flex items-center justify-center rounded-[4px] px-[15px] font-[500] leading-none focus:shadow-[0_0_0_2px] focus:outline-none"
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

export default DialogEditUser;
