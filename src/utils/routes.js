import { lazy } from "react";

export const routePaths = {
  home: "/",
  login: "/login",
  profile: "/profile",
  connections: "/connections",
  requests: "/requests",
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
];
