import React, { useState, useEffect } from "react";
import { Link, Outlet } from "react-router-dom";
import useRefreshToken from "../hooks/useRefreshToken";
import { useAuth } from "../context/AuthProvider";
import { useSelector } from "react-redux";
import { persistSelector } from "../store/persists-slice";

const PersistsLogin = () => {
  const authBody = useAuth();

  const persist = useSelector(persistSelector);

  const refresh = useRefreshToken();

  const [isLoading, setIsLoading] = useState(true);

  const [error, setError] = useState(false);

  useEffect(() => {
    const verifyRefreshToken = async () => {
      try {
        await refresh();
      } catch (err) {
        console.log(err);

        setError(true);
      } finally {
        setIsLoading(false);
      }
    };

    !authBody?.auth?.accessToken && persist
      ? verifyRefreshToken()
      : setIsLoading(false);
  }, []);

  let content;

  if (!persist) {
    content = <Outlet />;
  } else if (isLoading) {
    content = <p>Loading...</p>;
  } else if (error) {
    content = (
      <Link className="underline mt-5 px-5" to="/login">
        Please Login again
      </Link>
    );
  } else {
    content = <Outlet />;
  }

  return <>{content}</>;
};

export default PersistsLogin;
