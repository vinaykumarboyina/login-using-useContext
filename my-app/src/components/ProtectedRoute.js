import React,{useContext} from 'react'
import { store } from '../context/AuthContext';
import { Route, Routes,Navigate, Outlet } from 'react-router-dom'
import Home from './Home'
import Cookies from 'js-cookie';

function ProtectedRoute() {
    const token = Cookies.get('token')
   return(
        token  ? <Outlet /> : <Navigate to ='/login' />
   )
}

export default ProtectedRoute
