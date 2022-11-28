import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ROLES } from "../../config/roles";
import { CiSaveUp2 } from "react-icons/ci";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useTitle from "../../hooks/useTitle";

const USER_REGEX = /^[A-z]{3,20}$/;

const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const CreateUser = () => {
  useTitle("New User");

  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);

  const [username, setUsername] = useState("");

  const [validUsername, setValidUsername] = useState(false);

  const [password, setPassword] = useState("");

  const [validPassword, setValidPassword] = useState(false);

  const [roles, setRoles] = useState(["Employee"]);

  useEffect(() => {
    setValidUsername(USER_REGEX.test(username));
  }, [username]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  const onRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const values = Array.from(
      e.target.selectedOptions,
      (option) => option.value
    );

    setRoles(values);
  };

  const next = () => {
    setUsername("");

    setPassword("");

    setRoles([]);

    navigate("/dash/users");
  };

  const createUserHandler = async () => {
    setLoading(true);

    await axiosPrivate
      .post("/users", {
        username,
        password,
        roles,
      })
      .then(() => {
        setLoading(false);

        next();
      })
      .catch((err) => {
        setLoading(false);

        alert(err.response.data);
      });
  };

  return (
    <div className="w-full h-full px-5">
      <div>
        <h1 className="mb-5 text-3xl font-medium">New User</h1>

        <div className="flex flex-wrap items-center gap-2 mb-5 ">
          <label htmlFor="username">Username:</label>

          <input
            className="flex-1 px-2 py-0.5 max-w-md text-black outline-none"
            id="username"
            type="text"
            autoComplete="off"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="[3-20 letters]"
          />

          {username.trim() && !validUsername && (
            <p className="text-red-500 text-sm">Enter a valid username</p>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2 mb-5">
          <label htmlFor="password">Password:</label>

          <input
            className="flex-1 px-2 py-0.5 max-w-md text-black outline-none"
            id="password"
            type="password"
            autoComplete="off"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="[4-12 chars incl. !@#$%]"
          />

          {password.trim() && !validPassword && (
            <p className="text-red-500 text-sm">Enter a valid password</p>
          )}
        </div>

        <div className="flex space-x-2 mb-5">
          <label htmlFor="roles">ASSIGNED ROLES:</label>

          <select
            className={`text-black outline-none p-1`}
            id="roles"
            multiple
            size={Object.values(ROLES).length}
            value={roles}
            onChange={onRoleChange}
          >
            {Object.values(ROLES).map((role) => (
              <option key={role} value={role}>
                {role}
              </option>
            ))}
          </select>
        </div>

        <button
          onClick={createUserHandler}
          disabled={
            loading || !validUsername || !validPassword || !roles.length
          }
          className="bg-white disabled:cursor-not-allowed text-black flex items-center space-x-2 py-0.5 px-4 rounded-full hover:scale-110 transition-transform duration-20"
        >
          <CiSaveUp2 size={20} />

          <p>Save</p>
        </button>
      </div>
    </div>
  );
};

export default CreateUser;
