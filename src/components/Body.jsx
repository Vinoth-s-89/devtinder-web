import React, { useEffect } from "react";
import { Navigate, Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./NavBar";
import { routePaths } from "../utils/routes";
import { apiPaths, appApi } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { getCookie } from "../utils/cookies";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = useSelector((store) => store.user);

  const fetchUser = async () => {
    try {
      const { data } = await appApi.get(apiPaths.viewProfile);
      dispatch(addUser(data));
    } catch (error) {
      if (error.status === 401) {
        navigate(routePaths.login);
      }
    }
  };

  useEffect(() => {
    if (!user && pathname !== routePaths.login) {
      fetchUser();
    }
  }, [pathname]);

  if (pathname !== routePaths.login && !getCookie("token")) {
    return <Navigate to={routePaths.login} replace />;
  }

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <div className="bg-base-300 h-full w-full flex-grow overflow-y-auto">
        <Outlet />
      </div>
      <Footer />
    </div>
  );
};

export default Body;
