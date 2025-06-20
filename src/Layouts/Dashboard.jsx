import { Navigate, Outlet, useLocation } from 'react-router-dom'
import { useAuthStore } from '../store/store'
import SideBar from '../components/Sidebar'

export default function Dashboard() {
  const { user } = useAuthStore()
  const location = useLocation()

  if (user === null) {
    return (
      <Navigate
        to={`/auth/login?returnTo=${location.pathname}`}
        replace={true}
      />
    )
  }
  
  return (
    <div className="flex flex-row w-screen h-screen overflow-hidden bg-gray-900">
      <SideBar />
      <Outlet />
    </div>
  )
}
