import React, { useState,useContext ,useEffect} from 'react'
import '../App.css'
import {store} from '../context/AuthContext'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import { toast , ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css';

const Register = () => {
  const {register, error, errMsg, successMsg} = useContext(store)
  const[username,setUsername] = useState({value:'',error:''})
  const[email,setEmail] = useState({value:'',error:''})
  const[password,setPassword] = useState({value:'',error:''})
  const[confirmPassword,setConfirmPassword] = useState({value:'',error:''})
  const [submitted, setSubmitted] = useState(false)
  const [image, setImage] = useState({value:{},error:''})
  const fields = [{title:'username', value:username.value,error:username.error}, {title:'email', value:email.value, error:email.error},{title:'password', value:password.value, error:password.error}]
  const navigate = useNavigate()
  const tokenCookie = Cookies.get('token')
  // useEffect(() =>{
  //   if(tokenCookie){
  //     navigate('/')
  //   }
  // })
  const showToast = () => {
      toast(successMsg, {
        position: toast.POSITION.TOP_CENTER
      })
      console.log('toast')
    }
    
    const validate = (name, value) => {
      switch(name){
        case 'username':
          setUsername({...username, value:value, error:value.length > 2 ? "" : 'Username is Required'})
          break
          case 'email':
            setEmail({...email,value:value})
            if (!value) {
            setEmail({...email,value:value,error:'Email is Required'})
            
          } else if (  !value.match(/^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/)) {
            setEmail({...email,value:value,error:'Enter a valid email address'})
          } else {
            setEmail({...email,value:value,error:''})
            
          }
          break
          
          case 'password':
            setPassword({...password, value:value})
        if (!value) {
          setPassword({...password,value:value, error:"Password is Required"})

        } else if (value.length < 8 || value.length > 15) {
          setPassword({...password,value:value, error:"Please fill at least 8 character"})
        } else if (!value.match(/[a-z]/g)) {
          setPassword({...password,value:value, error:"Please enter at least lower character"})
          
        } else if (!value.match(/[A-Z]/g)) {
          setPassword({...password,value:value, error:"Please enter at least upper character"})
          
        } else if (!value.match(/[0-9]/g)) {
          setPassword({...password, value:value, error:"Please enter at least one digit"})
          
        } else {
          setPassword({...password,value:value, error:""})
        }
        break
        case 'confirmPassword':
          setConfirmPassword({...password, value:value})
          
          if (!value) {
            setConfirmPassword({...password,value:value, error: "Confirm Password Required"})
            
          } else if (value !== password.value) {
        setConfirmPassword({...password, value:value,error: "New Password and Confirm Password Must be Same"})
      } else {
        setConfirmPassword({...password,value:value, error:""})
      }
      break
      default:
        break
      }
    }
    const handleChange = (e) => {
      const {name, value} = e.target 
      validate(name, value)
    }
    const handleImageChange = (e) => {
      const file = e.target.files[0];
      if (file) {
        setImage({...image, value:file, error:''});
      }
    }
    
    const handleSubmit = async(e) => {
      e.preventDefault()
      fields.map((each) => validate(each.title, each.value))
      const isValidation = fields.every((each) => each.error === '' )
      if(isValidation||true){
        register(username.value,email.value,password.value,image.value)
        setSubmitted(true)
        if(errMsg === ''){
          showToast()
          navigate('/')
         }
      }

    }
    
    useEffect(()=>{
   console.log('msg', successMsg) },[])
    return (
      <>
    <div className='container'>
      <form onSubmit={handleSubmit} >
        <h1 className='heading'>Sign Up Form</h1>
       { submitted && <div className="ui divider" style={{color:'red'}}>{errMsg}</div>}
        <div className="ui form">
        <div className="field">
          <div className='label'>
            <label>Username</label>
            </div>
            <input
              className='input'
              
              type="text"
              name="username"
              placeholder="Username"
              value={username.value}
              onChange={(e) =>handleChange(e)}
              />
            <p style={{color:"red"}}>{username.error}</p>
          </div>  
          <div className="field">
            <div className='label'>
            <label>Email</label>
            </div>
            <input
              className='input'
              
              type="text"
              name="email"
              placeholder="Email"
              value={email.value}
              onChange={(e) =>handleChange(e)}
              />
            <p style={{color:"red"}}>{email.error}</p>
          </div>
          
          <div className="field">
          <div className='label'>
            <label>Password</label>
            </div>
            <input
              className='input'
              
              type="password"
              name="password"
              placeholder="Password"
              value={password.value}
              onChange={(e) =>handleChange(e)}
              />
            <p style={{color:"red"}}>{password.error}</p>

          </div>
          <div className="field">
          <div className='label'>
            <label>Password</label>
            </div>
            <input
              className='input'
              
              type="password"
              name="confirmPassword"
              placeholder="ConfirmPassword"
              value={confirmPassword.value}
              onChange={(e) =>handleChange(e)}
              />
            <p style={{color:"red"}}>{confirmPassword.error}</p>

          </div>
          <div className="field">
          <div className='label'>
            <label>Select Your Image</label>
            </div>
            <input
              className='input'
              required
              type="file"
              name="avatar"
              placeholder="Choose File"
              onChange={handleImageChange}
            />
          </div>
          <div className='btn-field'>
          <button className="button" type='submit'>Sign Up</button>
          </div>
        </div>
      
      </form>
    </div>
    <ToastContainer />
              </>
  )
}

export default Register
