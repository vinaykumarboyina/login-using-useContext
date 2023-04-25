import React, { useState,useContext, useEffect } from 'react'
import '../App.css'
import {store} from '../context/AuthContext'
import { useNavigate,Link } from 'react-router-dom';
import Cookies from 'js-cookie';
// import { toast, ToastContainer } from 'react-toastify';

const Login = () => {
  const {login, error,token, successMsg} = useContext(store)
  const[email,setEmail] = useState('')
  const[password,setPassword] = useState('')
  const navigate = useNavigate()
  const tokenCookie = Cookies.get('token')
  // useEffect(() =>{
  //   if(tokenCookie){
  //     navigate('/')
  //   }
  // })
  // const showToast = () => {
  //   toast(successMsg, {
  //     position: toast.POSITION.TOP_CENTER
  //   })
  // }
  // useEffect(()=>{showToast()},[successMsg])
  // showToast()
  const handleSubmit = async(e) => {
    e.preventDefault()
    await login({email,password})
    if(token !== undefined ){
      console.log("home")
      navigate('/')
    }
  }

  



  return (
  <>
   <div className='container'>
      <form onSubmit={handleSubmit}>
        <h1 className='heading'>Login Form</h1>
        <div className="ui divider"></div>
        <div className="ui form">
          <div className="field">
            <div className='label'>
            <label>Email</label>
            </div>
            <input
              className='input'
              required
              type="text"
              name="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          
          <div className="field">
          <div className='label'>
            <label>Password</label>
            </div>
            <input
              className='input'
              required
              type="password"
              name="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          {error && <p className ='err-msg'>Invalid Credentials</p> }
          <div className='btn-field'>
          <button className="button">Submit</button>
          </div>
        </div>
      <div>
        <p>Don't have an account? <Link className='tag' to="/register">Sign up</Link></p>
      </div>
      </form>
    </div>
    {/* <ToastContainer /> */}
  </>
   
  )
}

export default Login
