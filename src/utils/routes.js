import { lazy } from "react";

export const routePaths = {
  home: "/",
  login: "/login",
  profile: "/profile",
  connections: "/connections",
  requests: "/requests",
  signUp: "/signup",
  chat: "/chat",
};

export const routes = [
  {
    path: routePaths.home,
    component: lazy(() => import("../components/Feed")),
  },
  {
    path: routePaths.login,
    component: lazy(() => import("../components/Login")),
  },
  {
    path: routePaths.signUp,
    component: lazy(() => import("../components/SignUp")),
  },
  {
    path: routePaths.profile,
    component: lazy(() => import("../components/Profile")),
  },
  {
    path: routePaths.connections,
    component: lazy(() => import("../components/Connections")),
  },
  {
    path: routePaths.requests,
    component: lazy(() => import("../components/Requests")),
  },
  {
    path: routePaths.chat + "/:targetUserId",
    component: lazy(() => import("../components/Chat")),
  },
];
