"use client";
import Auth from "@/components/auth/auth";
import Link from "next/link";

export default function Page() {
  return (
    <main className="min-h-svh flex flex-col">
      <Auth />
      <footer className="h-[60px] w-full  bg-secondary/30 flex flex-col justify-center items-center mt-auto">
        <Link href="https://wa.me/5516991614062" className="text-[12px]">
          Desenvolvido por: 16 99161-4062
        </Link>
        <p>{`Direitos reservados - ${
          process.env.NEXT_PUBLIC_NAME_CAMPING
        } ${new Date().getFullYear()}`}</p>
      </footer>
    </main>
  );
}
