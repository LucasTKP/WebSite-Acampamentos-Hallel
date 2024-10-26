import React from "react";
import Image from "next/image";
import Link from "next/link";
import { PersonIcon, ReaderIcon } from "@radix-ui/react-icons";
import { usePathname } from "next/navigation";

function Navbar() {
  const path = usePathname();
  const [menuIsOpen, setMenuIsOpen] = React.useState(false);
  return (
    <div className="min-w-[120px] max-md:min-w-[10px]">
      <button
        id="Menu"
        aria-label="Botão menu"
        onClick={() => setMenuIsOpen(!menuIsOpen)}
        className={`md:hidden outline-none w-[30px] h-[25px] cursor-pointer  fixed top-[10px] flex flex-col items-center justify-center z-10 bg-background ${
          menuIsOpen ? "left-[33px]" : "left-[10px]"
        }`}
      >
        <div
          className={`rounded-[30px] w-[25px] h-[3px] bg-terciary dark:bg-dterciary duration-200 ${
            menuIsOpen && "rotate-45"
          }`}
        />
        <div
          className={`rounded-[30px] w-[25px] h-[3px] bg-terciary dark:bg-dterciary my-[3px] duration-200 ${
            menuIsOpen && "hidden"
          } `}
        />
        <div
          className={`rounded-[30px] w-[25px] h-[3px] bg-terciary dark:bg-dterciary duration-200 ${
            menuIsOpen && "rotate-[135deg] mt-[-3px]"
          }`}
        />
      </button>

      <div
        className={`bg-background w-[100px] h-screen fixed border-r-[2px] border-r-primary flex flex-col items-center duration-200 ${
          menuIsOpen ? "left-0" : "max-md:left-[-200px]"
        }`}
      >
        <Image
          alt="logo"
          src={process.env.NEXT_PUBLIC_PATH_LOGO!}
          width={80}
          height={80}
          className={`object-cover mt-[20px] max-md:mt-[40px]`}
          priority
        />
        <Link
          href={"/admin"}
          className="w-full flex justify-center h-[35px] relative mt-[30px]"
          onClick={() => setMenuIsOpen(false)}
        >
          {path === "/admin" && (
            <div className="w-[5px] h-[130%] absolute bg-primary rounded-full left-0 top-1/2 transform -translate-y-1/2" />
          )}
          <PersonIcon
            width={35}
            height={35}
            className={`h-full ${
              path === "/admin" ? "text-primary" : "text-gray-600"
            }`}
          />
        </Link>

        <Link
          href={"/admin/meetings"}
          className="w-full flex justify-center h-[35px] relative mt-[30px]"
          onClick={() => setMenuIsOpen(false)}
        >
          {path === "/admin/meetings" && (
            <div className="w-[5px] h-[130%] absolute bg-primary rounded-full left-0 top-1/2 transform -translate-y-1/2" />
          )}
          <ReaderIcon
            width={35}
            height={35}
            className={`h-full ${
              path === "/admin/meetings" ? "text-primary" : "text-gray-600"
            }`}
          />
        </Link>
      </div>
    </div>
  );
}

export default Navbar;
