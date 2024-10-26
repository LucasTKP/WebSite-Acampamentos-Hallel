import React from "react";
import Form_signin from "./form_signin/form_signin";
import Form_signup from "./form_signup/form_signup";
import Image from "next/image";

enum enumOptionAuth {
  "SignIn",
  "SignUp",
}

export default function Auth() {
  const [optionAuth, setOptionAuth] = React.useState<enumOptionAuth>(
    enumOptionAuth.SignIn
  );

  return (
    <div className="flex flex-col items-center pb-[30px] flex-auto">
      <Image
        src={process.env.NEXT_PUBLIC_PATH_LOGO!}
        alt="Logo"
        width={200}
        height={200}
        priority
      />

      <div className="flex-auto flex justify-center items-center">
        <div
          style={{ filter: "drop-shadow(0 1px 5px rgba(0, 0, 0, 0.2))" }}
          className="w-[450px] max-sm:w-[400px] max-xsm:w-[350px] bg-background rounded-[10px]"
        >
          <div className="flex justify-between">
            <button
              className={`w-full ${
                optionAuth == enumOptionAuth.SignIn
                  ? "bg-primary text-background"
                  : "bg-background text-black/60"
              }    hover:brightness-95 rounded-tl-[10px] duration-200`}
              onClick={() => setOptionAuth(enumOptionAuth.SignIn)}
            >
              <p className="font-[500] text-[18px] max-sm:text-[16px]">
                Entrar
              </p>
            </button>

            <div className="w-[5px] bg-black h-[45px] max-sm:h-[40px]" />

            <button
              className={`w-full ${
                optionAuth == enumOptionAuth.SignUp
                  ? "bg-primary text-background"
                  : "bg-background text-black/60"
              }  hover:brightness-95 rounded-tr-[10px] duration-200`}
              onClick={() => setOptionAuth(enumOptionAuth.SignUp)}
            >
              <p className="font-[500] text-[18px]">Cadastrar</p>
            </button>
          </div>
          <div className="w-[fullpx] bg-black h-[2px]" />
          <div className="px-[25px] pb-[20px]">
            {optionAuth == enumOptionAuth.SignIn ? (
              <Form_signin />
            ) : (
              <Form_signup />
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
