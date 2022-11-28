import React, { useState } from "react";
import { UserProps } from "../../types";
import { useNavigate } from "react-router-dom";
import { CiSaveUp2 } from "react-icons/ci";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";

interface Props {
  users: UserProps[];
}

const NewNoteForm = ({ users }: Props) => {
  const navigate = useNavigate();

  const axiosPrivate = useAxiosPrivate();

  const [loading, setLoading] = useState(false);

  const [title, setTitle] = useState("");

  const [text, setText] = useState("");

  const [user, setUser] = useState(users[0]._id);

  const next = () => {
    setTitle("");

    setText("");

    setUser(users[0]._id);

    navigate("/dash/notes");
  };

  const createNotehandler = async () => {
    setLoading(true);

    axiosPrivate
      .post("/notes", {
        user,
        title,
        text,
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
    <div className="w-full h-full">
      <h1 className="mb-5 text-3xl font-medium">New Note</h1>

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

      <button
        onClick={createNotehandler}
        disabled={loading || !title.trim() || !text.trim() || !user.trim()}
        className="bg-white disabled:cursor-not-allowed text-black flex items-center space-x-2 py-0.5 px-4 rounded-full hover:scale-110 transition-transform duration-20"
      >
        <CiSaveUp2 size={20} />

        <p>Save</p>
      </button>
    </div>
  );
};

export default NewNoteForm;
