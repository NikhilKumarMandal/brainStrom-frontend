import { createBrowserRouter } from "react-router-dom";
import Root from "./Layouts/Root";
import NoAuth from "./Layouts/NoAuth";
import Dashboard from "./Layouts/Dashboard";
import LoginPage from "./login/LoginPage";
import ProblemPage from "./pages/ProblemPage";
import BrowseTeams from "./pages/BrowseTeams";
import HomePage from "./pages/Homepage";
import AskQuestion from "./pages/AskQuestion";
import MyTeam from "./pages/MyTeam";
import CreateTeam from "./pages/CreateTeam";
import UserProfile from "./pages/UserProfile";
import MyTeams from "./pages/MyTeams";
import TicketPage from "./pages/TicketPage";
import BrowsesTeams from "./pages/BrowsesTeams";
import ProfileEditor from "./pages/ProfileEditor";
import ProfilePage from "./pages/ProfilePage";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />,
    children: [
      {
        path: "",
        element: <Dashboard />,
        children: [
          {
            path: "/",
            element: <TicketPage />,
          },
          {
            path: "ask-questions",
            element: <AskQuestion />,
          },
          {
            path: "problem/:id",
            element: <ProblemPage />,
          },
          // {
          //   path: "profile/:userId",
          //   element: <UserProfile />,
          // },
          {
            path: "browse-teams",
            element: <BrowsesTeams />,
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
            path: "edit-profile",
            element: <ProfileEditor />,
          },
          {
            path: "profile/:userId",
            element: <ProfilePage />,
          },
          {
            path: "profile/me",
            element: <ProfilePage isMe />,
          }
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
