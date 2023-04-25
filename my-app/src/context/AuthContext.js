import { createContext, useState, useEffect, useCallback } from 'react';
import Cookies from 'js-cookie';
import { TokenExpiredError } from 'jsonwebtoken';
import { useNavigate } from 'react-router-dom';

export const store = createContext();

export const AuthContextProvider = ({ children }) => {
  const [token, setToken] = useState(undefined);
  const [error, setError] = useState(false);
  const [user, setUser] = useState(null)
  const [successMsg, setSuccessMsg] = useState('')
  const [errMsg, setErrMsg] = useState('')
  const navigate = useNavigate()

  const login = async ({ email, password }) => {
    try {
      const url = 'http://localhost:5000/login'
      const response = await fetch(url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: email, password: password }),
      })
      const data = await response.json()
      if (response.ok === true) {
        console.log('data', data)
        setToken(data.token)
        console.log(data, 'loginData')
        Cookies.set("token", data.token, { expires: 30 });
        setError(false)
      } else {
        setError(true)
      }
    } catch (err) {
      console.log(err)

    }
  }

  const register = async (username, email, password,imageObj) => {
    try {
      const formData = new FormData();
      formData.append('username', username);
      formData.append('email', email);
      formData.append('password', password);
      formData.append('avatar',imageObj ,imageObj.name)
      for (var pair of formData.entries()) {
        console.log(pair[0]+ ', ' + pair[1]); 
    }
      console.log({username, email, password,imageObj, name:imageObj.name })
      const url = 'http://localhost:5000/register'

      const response = await fetch(url, {
        method: "POST",
        // headers: { 'Content-Type': 'multipart/form-data' },
        // body: JSON.stringify({username:username, email:email, password:password })
        body:formData
      });
      const data = await response.json()
      // console.log('data',data)
      if (response.status === 200) { 

        setError(false)
        setSuccessMsg(data.message)
        console.log("user registered successfully")
      } else {
        setError(true) 
        setErrMsg(data.message)

      }
    } catch (err) {
      console.log(err)

    }

   
  }

  const home = async () => {
    try {
      const response = await fetch('http://localhost:5000/home', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${Cookies.get('token')}`,
        },
      });
      const data = await response.json();
      if (response.ok === true) {
        setUser(data);
      } else {
        setError(true);
        console.log('Error fetching user data');
      }
    } catch (error) {
      setError(true);
      console.log(error);
    }
  }

  // useEffect(() => {
  //   const tokenFromCookie = Cookies.get('token');
  //   if (tokenFromCookie) {
  //     setToken(tokenFromCookie);
  //     home()
  //   }
  // }, []);


  // useEffect(() => {
  //   if (token) {
  //     Cookies.set('token', token, { expires: 30 });
  //   } 
  // }, []);

  const logout = () => {
    setToken(undefined);
    Cookies.remove('token');
    setUser(null)
  };

  return (
    <store.Provider value={{ token, setToken, login, logout, register, error, home, user, successMsg, errMsg }}>
      {children}
    </store.Provider>
  );
};
