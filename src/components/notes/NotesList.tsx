import React, { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import useTitle from "../../hooks/useTitle";
import { NoteProps } from "../../types";
import Spinner from "../Spinner";
import Note from "./Note";

const NotesList = () => {
  useTitle("Notes");

  const axiosPrivate = useAxiosPrivate();

  const authBody = useAuth();

  const [notes, setNotes] = useState<NoteProps[]>([]);

  const [loading, setLoading] = useState(false);

  const canView =
    authBody?.auth?.roles.includes("Manager") ||
    authBody?.auth?.roles.includes("Admin");

  useEffect(() => {
    const fetchNotes = async () => {
      setLoading(true);

      await axiosPrivate
        .get("/notes")
        .then((res) => {
          setNotes(res.data);

          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);

          alert(err.response.data);
        });
    };

    fetchNotes();
  }, []);

  if (loading) return <Spinner />;

  return (
    <div className="h-[80vh] overflow-y-scroll px-5 text-xs sm:text-base">
      {notes.length > 0 ? (
        <table className="w-full bg-[#FFF] text-[#000] ">
          <thead>
            <tr className="grid grid-cols-4 justify-items-start border-b-2 border-black">
              <th className="p-3">Username</th>

              <th className="p-3">Title</th>

              <th className="p-3">Status</th>

              <th className="p-3">Edit</th>
            </tr>
          </thead>

          {canView ? (
            <tbody>
              {notes
                .sort((a, b) => Number(a.completed) - Number(b.completed))
                .map((note) => (
                  <Note key={note._id} note={note} />
                ))}
            </tbody>
          ) : (
            <tbody>
              {notes
                .filter((note) => note.username === authBody?.auth?.username)
                .sort((a, b) => Number(a.completed) - Number(b.completed))
                .map((note) => (
                  <Note key={note._id} note={note} />
                ))}
            </tbody>
          )}
        </table>
      ) : (
        <p>Not available! Refresh the page.</p>
      )}
    </div>
  );
};

export default NotesList;
