import { useNavigate } from "react-router-dom";

export default function useNavigation() {
  const navigate = useNavigate();


  const gotoHomePage = () => navigate("/");
  const gotoAskQuestion = () => navigate("/ask-questions");
  const gotoProblemPage = (problemId) => navigate(`/problem/${problemId}`);
  const gotoBrowseTeams = () => navigate("/browse-teams");
  const gotoMyTeam = (teamId) => navigate(`/my-teams/${teamId}`);
  const gotoUserProfile = (userId) => navigate(`/profile/${userId}`);
  const gotoSelfProfile = () => navigate("/profile/me");
  const gotoMyTeams = () => navigate("/my-teams");
  const gotoCreateTeam = () => navigate("/create-team");
  const gotoEditProfile = () => navigate("/edit-profile");
  const gotoDiscussion = (discussionId) => navigate(`/discussion/${discussionId}`);

  return {
    gotoHomePage,
    gotoAskQuestion,
    gotoProblemPage,
    gotoBrowseTeams,
    gotoMyTeam,
    gotoUserProfile,
    gotoSelfProfile,
    gotoMyTeams,
    gotoCreateTeam,
    gotoEditProfile,
    gotoDiscussion,
  };
}
