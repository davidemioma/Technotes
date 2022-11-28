import React from "react";
import { NoteProps } from "../../types";
import { FaEdit } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

interface Props {
  note: NoteProps;
}

const Note = ({ note }: Props) => {
  const navigate = useNavigate();

  return (
    <tr className="grid grid-cols-4 justify-items-start border-b-2 border-black">
      <td className="p-3 capitalize">{note.username}</td>

      <td className="p-3">{note.title}</td>

      <td className="p-3">
        {note.completed ? (
          <span className="text-green-500">Completed</span>
        ) : (
          <span className="text-red-500">Open</span>
        )}
      </td>

      <td className="p-3">
        <button onClick={() => navigate(`/dash/notes/${note._id}`)}>
          <FaEdit size="20" />
        </button>
      </td>
    </tr>
  );
};

export default Note;
