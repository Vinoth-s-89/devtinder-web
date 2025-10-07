import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser } from "../utils/userSlice";

const Login = () => {
  const [userInput, setUserInput] = useState({
    email: "vinoth.s@gmail.com",
    password: "Vinoth@123",
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleLogin = async () => {
    const { data } = await axios.post(BASE_URL + "login", userInput, {
      withCredentials: true,
    });
    dispatch(addUser(data?.data));
    navigate("/");
  };
  return (
    <div className="w-full h-full flex items-center justify-center bg-base-300">
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
