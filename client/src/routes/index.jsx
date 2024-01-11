import Home from "../pages/Home";
import MainLayout from "../layouts";
import Login from "../pages/Login";

export const router = [
  { path: "/*", name: "home", exact: true, layout: MainLayout, element: Home },
  { path: "/login", name: "login", exact: true, element: Login }
]