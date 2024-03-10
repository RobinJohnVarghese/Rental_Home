import React, { useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from "axios";
import {baseURL} from "../../api/api";
import {useDispatch } from "react-redux";
import {setUser,setAccessToken} from "../../redux/userSlice";
import './Login.css';


const Login = ({ login }) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const { email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = e => {
    e.preventDefault();
    // login(email, password);
    if (email.trim() === '' || password.trim() === '') {
      if (email.trim() === '') {
        setEmailError('Email is required');
      }
      if (password.trim() === '') {
        setPasswordError('Password is required');
      }
    } else {
      axios
        .post(`${baseURL}accounts/login`, {
          email: email,
          password: password,
         }, { withCredentials: true })
        .then((response) => {
          localStorage.setItem('accessToken', response.data.data.access);
          localStorage.setItem('refreshToken', response.data.data.refresh);
          dispatch(setAccessToken(response.data.data));
          dispatch(setUser(response.data.user));
          navigator('/');

        })
        .catch((error) => {
          if (error.code === 'ERR_BAD_REQUEST') {
            // Unauthorized: Invalid credentials
            // setEmailError('Invalid email ');
            setPasswordError('Invalid email or password');
          } else {
            // Other errors
            console.error('Login error:', error);
          }
        });
    }


  };

  return (
    <div id="login" className="r-wrapper">
    <div className='card'>
      <div className='auth'>
        <Helmet>
          <title>Rental Home - Login</title>
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
            {emailError && <p className={'error-message'}>{emailError}</p>}
          </div>
          <div className='auth__form__group'>
            <input
              className='auth__form__input'
              type='password'
              placeholder='Password'
              name='password'
              value={password}
              onChange={e => onChange(e)}
              minLength='6'
            />
            {passwordError && <p className={'error-message'}>{passwordError}</p>}
            {/* {blocked && <p className={'error-message'}>{blocked}</p>} */}
          </div>
          <button className='auth__form__button'>Login</button>
        </form>
        <p className='auth__authtext'>
          Don't have an account? <Link className='auth__authtext__link' to='/signup'>Sign Up</Link>
        </p>
      </div>
    </div>
    </div>
  );
};

export default Login;

