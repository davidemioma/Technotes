import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import useTitle from "../hooks/useTitle";

const Welcome = () => {
  useTitle("Dashboard");

  const authBody = useAuth();

  const date = new Date();

  const today = new Intl.DateTimeFormat("en-US", {
    dateStyle: "full",
    timeStyle: "long",
  }).format(date);

  const canView =
    authBody?.auth?.roles.includes("Manager") ||
    authBody?.auth?.roles.includes("Admin");

  return (
    <section className="px-5 mb-5">
      <p className="mb-5">{today}</p>

      <h1 className="text-2xl font-semibold mb-3 capitalize">
        Welcome {authBody?.auth?.username}!
      </h1>

      <p className="mb-2">
        <Link to="/dash/notes">. View techNotes</Link>
      </p>

      <p className="mb-2">
        <Link to="/dash/notes/new">. Add a new techNotes</Link>
      </p>

      {canView && (
        <p className="mb-2">
          <Link to="/dash/users">. View User Settings</Link>
        </p>
      )}

      {canView && (
        <p className="mb-2">
          <Link to="/dash/users/new">. Add a new User</Link>
        </p>
      )}
    </section>
  );
};

export default Welcome;
