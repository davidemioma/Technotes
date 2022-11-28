import React, { useEffect, useState } from "react";
import { NoteProps, UserProps } from "../../types";
import { useParams } from "react-router-dom";
import EditNoteForm from "./EditNoteForm";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Spinner from "../Spinner";
import { useAuth } from "../../context/AuthProvider";
import useTitle from "../../hooks/useTitle";

const EditNote = () => {
  useTitle("Edit Note");

  const { id } = useParams();

  const authBody = useAuth();

  const axiosPrivate = useAxiosPrivate();

  const [users, setUsers] = useState<UserProps[]>([]);

  const [note, setNote] = useState<NoteProps | null>(null);

  const [loadingUsers, setLoadingUsers] = useState(false);

  const [loadingNote, setLoadingNote] = useState(false);

  useEffect(() => {
    const fetchNote = async () => {
      setLoadingNote(true);

      await axiosPrivate
        .get(`/notes/${id}`)
        .then((res) => {
          setNote(res.data);

          setLoadingNote(false);
        })
        .catch((err) => {
          setLoadingNote(false);

          alert(err.response.data);
        });
    };

    fetchNote();
  }, [id]);

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

  if (loadingUsers || loadingNote) return <Spinner />;

  if (
    !authBody?.auth?.roles.includes("Manager") &&
    !authBody?.auth?.roles.includes("Admin")
  ) {
    if (note?.username !== authBody?.auth?.username) {
      return (
        <p className="px-5">No access! this note was not assigned to you</p>
      );
    }
  }

  return (
    <div className="px-5 w-full h-full">
      {note && users ? (
        <EditNoteForm note={note} users={users} />
      ) : (
        <p>Note and Users are not availabe!</p>
      )}
    </div>
  );
};

export default EditNote;
