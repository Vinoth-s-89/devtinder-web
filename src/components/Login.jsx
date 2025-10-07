import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";
import { apiPaths, appApi } from "../utils/api";

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "vinoth.s@gmail.com",
    password: "Vinoth@123",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    try {
      const { data } = await appApi.post(apiPaths.login, userInput);
      dispatch(addUser(data?.data));
      navigate("/");
    } catch (error) {}
  };
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
              type="password"
              className="input"
              value={userInput.password}
              onChange={(e) =>
                setUserInput({ ...userInput, password: e.target.value })
              }
            />
          </fieldset>
          <div className="card-actions justify-end">
            <button className="btn btn-primary" onClick={handleLogin}>
              Login
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
