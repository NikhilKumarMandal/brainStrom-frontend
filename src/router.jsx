import { createBrowserRouter } from "react-router-dom";
import Root from "./Layouts/Root";
import NoAuth from "./Layouts/NoAuth";
import Dashboard from "./Layouts/Dashboard";
import LoginPage from "./login/LoginPage";
import ProblemPage from "./pages/ProblemPage";
import BrowseTeams from "./pages/BrowseTeams";
import HomePage from "./pages/Homepage";
import AskQuestion from "./pages/AskQuestion";
import DumpCSV from "./pages/DumpCSV";
import SupAdminDashboard from "./pages/Dashboard";
import MyTeam from "./pages/MyTeam";
import CreateTeam from "./pages/CreateTeam";
import UserProfile from "./pages/UserProfile";
import MyTeams from "./pages/MyTeams";

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
            {
              path: "problem/:id",
              element: <ProblemPage />,
            },
            {
              path: "profile/me",
              element: <UserProfile isMe />,
            },
            {
              path: "profile/:id",
              element: <UserProfile />,
            },
            {
              path: "dump-csv",
              element: <DumpCSV />,
            },
            {
              path: "browse-teams",
              element: <BrowseTeams />,
            },
            {
              path: "my-teams/:teamId",
              element: <MyTeam />,
            },
            {
              path: "my-teams",
              element: <MyTeams />,
            },
            {
              path: "create-team",
              element: <CreateTeam />,
            },
            {
              path: "dashboard",
              element: <SupAdminDashboard />,
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