import { useTheme } from '@mui/material'
import Dashboard from './super_admin/Dashboard'
import { argbToHex, mdcolors } from './utils/colors'
import SideBar from './super_admin/SideBar'
import DumpCSV from './super_admin/DumpCSV'
import { Navigate, Route, Routes } from 'react-router-dom'
import LoginPage from './login/LoginPage'

export default function App() {
  const theme = useTheme()
  const location = window.location.pathname
  const isLogin = location === '/'

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'row',
        backgroundColor: argbToHex(mdcolors.background),
        width: '100vw',
        minHeight: '100vh',
        height: '100%',
      }}
    >
      {!isLogin && <SideBar />}
      <Routes>
        <Route path='/' element={<LoginPage />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dump-csv' element= {<DumpCSV />} />
        <Route path='*' element={<Navigate to = '/dashboard' />} />
      </Routes>
    </div>
  )
}
