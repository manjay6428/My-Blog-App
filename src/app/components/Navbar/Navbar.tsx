"use client";
import React, { FC, useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { User } from "next-auth";
import AccountMenu from "../Account-Menu/AccountMenu";
interface INavbar {
  user: User | undefined;
}
const Navbar: FC<INavbar> = ({ user }) => {
  console.log("home -> user", user);
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen(false);
  };
  return (
    <div className=" flex flex-row justify-between items-center p-4 w-full h-[40px]">
      <div className="left">
        <Link href={"/"}>
          <p className=" font-bold text-2xl">
            Blog<span className=" text-red-400">App</span>
          </p>
        </Link>
      </div>
      <div>
        {user ? (
          <div className=" flex gap-4 justify-center items-center">
            <p className=" font-medium text-xl">{user.name}</p>
            <AccountMenu />
          </div>
        ) : (
          <Link href={"/login"}>
            <Button variant={"ghost"}>Login</Button>
          </Link>
        )}
      </div>
    </div>
  );
};

export default Navbar;
