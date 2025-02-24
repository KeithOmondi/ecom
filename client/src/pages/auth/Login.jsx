import { useEffect } from 'react'
import Login from '../../components/Login/Login'
import { useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'

const LoginPage = () => {
  const navigate = useNavigate()
  const { isAuthenticated, user } = useSelector((state) => state.user) // Ensure `user` is retrieved

  useEffect(() => {
    if (isAuthenticated) {
      if (user?.role === "admin") {
        navigate("/admin-dashboard") // Redirect admins to their dashboard
      } else {
        navigate("/home") // Redirect regular users
      }
    }
  }, [isAuthenticated, user, navigate]) // Depend on `user` to get role changes

  return (
    <div>
      <Login />
    </div>
  )
}

export default LoginPage
