import { useAuthStore } from "../store/store";
import { Navigate, Outlet } from "react-router-dom";
import SideBarUser from "../user/components/SideBarUser";
import { lighten, useTheme } from '@mui/material';
import { argbToHex, mdcolors } from '../utils/colors';

function Dashboard() {
  const { user } = useAuthStore();

  if (user === null) {
    return (
      <Navigate to={`/auth/login?returnTo=${location.pathname}`} replace={true} />
    );
  }
  return (
    <div
    style={{
      display: 'flex',
      flexDirection: 'row',
      backgroundColor: lighten(argbToHex(mdcolors.background), 0.05),
      width: '100vw',
      // minHeight: '100vh',
      height: '100vh',
      overflow: 'hidden',
    }}
    >
      {/* <SideBarUser/> */}
      <Outlet />
    </div>
  );
}

export default Dashboard;