import { Navigate, Outlet, useLocation } from 'react-router-dom'

const ProtectedRoutes = () => {
  const location = useLocation()
  const isLoggedIn = localStorage.getItem('token')

  return !isLoggedIn ? (
    <Navigate to="/login" replace state={{ from: location.pathname }} />
  ) : (
    <Outlet />
  )
}
export default ProtectedRoutes
