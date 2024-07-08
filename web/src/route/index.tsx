import React from 'react'
import { Route, Routes } from 'react-router-dom'
import HomePage from '../pages/home'
import LoginPage from '../pages/auth/login'
import RegisterPage from '../pages/auth/register'
import RouteGuard from '../utils/route_guard'

function Routers() {
  return (
    <Routes>

      <Route path='/' element={<HomePage />} />

      <Route path='/signIn' element={
        <RouteGuard>
          <LoginPage />
        </RouteGuard>
      } />

      <Route path='/signUp' element={
        <RouteGuard>
          <RegisterPage />
        </RouteGuard>
      } />

    </Routes>
  )
}

export default Routers