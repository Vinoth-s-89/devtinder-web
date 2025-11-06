import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { Link, Navigate, useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { apiPaths, appApi } from "../utils/api";
import { getCookie } from "../utils/cookies";
import { routePaths } from "../utils/routes";
import { subscribeToPush } from "../utils/pushNotification";

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const { data } = await appApi.post(apiPaths.login, userInput);
      dispatch(addUser(data?.data));
      subscribeToPush().catch((err) => console.log(err));
      navigate(routePaths.home);
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };

  if (getCookie("token")) return <Navigate to={routePaths.home} replace />;
  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body flex-col items-center">
          <h2 className="card-title font-medium text-2xl">Login</h2>
          <fieldset className="w-full fieldset">
            <legend className="fieldset-legend tracking-wider">
              Email Id :{" "}
            </legend>
            <input
              type="text"
              className="input"
              value={userInput.email}
              onChange={(e) =>
                setUserInput({ ...userInput, email: e.target.value })
              }
            />
          </fieldset>
          <fieldset className="w-full fieldset">
            <legend className="fieldset-legend tracking-wider">
              Password :{" "}
            </legend>
            <input
              // type="password"
              className="input"
              value={userInput.password}
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
            />
          </fieldset>
          {error && <p className="self-start text-red-500">{error}</p>}
          <div className="card-actions flex flex-col items-center">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
            <Link
              to={routePaths.signUp}
              className="link link-primary link-hover"
            >
              New User? Sign Up Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
