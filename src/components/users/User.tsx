import React from "react";
import { UserProps } from "../../types";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Props {
  user: UserProps;
}

const User = ({ user }: Props) => {
  const navigate = useNavigate();

  return (
    <tr className="grid grid-cols-4 justify-items-start border-b-2 border-black">
      <td className="p-3 capitalize">{user.username}</td>

      <td className="p-3">{user.roles.join(", ")}</td>

      <td className="p-3">
        <button onClick={() => navigate(`/dash/users/${user._id}`)}>
          <FaEdit size="20" />
        </button>
      </td>

      <td className="p-3">
        {user.active ? (
          <span className="text-green-500">Yes</span>
        ) : (
          <span className="text-red-500">No</span>
        )}
      </td>
    </tr>
  );
};

export default User;
