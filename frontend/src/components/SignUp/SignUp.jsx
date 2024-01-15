import React, { useState } from 'react';
// import { connect } from 'react-redux';
import { Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { baseURL } from '../../api/api';
import {useNavigate} from 'react-router-dom'

// import { setAlert} from '../actions/alert'
// import { signup } from '../actions/auth';
// import PropTypes from 'prop-types';
// import './SignUp.css'
import '../Login/Login.css'

const SignUp = ({ setAlert, signup }) => {
    const navigator = useNavigate();
    // const [name, setName] = useState('');
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    // const [Password2, setPassword2] = useState('');

    const [server_error, setServerError] = useState({})
    // const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');
    // const [passwordError, setPasswordError] = useState('');
    // const [Password2Error, setPassword2Error] = useState('');    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;
    // const { name, email, password,} = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    // console.log(formData,"++++++++++++++++++++++++++++++++++++")
    const onSubmit = e => {
        e.preventDefault();
    
        if (password !== password2) {
            setAlert('Passwords do not match', 'error');
        } else {
            axios.post(`${baseURL}accounts/signup`, {
                name: name,
                email: email,
                password: password,
                password2: password2 // Use lowercase 'password2' consistently
            })
            .then((response) => {
                localStorage.setItem('accessToken', response.data.access);
                localStorage.setItem('refreshToken', response.data.refresh);
                const user = response.data.user;
                //dispatch(loginUser({user}))
                navigator('/login');
                console.log(response.data,"++++++++++++++++response.data++++++++++++++++++++")
            })
            .catch((error) => {
                if (error.code === 'ERR_BAD_REQUEST') {
                    // Assuming 400 status code indicates a validation error
                    setEmailError(error.response.data.email ? error.response.data.email : '');
                    // setPasswordError(error.response.data.password ? error.response.data.password : '');
                    // setNameError(error.response.data.name ? error.response.data.name : '');
                } else {
                    // Handle other error cases if needed
                    console.error('Error occurred:', error);
                }
            });
        }
    };
    

    // if (isAuthenticated)
    //     return <redirect to='/' />;
    
    return (
    <div id="signup" className="r-wrapper">
      <div className='card'>
        <div className='auth'>
            <Helmet>
                <title>Rental Home - Sign Up</title>
                <meta
                    name='description'
                    content='sign up page'
                />
            </Helmet>
            <h1 className='auth__title'>Sign Up</h1>
            <p className='auth__lead'>Create your Account</p>
            <form className='auth__form' onSubmit={e => onSubmit(e)}>
                <div className='auth__form__group'>
                    <input 
                        className='auth__form__input'
                        type='text'
                        placeholder='Name'
                        name='name'
                        value={name}
                        onChange={e => onChange(e)}
                        required 
                    />
                </div>
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
                </div>
                <div className='auth__form__group'>
                    <input
                        className='auth__form__input'
                        type='password'
                        placeholder='Confirm Password'
                        name='password2'
                        value={password2}
                        onChange={e => onChange(e)}
                        minLength='6'
                    />
                </div>
                <button className='auth__form__button'>Register</button>
            </form>
            <p className='auth__authtext'>
                Already have an account? <Link className='auth__authtext__link' to='/login'>Sign In</Link>
            </p>
        </div>
        </div>
    </div>
    );

};

// SignUp.propTypes = {
//     setAlert: PropTypes.func.isRequired,
//     signup: PropTypes.func.isRequired,
//     isAuthenticated: PropTypes.bool
// };

// const mapStateToProps = state => ({
//     isAuthenticated: state.auth.isAuthenticated
// })

// export default connect(mapStateToProps, { setAlert, signup })(SignUp);

export default SignUp;



// import * as React from 'react';
// // import "./Register.css"
// import {useNavigate} from "react-router-dom";
// import {useEffect, useState} from "react";
// import { baseURL } from "../../api/api";
// // import { loginUser } from "../../redux/userSlice";
// import {useDispatch, useSelector} from "react-redux";
// import axios from "axios";

// function SignUp() {
//     const navigator = useNavigate();
//     // const dispatch = useDispatch()

//     const [name, setName] = useState('');
//     const [email, setEmail] = useState('');
//     const [password, setPassword] = useState('');
//     const [Password2, setPassword2] = useState('');


//     const [nameError, setNameError] = useState('');
//     const [emailError, setEmailError] = useState('');
//     const [passwordError, setPasswordError] = useState('');
//     const [Password2Error, setPassword2Error] = useState('');

//     const user = useSelector(state => state.user.currentUser)

//     useEffect(() => {
//         if (user !== null){
//             navigator('/')
//         }
//     }, [navigator, user]);

//     const changeFullname = (event) => {
//         setName(event.target.value);
//         console.log("-----"+name)
//         setNameError('');
//     }

//     // const changeUsername = (event) => {
//     //     setEmail(event.target.value);
//     //     if (event.target.value.length < 5) {
//     //         setEmailError('Username must be at least 5 characters long');
//     //     } else {
//     //         setEmailError('');
//     //     }
//     // }

//     const changePassword = (event) => {
//         setPassword(event.target.value);
//         console.log("---"+password)
//         setPasswordError('');
//     }

//     const changeRepeatPassword = (event) => {
//         setPassword2(event.target.value);
//         setPassword2Error('');
//     }

//     const changeEmail = (event) => {
//         const emailValue = event.target.value;
//         setEmail(emailValue);
//         console.log("-----"+email)
      
//         if (!isValidEmail(emailValue)) {
//           setEmailError('Please enter a valid email address');
//         } else {
//           setEmailError('');
//         }
//       };
      
  
//       // Email validation function
//       const isValidEmail = (email) => {
//         // You can use a regular expression or any other method for email validation
//         const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//         return emailRegex.test(email);
//       };
    

//     const handleSubmit = (event) => {
//         event.preventDefault();
//         if (name.trim() === '' || email.trim() === '' || password.trim() === '' || Password2.trim() === '') {
//             if (name.trim() === '') {
//                 setNameError('Fullname is required');
//             }
//             if (email.trim() === '') {
//                 setEmailError('Email is required');
//             }
//             if (password.trim() === '') {
//                 setPasswordError('Password is required');
//             }
//             if (Password2.trim() === '') {
//                 setPassword2Error('Repeat password is required');
//             }
//         } else if (password !== Password2) {
//             setPassword2Error('Passwords do not match');
//         }
//         else {
//             axios.post(`${baseURL}accounts/signup`, {
//                 name: name,
//                 email: email,
//                 password: password,
//                 password2: Password2 
//             }).then((response) => {
//                 localStorage.setItem('accessToken', response.data.access);
//                 localStorage.setItem('refreshToken', response.data.refresh);
//                 const user = response.data.user;
//                 // dispatch(loginUser({user}))
//                 navigator('/login');
//             }).catch((error) =>{
//                 if (error.code === 'ERR_BAD_REQUEST'){
//                     setEmailError(error.response.data.username ? error.response.data.username : '')
//                     setPasswordError(error.response.data.password ? error.response.data.password : '')
//                     setNameError(error.response.data.name ? error.response.data.name : '')
//                 }
//             });
//             }
//     }

//     return (<div className={'register'}>
//             <form>
//                 <div className={'form'}>
//                     <h1>Register</h1>
//                     <input
//                         type="text"
//                         id="name"
//                         placeholder={'NAME'}
//                         value={name}
//                         onChange={changeFullname}
//                         className={nameError ? 'error' : ''}
//                     />
//                     {nameError && <p className={'error-message'}>{nameError}</p>}
//                     <input
//                         type="text"
//                         id="username"
//                         placeholder={'USERNAME'}
//                         value={email}
//                         onChange={changeEmail}
//                         className={emailError ? 'error' : ''}
//                     />
//                     {emailError && <p className={'error-message'}>{emailError}</p>}
//                     <input
//                         type="password"
//                         id="password"
//                         placeholder={'PASSWORD'}
//                         value={password}
//                         onChange={changePassword}
//                         className={passwordError ? 'error' : ''}
//                     />
//                     {passwordError && <p className={'error-message'}>{passwordError}</p>}
//                     <input
//                         type="password"
//                         id="repeat-password"
//                         placeholder={'REPEAT PASSWORD'}
//                         value={Password2}
//                         onChange={changeRepeatPassword}
//                         className={Password2Error ? 'error' : ''}
//                     />
//                     {Password2Error && <p className={'error-message'}>{Password2Error}</p>}
//                 </div>
//                 <div className={'buttons'}>
//                     <button type="submit" onClick={handleSubmit}>Register</button>
//                     <button type="button" onClick={() => navigator('/login/')}>Login</button>
//                 </div>
//             </form>
//         </div>);
// }

// export default SignUp;