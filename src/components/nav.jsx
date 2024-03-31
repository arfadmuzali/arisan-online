"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import profileDefault from "@/../public/default-profile.png";
import { Button } from "./ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu";

export default function Nav() {
  const { data, status } = useSession();

  return (
    <div className="flex p-3 justify-between items-center bg-neutral-100">
      <Link href="/" className="text-2xl font-bold">
        Arisan Online
      </Link>
      <div className="flex justify-center items-center text-black gap-5">
        <Link href={"/"}>Home</Link>
        {status === "authenticated" ? (
          <>
            <p className="text-black md:block hidden">{data?.user?.name}</p>
            <DropdownMenu>
              <DropdownMenuTrigger className="outline-none">
                {" "}
                <img
                  src={profileDefault.src && data?.user?.image}
                  alt="profile"
                  className="border rounded-full w-10"
                />
              </DropdownMenuTrigger>
              <DropdownMenuContent>
                <DropdownMenuItem className="text-red-400">
                  <Link href={"/auth/signout"}>Log Out</Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </>
        ) : (
          <>
            <p className="text-black text-sm">not signed in yet</p>
          </>
        )}
      </div>
    </div>
  );
}
