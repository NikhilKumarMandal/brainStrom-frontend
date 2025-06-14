import { useTheme } from '@mui/material'
import Dashboard from './super_admin/Dashboard'
import { argbToHex, mdcolors } from './utils/colors'
import SideBar from './super_admin/SideBar'
import DumpCSV from './super_admin/DumpCSV'
import { Navigate, Route, Routes } from 'react-router-dom'

export default function App() {
  const theme = useTheme()

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
      <SideBar />
      <Routes>
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/dump-csv' element= {<DumpCSV />} />
        <Route path='*' element={<Navigate to = '/dashboard' />} />
      </Routes>
    </div>
  )
}
