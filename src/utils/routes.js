import Feed from "../components/Feed";
import Profile from "../components/Profile";
import Login from "../components/Login";

export const routePaths = {
  home: "/",
  login: "/login",
  profile: "/profile",
};

export const routes = [
  {
    path: routePaths.home,
    component: Feed,
  },
  {
    path: routePaths.login,
    component: Login,
  },
  {
    path: routePaths.profile,
    component: Profile,
  },
];
