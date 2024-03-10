import React, { useState } from 'react';
import { Link} from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from 'axios';
import { baseURL } from '../../api/api';
import {useNavigate} from 'react-router-dom'
import '../Login/Login.css'

const SignUp = () => {
    const navigator = useNavigate();
    const [servererror, setServerError] = useState('')
    const [nameError, setNameError] = useState('');
    const [emailError, setEmailError] = useState('');    
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
        password2: ''
    });

    const { name, email, password, password2 } = formData;
    const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
    const onSubmit = e => {
        e.preventDefault();

        // Clear previous errors
        setNameError('');
        setEmailError('');

        // Validation for name
    if (!name || name.trim() === '' || name.length > 25) {
        setNameError('Name is required and should be less than 25 characters', 'error');
        return;
    }

    // Validation for email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
        setEmailError('Please enter a valid email address', 'error');
        return;
    }

    // Validation for password
    if (!password || password.length > 20) {
        setServerError('Password is required and should be less than 20 characters');
        return;
    }

    // Validation for password
    if (!password || !password2 || password !== password2) {
        setServerError('Passwords do not match', 'error');
        return;
    }

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
        navigator('/login');
    })
    .catch((error) => {
        if (error.code === 'ERR_BAD_REQUEST') {
            // Assuming 400 status code indicates a validation error
            setEmailError(error.response.data.email ? error.response.data.email : '');
        } else {
            // Handle other error cases if needed
            console.error('Error occurred:', error);
        }
    });
    };
    

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
                   {nameError && <p className={'error-message'}>{nameError}</p>}

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
                {servererror && <p className={'error-message'}>{servererror}</p>}

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
export default SignUp;


