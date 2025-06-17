import { createBrowserRouter } from "react-router-dom";
import Root from "./Layouts/Root";
import NoAuth from "./Layouts/NoAuth";
import Dashboard from "./Layouts/Dashboard";
import LoginPage from "./login/LoginPage";
import HomePage from "./user/HomePage";
import AskQuestion from "./user/AskQuestion"

export const router = createBrowserRouter([
    {
      path: "/",
      element: <Root/>,
      children: [
        {
          path: "",
          element: <Dashboard />,
          children: [
            {
              path: "home",
              element: <HomePage/>,
            },
            {
              path: "ask-questions",
              element: <AskQuestion />,
            },
            
          ],
        },
        {
          path: "/auth",
          element: <NoAuth />,
          children: [
            {
              path: "login",
              element: <LoginPage />,
            },
          ],
        },
        // {
        //   path: "*",
        //   element: <NotFoundPage />,
        // },
      ],
    },
  ]);