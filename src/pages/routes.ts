import React from "react";

const Home = React.lazy(() => import("./Home"));
const Login = React.lazy(() => import("./Login"));
const Signup = React.lazy(() => import("./Signup"));
const Dashboard = React.lazy(() => import("./Dashboard"));
const NotFound = React.lazy(() => import("./NotFound"));

export type RouteComponent = {
  path: string;
  name?: string;
  exact?: boolean;
  needAuth?: boolean;
  component: React.ComponentType;
};

export enum PageRoutes {
  Home = "/",
  Dashboard = "/dashboard",
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
    path: PageRoutes.Dashboard,
    name: "Dashboard",
    exact: true,
    component: Dashboard,
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
