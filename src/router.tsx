import { RouteObject, useRoutes, Navigate } from "react-router";
import Home from "pages/Home";
import NotFound from "pages/NotFound";
import Career from "pages/Career";
import CharacterTest from "pages/CharacterTest";

export interface MyRouteObject extends RouteObject {
  name?: string;
  children?:MyRouteObject[];
}

export const routes: MyRouteObject[] = [
  {
    path: "",
    name: "首页",
    element: <Home />,
  },
  {
    path: "career",
    name: "毕业去向",
    element: <Career />,
  },
  {
    path: "characterTest",
    name: "性格测试",
    element: <CharacterTest />,
  },
  { path: "home",  element: <Navigate to="/" /> },
  { path: "*", element: <NotFound /> },
];

export default function Router() {
  const element = useRoutes(routes);
  return element;
}