import React, { useEffect, useState } from "react";
import { ROLES } from "../../config/roles";
import { UserProps } from "../../types";
import { CiSaveUp2 } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface Props {
  user: UserProps;
}

const USER_REGEX = /^[A-z]{3,20}$/;

const PWD_REGEX = /^[A-z0-9!@#$%]{4,12}$/;

const EditForm = ({ user }: Props) => {
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const [isLoading, setIsLoading] = useState(false);

  const [username, setUsername] = useState(user.username);

  const [validUsername, setValidUsername] = useState(false);

  const [password, setPassword] = useState("");

  const [validPassword, setValidPassword] = useState(false);

  const [roles, setRoles] = useState(user.roles);

  const [active, setActive] = useState(user.active);

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

  let canSave;

  if (password.trim()) {
    canSave =
      [roles.length, validUsername, validPassword].every(Boolean) && !isLoading;
  } else {
    canSave = [roles.length, validUsername].every(Boolean) && !isLoading;
  }

  const updateUserHandler = async () => {
    setIsLoading(true);

    if (password) {
      await axiosPrivate
        .patch("/users", {
          id: user._id,
          username,
          roles,
          active,
          password,
        })
        .then(() => {
          setIsLoading(false);

          navigate("/dash/users");
        })
        .catch((err) => {
          setIsLoading(false);

          alert(err.response.data);
        });
    } else {
      await axiosPrivate
        .patch("/users", {
          id: user._id,
          username,
          roles,
          active,
        })
        .then(() => {
          setIsLoading(false);

          navigate("/dash/users");
        })
        .catch((err) => {
          setIsLoading(false);

          alert(err.response.data);
        });
    }
  };

  const deleteUserHandler = async () => {
    setIsLoading(true);

    await axiosPrivate
      .delete(`/users/${user._id}`)
      .then(() => {
        setIsLoading(false);

        navigate("/dash/users");
      })
      .catch((err) => {
        setIsLoading(false);

        alert(err.response.data);
      });
  };

  return (
    <div>
      <h1 className="mb-5 text-3xl font-medium">Edit {user.username}</h1>

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

      <div className="flex items-center space-x-2 mb-5">
        <label htmlFor="active">Active:</label>

        <input
          id="active"
          type="checkbox"
          checked={active}
          onChange={(e) => setActive((prev) => !prev)}
        />
      </div>

      <div className="flex space-x-2 mb-5">
        <label htmlFor="roles">ASSIGNED ROLES:</label>

        <select
          className={`${
            !roles.length && "border border-red-500"
          } text-black outline-none p-1`}
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

      <div className="flex items-center space-x-3">
        <button
          onClick={updateUserHandler}
          disabled={!canSave}
          className="bg-white disabled:cursor-not-allowed text-black flex items-center space-x-2 py-0.5 px-4 rounded-full hover:scale-110 transition-transform duration-20"
        >
          <CiSaveUp2 size={20} />

          <p>Save</p>
        </button>

        <button
          onClick={deleteUserHandler}
          disabled={isLoading}
          className="bg-white disabled:cursor-not-allowed text-black flex items-center space-x-2 py-0.5 px-4 rounded-full hover:scale-110 transition-transform duration-20"
        >
          <MdDelete size={20} />

          <p>Delete</p>
        </button>
      </div>
    </div>
  );
};

export default EditForm;
