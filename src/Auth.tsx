import { Navigate, Outlet } from "react-router-dom"

export const Auth = () => {
  return <Outlet/>
}

export const Logout = () => {
  const token = localStorage.getItem("token");
  const userData = localStorage.getItem("user");
  const hasUserData = token !== undefined && userData !== undefined;


  if(hasUserData) {
      localStorage.removeItem("token");
      localStorage.removeItem("userId");
  }

  return <Navigate to="/login"/>
}