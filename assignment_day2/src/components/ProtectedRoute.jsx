import { Navigate, useLocation } from 'react-router-dom'

function ProtectedRoute({ user, children, role }) {
  const location = useLocation()

  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  if (role && user.role !== role) {
    return <Navigate to="/dashboard" replace />
  }

  return children
}

export default ProtectedRoute
