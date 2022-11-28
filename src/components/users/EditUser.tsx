import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { UserProps } from "../../types";
import EditForm from "./EditForm";
import useAxiosPrivate from "../../hooks/useAxiosPrivate";
import Spinner from "../Spinner";
import useTitle from "../../hooks/useTitle";

const EditUser = () => {
  useTitle("Edit");

  const { id } = useParams();

  const axiosPrivate = useAxiosPrivate();

  const [user, setUser] = useState<UserProps | null>(null);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      setLoading(true);

      await axiosPrivate
        .get(`/users/${id}`)
        .then((res) => {
          setUser(res.data);

          setLoading(false);
        })
        .catch((err) => {
          setLoading(false);

          alert(err.response.data);
        });
    };

    fetchUser();
  }, [id]);

  if (loading) return <Spinner />;

  return (
    <div className="px-5 w-full h-full text-white">
      {user ? (
        <EditForm user={user} />
      ) : (
        <p className="px-5">User not found!</p>
      )}
    </div>
  );
};

export default EditUser;
