"use client";
import { UserContext } from "@/context/userContext";
import { auth } from "@/lib/firebase_config";
import { signOut } from "firebase/auth";
import { useRouter } from "next/navigation";
import React, { useContext } from "react";
import Image from "next/image";

export default function Header() {
  const router = useRouter();
  const { user } = useContext(UserContext);
  return (
    <div className="flex items-center text-[18px] max-lg:text-[16px] relative ">
      {user?.isAdmin && (
        <button
          onClick={() => router.push("/admin")}
          className="bg-primary px-[10px] py-[3px] rounded-[4px] font-[500] text-background hover:brightness-95 duration-200 absolute left-0 max-xsm:text-[14px]"
        >
          Administrador
        </button>
      )}

      <Image
        src={process.env.NEXT_PUBLIC_PATH_LOGO!}
        alt="Logo"
        width={80}
        height={80}
        className="mx-auto"
      />

      <button
        onClick={() => signOut(auth)}
        className="bg-red px-[10px] py-[3px] rounded-[4px] font-[500] text-background hover:brightness-95 duration-200 absolute right-0"
      >
        Sair
      </button>
    </div>
  );
}
