import React from "react";
import { Outlet } from "react-router-dom";
import DashFooter from "./DashFooter";
import DashHeader from "./DashHeader";

const DashLayout = () => {
  return (
    <div className="flex flex-col h-full">
      <DashHeader />

      <div className="flex-1">
        <Outlet />
      </div>

      <DashFooter />
    </div>
  );
};

export default DashLayout;
