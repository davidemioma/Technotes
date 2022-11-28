import React, { useState } from "react";
import { NoteProps, UserProps } from "../../types";
import { useNavigate } from "react-router-dom";
import axios from "../../api/axios";
import { CiSaveUp2 } from "react-icons/ci";
import { MdDelete } from "react-icons/md";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import { useAuth } from "../../context/AuthProvider";

interface Props {
  note: NoteProps;
  users: UserProps[];
}

const EditNoteForm = ({ note, users }: Props) => {
  const navigate = useNavigate();

  const authBody = useAuth();

  const canDelete =
    authBody?.auth?.roles.includes("Manager") ||
    authBody?.auth?.roles.includes("Admin");

  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState(note.title);

  const [text, setText] = useState(note.text);

  const [completed, setCompleted] = useState(note.completed);

  const [user, setUser] = useState(note.user);

  const updateNoteHandler = async () => {
    setLoading(true);

    await axiosPrivate
      .patch("/notes", {
        id: note._id,
        user,
        title,
        text,
        completed,
      })
      .then(() => {
        setLoading(false);

        navigate("/dash/notes");
      })
      .catch((err) => {
        setLoading(false);

        alert(err.response.data);
      });
  };

  const deleteNoteHandler = async () => {
    setLoading(true);

    await axiosPrivate
      .delete(`/notes/${note._id}`)
      .then(() => {
        setLoading(false);

        navigate("/dash/notes");
      })
      .catch((err) => {
        setLoading(false);

        alert(err.response.data);
      });
  };

  return (
    <div className="w-full h-full">
      <h1 className="mb-5 text-3xl font-medium">Edit #{note.ticket}</h1>

      <div className="flex items-center gap-2 mb-5 ">
        <label htmlFor="title">Title:</label>

        <input
          className="flex-1 px-2 py-0.5 max-w-md text-black outline-none"
          id="title"
          type="text"
          autoComplete="off"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          placeholder="Title"
        />
      </div>

      <div className="flex gap-2 mb-5 ">
        <label htmlFor="text">Text:</label>

        <textarea
          className="flex-1 px-2 py-0.5 max-w-md text-black outline-none"
          id="text"
          rows={5}
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Text"
        />
      </div>

      <div className="flex items-center space-x-2 mb-5">
        <label htmlFor="completed">Completed:</label>

        <input
          id="completed"
          type="checkbox"
          checked={completed}
          onChange={(e) => setCompleted((prev) => !prev)}
        />
      </div>

      <div className="flex items-center space-x-2 mb-5">
        <label htmlFor="username">ASSIGNED TO:</label>

        <select
          className="text-black py-1 px-2 outline-none"
          id="username"
          value={user}
          onChange={(e) => setUser(e.target.value)}
        >
          {users.map((user) => (
            <option key={user._id} value={user._id}>
              {user.username}
            </option>
          ))}
        </select>
      </div>

      <div className="flex items-center space-x-4">
        <button
          onClick={updateNoteHandler}
          disabled={loading || !title.trim() || !text.trim() || !user.trim()}
          className="bg-white disabled:cursor-not-allowed text-black flex items-center space-x-2 py-0.5 px-4 rounded-full hover:scale-110 transition-transform duration-20"
        >
          <CiSaveUp2 size={20} />

          <p>Save</p>
        </button>

        {canDelete && (
          <button
            onClick={deleteNoteHandler}
            disabled={loading}
            className="bg-white disabled:cursor-not-allowed text-black flex items-center space-x-2 py-0.5 px-4 rounded-full hover:scale-110 transition-transform duration-20"
          >
            <MdDelete size={20} />

            <p>Delete</p>
          </button>
        )}
      </div>
    </div>
  );
};

export default EditNoteForm;
