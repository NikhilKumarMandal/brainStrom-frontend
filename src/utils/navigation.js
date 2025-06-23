import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function useNavigation() {

  const navigate = useNavigate()

  const gotoDashboard = () => navigate('/dashboard')
  const gotoDumpCSV = () => navigate('/dump-csv')
  const gotoAskQuestion = () => navigate('/ask-questions')
  const gotoHomePage = () => navigate('/home')
  const gotoProblemPage = (problemId) => navigate(`/problem/${problemId}`)
  const gotoTeamDetails = (teamId) => navigate(`/team-details/${teamId}`)
  const gotoBrowseTeams = () => navigate('/browse-teams')
  const gotoMyTeam = () => navigate('/my-team')
  const gotoUserProfile = (userId) => navigate('/profile')

  return {
    gotoDashboard,
    gotoDumpCSV,
    gotoAskQuestion,
    gotoHomePage,
    gotoProblemPage,
    gotoTeamDetails,
    gotoBrowseTeams,
    gotoMyTeam,
    gotoUserProfile
  }
}
