"use client";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "@/context/userContext";
import { useRouter } from "next/navigation";
import Navbar from "@/components/admin/navbar/navbar";
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user } = useContext(UserContext);
  const router = useRouter();

  useEffect(() => {
    if (user?.isAdmin === false) router.push("/home");
  }, [router, user]);
  return (
    <div className="flex">
      {user?.isAdmin && (
        <>
          <Navbar />
          {children}
        </>
      )}
    </div>
  );
}
