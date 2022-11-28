import React from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { AiFillHome } from "react-icons/ai";
import { useAuth } from "../context/AuthProvider";
import { getStatus } from "../util/getStatus";

const DashFooter = () => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const authBody = useAuth();

  return (
    <footer className="flex items-center space-x-5 w-full py-2 px-5 border-t-2 border-white">
      {pathname !== "/dash" && (
        <button onClick={() => navigate("/dash")} className="">
          <AiFillHome size={20} />
        </button>
      )}

      <p className="capitalize">Current User: {authBody?.auth?.username}</p>

      <p>Status: {getStatus(authBody?.auth?.roles)}</p>
    </footer>
  );
};

export default DashFooter;
