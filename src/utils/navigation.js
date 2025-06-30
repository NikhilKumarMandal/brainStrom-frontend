import { useNavigate } from "react-router-dom";

export default function useNavigation() {
  const navigate = useNavigate();

  const gotoHomePage = () => navigate("/");
  const gotoBrowseTeams = () => navigate("/browse-teams");
  const gotoMyTeam = (teamId) => navigate(`/team/${teamId}`);
  const gotoUserProfile = (userId) => navigate(`/profile/${userId}`);
  const gotoSelfProfile = () => navigate("/profile/me");
  const gotoMyTeams = () => navigate("/my-teams");
  const gotoCreateTeam = () => navigate("/create-team");
  const gotoEditProfile = () => navigate("/edit-profile");
  const gotoDiscussion = (discussionId) =>
    navigate(`/discussion/${discussionId}`);
  const gotoMyTickets = () => navigate("/my-questions");

  return {
    gotoHomePage,
    gotoBrowseTeams,
    gotoMyTeam,
    gotoUserProfile,
    gotoSelfProfile,
    gotoMyTeams,
    gotoCreateTeam,
    gotoEditProfile,
    gotoDiscussion,
    gotoMyTickets,
  };
}
