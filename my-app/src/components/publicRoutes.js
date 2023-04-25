import React, {Suspense} from 'react'
import { Route, Routes, Navigate, Outlet } from 'react-router-dom'
import Login from '../authentication/Login'
import Register from '../authentication/Register'
import Cookies from 'js-cookie'
const PublicRoutes = () => {
  const token = Cookies.get('token')
  return (
      !token ? <Outlet/> : <Navigate to = '/' />
  )
}

export default PublicRoutes