import { enumEye } from "@/models/enum_eye";
import { EyeClosedIcon, EyeOpenIcon } from "@radix-ui/react-icons";
import React from "react";
import Select, { StylesConfig } from "react-select";
import { onCreateUser } from "./form_signup_controller";

const customStyles: StylesConfig = {
  control: (provided) => ({
    ...provided,
    backgroundColor: "transparent",
    border: "1px solid black",
    borderRadius: "8px",
  }),
  option: (provided, state) => ({
    ...provided,
    backgroundColor: state.isFocused
      ? process.env.NEXT_PUBLIC_COLOR_PRIMARY
      : "white",
    color: "black",
  }),
};

export default function Form_signup() {
  const [eye, setEye] = React.useState<enumEye>(enumEye.Close);
  const [madeCane, setMadeCane] = React.useState<boolean>(false);
  const [isLoading, setIsLoading] = React.useState<boolean>(false);

  const yearsMadeCane = Array.from(
    { length: new Date().getFullYear() - 2006 },
    (_, i) => {
      const date = new Date().getFullYear() - i;
      return { value: date, label: date };
    }
  );

  const handleChange = (selectedOption: any) => {
    setMadeCane(selectedOption.value);
  };

  return (
    <div>
      <h1 className="font-poiretOne text-[45px] max-sm:text-[40px] max-xsm:text-[35px]">
        Registre seus dados
      </h1>
      <form
        className="mt-[10px] flex flex-col gap-y-[10px]"
        onSubmit={(e) => onCreateUser({ e, setIsLoading })}
      >
        <label className="flex flex-col">
          <p className="text-[18px]">Nome Completo</p>
          <input
            placeholder="Digite seu nome "
            type="text"
            name="name"
            required={true}
            minLength={4}
            maxLength={100}
            className="p-[6px] rounded-[8px] border-black border-[1px] bg-transparent"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-[18px]">Email</p>
          <input
            placeholder="Digite seu email"
            type="email"
            name="email"
            required={true}
            className="p-[6px] rounded-[8px] border-black border-[1px] bg-transparent"
          />
        </label>

        <label className="flex flex-col">
          <p className="text-[18px]">Senha</p>
          <div className="rounded-[8px] border-black border-[1px] flex items-center">
            <input
              placeholder="Digite sua senha"
              type={eye == enumEye.Close ? "password" : "text"}
              name="password"
              required={true}
              minLength={6}
              maxLength={100}
              className="p-[6px] rounded-[8px] bg-transparent w-full outline-none"
            />
            {eye == enumEye.Close ? (
              <EyeClosedIcon
                className="w-[23px] h-[23px] mr-[5px] cursor-pointer"
                onClick={() => setEye(enumEye.Open)}
              />
            ) : (
              <EyeOpenIcon
                className="w-[23px] h-[23px] mr-[5px] cursor-pointer"
                onClick={() => setEye(enumEye.Close)}
              />
            )}
          </div>
        </label>
        <label className="flex flex-col">
          <p className="text-[18px]">Confirme sua senha</p>
          <div className="rounded-[8px] border-black border-[1px] flex items-center">
            <input
              placeholder="Digite sua senha novamente"
              type={eye == enumEye.Close ? "password" : "text"}
              name="confirmPassword"
              required={true}
              minLength={6}
              maxLength={100}
              className="p-[6px] rounded-[8px] bg-transparent w-full outline-none"
            />
            {eye == enumEye.Close ? (
              <EyeClosedIcon
                className="w-[23px] h-[23px] mr-[5px] cursor-pointer"
                onClick={() => setEye(enumEye.Open)}
              />
            ) : (
              <EyeOpenIcon
                className="w-[23px] h-[23px] mr-[5px] cursor-pointer"
                onClick={() => setEye(enumEye.Close)}
              />
            )}
          </div>
        </label>
        <label className="flex flex-col">
          <p className="text-[18px]">
            Você já fez o acampamento {process.env.NEXT_PUBLIC_NAME_CAMPING}?
          </p>
          <Select
            options={[
              { value: true, label: "Sim" },
              { value: false, label: "Não" },
            ]}
            required={true}
            name="madeCane"
            onChange={handleChange}
            styles={customStyles}
          />
        </label>

        {madeCane && (
          <label className="flex flex-col">
            <p className="text-[16px]">Em qual ano você fez o acampamento?</p>
            <Select
              options={yearsMadeCane}
              required={true}
              name="madeCaneYear"
              styles={customStyles}
            />
          </label>
        )}
        <button
          disabled={isLoading}
          className={
            "w-full mt-[20px] p-[6px] rounded-[8px] bg-primary text-[18px] font-[500] hover:brightness-95 duration-200 flex justify-center items-center text-background"
          }
          type={"submit"}
        >
          {isLoading ? (
            <div className="relative flex items-center justify-center w-[30px] h-[30px] rounded-full border-[7px] border-t-gray-400 border-background animate-spin" />
          ) : (
            "Cadastrar"
          )}
        </button>
      </form>
    </div>
  );
}
