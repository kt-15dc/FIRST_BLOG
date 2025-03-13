import React from "react";
import { PrimaryButton, OutlineButton } from "./button";

const NavBar = () => {
    return (
        <nav className="flex items-center justify-between py-4 px-28 bg-[#F9F8F6] border-b border-[#DAD6D1]">
          <a href="/" className="text-2xl font-medium text-[#26231E]">
            FEI<span className="text-green-500">.</span>
          </a>
          <div className="hidden md:flex space-x-4">
            <OutlineButton>Log in</OutlineButton>
            <PrimaryButton>Sign up</PrimaryButton>
          </div>
          <button className="md:hidden">Menu</button>
        </nav>
      );
    }

export default NavBar;