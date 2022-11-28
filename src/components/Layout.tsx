import React from "react";
import { Outlet } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const Layout = ({ children }: Props) => {
  return (
    <div className="relative w-screen h-screen overflow-hidden">
      <img
        className="absolute top-0 w-full h-full object-cover"
        src="/bg.jpeg"
        alt=""
      />

      <div className="absolute top-0 w-full h-full bg-[#0F172A]/90"></div>

      <div className="absolute z-10 text-white h-full w-full">{children}</div>
    </div>
  );
};

export default Layout;
