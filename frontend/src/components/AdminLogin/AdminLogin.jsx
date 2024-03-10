import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from "axios";
import {baseURL} from "../../api/api";
import {useDispatch } from "react-redux";
import {setAdminAccessToken, setAdminUser} from '../../redux/AdminSlice'
import './Login.css';



const AdminLogin = () => {
  const navigator = useNavigate();
  const dispatch = useDispatch();

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });


  const onSubmit = e => {
    e.preventDefault();
    if (email.trim() === '' || password.trim() === '') {
      if (email.trim() === '') {
        // setEmailError('Email is required');
      }
      if (password.trim() === '') {
        // setPasswordError('Password is required');
      }
    } else {
      axios
        .post(`${baseURL}admin-side/admin-login/`, {
          email: email,
          password: password,
         }, { withCredentials: true })
        .then((response) => {
          localStorage.setItem('accessToken', response.data.access);
          localStorage.setItem('refreshToken', response.data.refresh);
          dispatch(setAdminAccessToken(response.data));
          dispatch(setAdminUser(response.data.user));
          navigator('/admin');
          
        })   
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.log("Error : ",error.response)
          } else {
            // Other errors
            console.error('Login error:', error);
          }
        });
    }


  };

  return (
    <div className='card'>
      <div className='auth'>
        <Helmet>
          <title>Rental Admin Home - Login</title>
          <meta name='description' content='login page' />
        </Helmet>
        <h1 className='auth__title'>Sign In</h1>
        <p className='auth__lead'>Sign into your Account</p>
        <form className='auth__form' onSubmit={e => onSubmit(e)}>
          <div className='auth__form__group'>
            <input
              className='auth__form__input'
              type='email'
              placeholder='Email'
              name='email'
              value={email}
              onChange={e => onChange(e)}
              required
            />
          </div>
          <div className='auth__form__group'>
            <input
              className='auth__form__input'
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={e => onChange(e)}
              
            />
          </div>
          <button className='auth__form__button'>Login</button>
        </form>
      </div>
    </div>
  );
};

export default AdminLogin;

