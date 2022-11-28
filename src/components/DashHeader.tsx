import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "../api/axios";
import { useAuth } from "../context/AuthProvider";
import { AiOutlineLogout } from "react-icons/ai";
import { BiUserPlus } from "react-icons/bi";
import { FaUsers } from "react-icons/fa";
import { MdOutlineAddTask, MdOutlineTaskAlt } from "react-icons/md";
import NavBtn from "./NavBtn";

const DashHeader = () => {
  const authBody = useAuth();

  const navigate = useNavigate();

  const [loading, setLoading] = useState(false);

  const canClick =
    authBody?.auth?.roles.includes("Manager") ||
    authBody?.auth?.roles.includes("Admin");

  const logoutHandler = async () => {
    setLoading(true);

    await axios
      .get("/auth/logout", {
        withCredentials: true,
      })
      .then(() => {
        setLoading(false);

        authBody?.setAuth(null);

        navigate("/");
      })
      .catch((err) => {
        setLoading(false);

        alert(err.response.data);
      });
  };

  return (
    <header className="px-5 py-1 border-b-2 border-white mb-5">
      <div className="flex items-center justify-between py-1">
        <Link to="/dash">
          <h1 className="text-lg sm:text-xl md:text-3xl font-semibold">
            techNotes
          </h1>
        </Link>

        <nav className="flex items-center space-x-2">
          <NavBtn
            Icon={FaUsers}
            text="Users"
            active={canClick || false}
            link="/dash/users"
            disable={loading}
          />

          <NavBtn
            Icon={BiUserPlus}
            text="New User"
            active={canClick || false}
            link="/dash/users/new"
            disable={loading}
          />

          <NavBtn
            Icon={MdOutlineTaskAlt}
            text="Notes"
            active={true}
            link="/dash/notes"
            disable={loading}
          />

          <NavBtn
            Icon={MdOutlineAddTask}
            text="New Note"
            active={true}
            link="/dash/notes/new"
            disable={loading}
          />

          <button
            className="bg-white text-black flex items-center space-x-2 py-1 px-2 rounded disabled:cursor-not-allowed"
            onClick={logoutHandler}
            disabled={loading}
          >
            <AiOutlineLogout size={15} />

            <p className="hidden sm:inline text-sm">
              {loading ? "Logging out..." : "Logout"}
            </p>
          </button>
        </nav>
      </div>
    </header>
  );
};

export default DashHeader;
