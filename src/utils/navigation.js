import React from 'react'
import { useNavigate } from 'react-router-dom'

export default function useNavigation() {

  const navigate = useNavigate()

  const gotoDashboard = () => navigate('/dashboard')
  const gotoDumpCSV = () => navigate('/dump-csv')

  return {
    gotoDashboard,
    gotoDumpCSV
  }

}
