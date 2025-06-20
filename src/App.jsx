// import { lighten, useTheme } from '@mui/material'
// import Dashboard from './super_admin/Dashboard'
// import { argbToHex, mdcolors } from './utils/colors'
// import DumpCSV from './super_admin/DumpCSV'
// import { Navigate, Route, Routes, useLocation } from 'react-router-dom'
// import LoginPage from './login/LoginPage'
// import AskQuestion from './user/AskQuestion'
// import HomePage from './user/HomePage'
// import SideBarSupAdmin from './super_admin/SideBarSupAdmin'
// import SideBarUser from './user/components/SideBarUser'

// export default function App() {

//   const theme = useTheme()
//   const location = useLocation()
//   const user = 'user'
//   const hideSideBarRoutes = ['/login', '/ask-question']
//   const showSideBar = hideSideBarRoutes.includes(location.pathname)

//   return (
//     <div
//       style={{
//         display: 'flex',
//         flexDirection: 'row',
//         backgroundColor: lighten(argbToHex(mdcolors.background), 0.05),
//         width: '100vw',
//         // minHeight: '100vh',
//         height: '100vh',
//         overflow: 'hidden',
//       }}
//     >
//       {/* Show sidebar only if NOT on login page */}
//       {!showSideBar && user === 'admin' && <SideBarSupAdmin />}
//       {!showSideBar && user === 'user' && <SideBarUser />}

//       <Routes>
//         <Route path='/login' element={<LoginPage />} />
//         <Route path='*' element={<Navigate to='/login' />} />
//         {user === 'admin' ? (
//           <>
//             <Route path='/dashboard' element={<Dashboard />} />
//             <Route path='/dump-csv' element={<DumpCSV />} />
//           </>
//         ) : (
//           <>
//             <Route path='/home' element={<HomePage />} />
//             <Route path='/ask-question' element={<AskQuestion />} />
//             <Route path='*' element={<Navigate to='/home' />} />
//           </>
//         )}
//       </Routes>

//       {/* {!showSideBar && <SideBar />} */}
//       {/* {user === 'admin' && <SideBarSupAdmin />} */}
//       {/* {user === 'user' && <SideBar />} */}
//       {/* <Routes>
//         <Route path='/' element={<LoginPage />} />
//         <Route path='/dashboard' element={<Dashboard />} />
//         <Route path='/dump-csv' element={<DumpCSV />} />
//         <Route path='/home' element={<HomePage />} />
//         <Route path='*' element={<Navigate to='/dashboard' />} />
//       </Routes> */}
//       {/* <ProblemForm /> */}
//       {/* <HomePage /> */}
//     </div>
//   )
// }
