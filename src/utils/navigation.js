import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function useNavigation() {

  const navigate = useNavigate()

  const gotoDashboard = () => navigate('/dashboard')
  const gotoDumpCSV = () => navigate('/dump-csv')
  const gotoAskQuestion = () => navigate('/ask-questions')
  const gotoHomePage = () => navigate('/home')
  const gotoProblem = (id) => navigate(`/problem/${id}`)

  return {
    gotoDashboard,
    gotoDumpCSV,
    gotoAskQuestion,
    gotoHomePage,
    gotoProblem
  }
}
