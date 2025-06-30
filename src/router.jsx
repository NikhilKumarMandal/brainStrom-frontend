import { createBrowserRouter } from "react-router-dom";
import Root from "./Layouts/Root";
import NoAuth from "./Layouts/NoAuth";
import Dashboard from "./Layouts/Dashboard";
import CreateTeam from "./pages/CreateTeam";
import UserTeams from "./pages/UserTeams";
import HomePage from "./pages/Homepage";
import BrowseTeams from "./pages/BrowseTeams";
import ProfileEditor from "./pages/ProfileEditor";
import ProfilePage from "./pages/ProfilePage";
import DiscussionPage from "./pages/DiscussionPage";
import TeamPage from "./pages/TeamPage";
import LoginPage from "./pages/LoginPage";
import UserTickets from "./pages/UserTickets";

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
            element: <HomePage />,
          },
          // {
          //   path: "ask-questions",
          //   element: <AskQuestion />,
          // },
          // {
          //   path: "problem/:id",
          //   element: <ProblemPage />,
          // },
          // {
          //   path: "profile/:userId",
          //   element: <UserProfile />,
          // },
          {
            path: "browse-teams",
            element: <BrowseTeams />,
          },
          // {
          //   path: "my-teams/:teamId",
          //   element: <MyTeam />,
          // },
          {
            path: "my-teams",
            element: <UserTeams />,
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
          },
          {
            path: "/discussion/:discussionId",
            element: <DiscussionPage />,
          },
          {
            path: "/team/:teamId",
            element: <TeamPage />,
          },
          {
            path: "/my-questions",
            element: <UserTickets />
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
