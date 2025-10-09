import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { routePaths } from "../utils/routes";
import TextField from "./shared/TextField";
import { apiPaths, appApi } from "../utils/api";
import useToast from "../utils/useToast";

const SignUp = () => {
  const [formdata, setFormdata] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { showToast } = useToast();

  const handleSignUp = async () => {
    try {
      const { data } = await appApi.post(apiPaths.signUp, formdata);
      showToast(data?.message);
      navigate(routePaths.login);
    } catch (error) {
      setError(error?.response?.data?.message || "Something went wrong");
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormdata({ ...formdata, [name]: value });
  };

  return (
    <div className="flex justify-center items-center h-full w-full">
      <div className="card bg-base-100 w-96 shadow-sm">
        <div className="card-body flex-col items-center">
          <h2 className="card-title font-medium text-2xl">Sign Up</h2>
          <TextField
            name="firstName"
            label="First Name"
            onChange={handleChange}
            value={formdata.firstName}
          />
          <TextField
            name="lastName"
            label="Last Name"
            onChange={handleChange}
            value={formdata.lastName}
          />
          <TextField
            name="email"
            label="Email"
            onChange={handleChange}
            value={formdata.email}
          />
          <TextField
            name="password"
            label="Password"
            onChange={handleChange}
            value={formdata.password}
          />
          {error && <p className="self-start text-red-500">{error}</p>}
          <div className="card-actions flex flex-col items-center">
            <button className="btn btn-primary" onClick={handleSignUp}>
              Sign Up
            </button>
            <Link
              to={routePaths.login}
              className="link link-primary link-hover"
            >
              Aleardy a User? Login Here
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;
