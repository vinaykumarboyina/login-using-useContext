import React,{useContext, useEffect, useState} from 'react';
import { Routes,Route } from 'react-router-dom';
import {AuthContextProvider} from './context/AuthContext';
import Cookies from 'js-cookie';
import Login from './authentication/Login';
import Register from './authentication/Register'
import Home from './components/Home'
import NotFound from './components/Notfound';

import ProtectedRoute from './components/ProtectedRoute';
import PublicRoutes from './components/publicRoutes';
import { store } from './context/AuthContext';

function App() {
 
  return (
     <AuthContextProvider>
      <Routes>
        
     
        <Route element={<ProtectedRoute />} >
        <Route path='/' element={<Home />} />
        </Route>
        <Route element={<PublicRoutes />}>
        <Route path="/login" element={<Login />}/>
        <Route path="/register" element={<Register />}/>
        </Route>
      </Routes>
    </AuthContextProvider>
    
  );
}

export default App;
