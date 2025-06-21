import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function useNavigation() {

  const navigate = useNavigate()

  const gotoDashboard = () => navigate('/dashboard')
  const gotoDumpCSV = () => navigate('/dump-csv')
  const gotoAskQuestion = () => navigate('/ask-questions')
  const gotoHomePage = () => navigate('/home')
  const gotoProblemPage = (problemId) => navigate(`/problem/${problemId}`)
  const gotoTeamDetails = (teamId) => navigate('/team-details')
  const gotoBrowseTeams = () => navigate('/browse-teams')
  


  return {
    gotoDashboard,
    gotoDumpCSV,
    gotoAskQuestion,
    gotoHomePage,
    gotoProblemPage,
    gotoTeamDetails,
    gotoBrowseTeams,
    

  }
}
