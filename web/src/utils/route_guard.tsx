import React, { useContext } from 'react'
import { Navigate, useLocation } from 'react-router-dom';
import { authContext } from '../context/authContext';


type PropsType = {
  children: React.ReactNode;
}

function RouteGuard(props: PropsType) {
  const path = useLocation()
  const auth = useContext(authContext)


  const blockPath = ["/signin", "/signup"].includes(path.pathname.toLowerCase())

  if (auth?.user) {
    if (blockPath) {
      return <Navigate to={"/"} />
    } else if (!blockPath) {
      return props.children;
    }
  } else if (!auth?.user) {
    return props.children;
  } else {
    return <Navigate to="/signIn" />
  }
}

export default RouteGuard