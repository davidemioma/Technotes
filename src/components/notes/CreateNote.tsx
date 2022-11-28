import React, { useEffect, useState } from "react";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useTitle from "../../hooks/useTitle";
import { UserProps } from "../../types";
import Spinner from "../Spinner";
import NewNoteForm from "./NewNoteForm";

const CreateNote = () => {
  useTitle("New Note");

  const [users, setUsers] = useState<UserProps[]>([]);

  const axiosPrivate = useAxiosPrivate();

  const [loadingUsers, setLoadingUsers] = useState(false);

  useEffect(() => {
    setLoadingUsers(true);

    const fetchUsers = async () => {
      await axiosPrivate
        .get("/users")
        .then((res) => {
          setUsers(res.data);

          setLoadingUsers(false);
        })
        .catch((err) => {
          setLoadingUsers(false);

          alert(err.response.data);
        });
    };

    fetchUsers();
  }, []);

  if (loadingUsers) return <Spinner />;

  return (
    <div className="px-5 w-full h-full">
      {users.length > 0 ? (
        <NewNoteForm users={users} />
      ) : (
        <p>You have no users to assign a note to!</p>
      )}
    </div>
  );
};

export default CreateNote;
