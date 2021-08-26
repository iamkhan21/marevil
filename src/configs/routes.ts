import React from "react";

const Home = React.lazy(() => import("../pages/Home"));
const Login = React.lazy(() => import("../pages/Login"));
const Signup = React.lazy(() => import("../pages/Signup"));
const Profile = React.lazy(() => import("../pages/Profile"));
const NotFound = React.lazy(() => import("../pages/NotFound"));

export type RouteComponent = {
  path: string;
  name?: string;
  exact?: boolean;
  needAuth?: boolean;
  component: React.ComponentType;
};

export enum PageRoutes {
  Home = "/",
  Profile = "/profile",
  Login = "/login",
  Signup = "/signup",
  NotFound = "*",
}

export const routes: RouteComponent[] = [
  {
    path: PageRoutes.Home,
    name: "Home",
    exact: true,
    component: Home,
  },
  {
    path: PageRoutes.Profile,
    name: "Profile",
    exact: true,
    component: Profile,
    needAuth: true,
  },
  {
    path: PageRoutes.Login,
    name: "Login",
    exact: true,
    component: Login,
    needAuth: false,
  },
  {
    path: PageRoutes.Signup,
    exact: true,
    name: "Signup",
    component: Signup,
    needAuth: false,
  },
  {
    path: PageRoutes.NotFound,
    component: NotFound,
  },
];
