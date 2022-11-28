import React from "react";
import { useNavigate, useLocation } from "react-router-dom";

interface Props {
  Icon: any;
  text: string;
  active: boolean;
  link: string;
  disable: boolean;
}

const NavBtn = ({ Icon, text, active, link, disable }: Props) => {
  const navigate = useNavigate();

  const location = useLocation();

  return (
    <button
      onClick={() => navigate(link)}
      disabled={disable}
      className={`${
        !active || location.pathname === link
          ? "hidden"
          : "inline-flex bg-white text-black items-center space-x-2 py-1 px-2 rounded disabled:cursor-not-allowed"
      }`}
    >
      <Icon size={15} />

      <p className="hidden sm:inline text-sm">{text}</p>
    </button>
  );
};

export default NavBtn;
