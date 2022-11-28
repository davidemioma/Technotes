import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useTitle from "../../hooks/useTitle";
import { UserProps } from "../../types";
import Spinner from "../Spinner";
import User from "./User";

const UsersList = () => {
  useTitle("Staff");

  const [users, setUsers] = useState<UserProps[]>([]);

  const [loading, setLoading] = useState(false);

  const axiosPrivate = useAxiosPrivate();

  useEffect(() => {
    const fetchUsers = async () => {
      setLoading(true);

      await axiosPrivate
        .get("/users")
        .then((res) => {
          setUsers(res.data);

          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);

          alert(err.response.data);
        });
    };

    fetchUsers();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="h-[80vh] overflow-y-scroll px-5 text-xs sm:text-base">
      {users.length > 0 ? (
        <table className="w-full bg-[#FFF] text-[#000] ">
          <thead>
            <tr className="grid grid-cols-4 justify-items-start border-b-2 border-black">
              <th className="p-3">Username</th>

              <th className="p-3">Roles</th>

              <th className="p-3">Edit</th>

              <th className="p-3">Active</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <User key={user._id} user={user} />
            ))}
          </tbody>
        </table>
      ) : (
        <p>Not available! Refresh the page.</p>
      )}
    </div>
  );
};

export default UsersList;
