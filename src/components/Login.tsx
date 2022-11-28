import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "../context/AuthProvider";
import axios from "../api/axios";
import { useDispatch, useSelector } from "react-redux";
import { persistSelector } from "../store/persists-slice";
import { togglePersist } from "../store/store";
import useTitle from "../hooks/useTitle";

const Login = () => {
  useTitle("Login");

  const navigate = useNavigate();

  const dispatch = useDispatch();

  const authBody = useAuth();

  const persist = useSelector(persistSelector);

  const [username, setUsername] = useState("");

  const [password, setPassword] = useState("");

  const [loading, setLoading] = useState(false);

  const loginHandler = async () => {
    setLoading(true);

    await axios
      .post(
        "/auth/signin",
        {
          username,
          password,
        },
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      )
      .then((res) => {
        authBody?.setAuth(res.data);

        setUsername("");

        setPassword("");

        setLoading(false);

        navigate("/dash");
      })
      .catch((err) => {
        setLoading(false);

        alert(err.response.data);
      });
  };

  return (
    <div className="w-full h-full p-5">
      <h1 className="text-3xl font-medium mb-5">Employee Login</h1>

      <div className="flex flex-wrap items-center gap-2 mb-5 ">
        <label htmlFor="username">Username:</label>

        <input
          className="flex-1 px-2 py-0.5 max-w-md text-black outline-none"
          id="username"
          type="text"
          autoComplete="off"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
        />
      </div>

      <div className="flex flex-wrap items-center gap-2 mb-5 ">
        <label htmlFor="password">Password:</label>

        <input
          className="flex-1 px-2 py-0.5 max-w-md text-black outline-none"
          id="password"
          type="password"
          autoComplete="off"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
        />
      </div>

      <div className="mb-3 mt-1 flex items-center text-sm space-x-1">
        <input
          id="persist"
          type="checkbox"
          onChange={() => dispatch(togglePersist())}
          checked={persist}
        />

        <label htmlFor="persist">Trust This Device</label>
      </div>

      <button
        onClick={loginHandler}
        disabled={loading || !username.trim() || !password.trim()}
        className="bg-white text-black py-1 px-3 rounded disabled:cursor-not-allowed hover:scale-110 transition-transform duration-20"
      >
        Sign In
      </button>

      <Link to="/">
        <p className="cursor-pointer underline mt-3">Go back Home</p>
      </Link>
    </div>
  );
};

export default Login;
