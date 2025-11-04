import React, { Suspense, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import Footer from "./Footer";
import Navbar from "./NavBar";
import { routePaths } from "../utils/routes";
import { apiPaths, appApi } from "../utils/api";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import Toast from "./shared/Toast";
import { removeCookie } from "../utils/cookies";
// import { getCookie } from "../utils/cookies";

const Body = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { pathname } = useLocation();
  const user = useSelector((store) => store.user);
  const message = useSelector((store) => store.toast.message);

  const fetchUser = async () => {
    try {
      const { data } = await appApi.get(apiPaths.viewProfile);
      dispatch(addUser(data));
    } catch (error) {
      removeCookie("token");
      navigate(routePaths.login);
    }
  };

  useEffect(() => {
    if (
      !user &&
      pathname !== routePaths.login &&
      pathname !== routePaths.signUp
    ) {
      fetchUser();
    }
  }, [pathname]);

  // if (pathname !== routePaths.login && !getCookie("token")) {
  //   return <Navigate to={routePaths.login} replace />;
  // }

  return (
    <div className="h-screen w-screen flex flex-col">
      <Navbar />
      <div className="bg-base-300 h-full w-full flex-grow overflow-y-auto">
        <Suspense fallback={<div>Loading...</div>}>
          <Outlet />
        </Suspense>
      </div>
      <Footer />
      <Toast message={message} />
    </div>
  );
};

export default Body;
