import React, {useEffect, useState} from 'react';
import { Link,useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
// import {useDispatch, useSelector} from "react-redux";
// import {setAccessToken, setUser } from "../../redux/userSlice";
import axios from "axios";
import {baseURL} from "../../api/api";
import {useDispatch } from "react-redux";
import {setUser,setAccessToken} from "../../redux/userSlice";


// import { jwtDecode } from "jwt-decode";
// import { toast } from 'react-toastify';
import './Login.css';

const Login = ({ login }) => {
  const navigator = useNavigate();
  const dispatch = useDispatch();
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  // const [blocked,setBlocked] = useState('');
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
        // setEmailError('Email is required');
      }
      if (password.trim() === '') {
        // setPasswordError('Password is required');
      }
    } else {
      axios
        .post(`${baseURL}accounts/login`, {
          email: email,
          password: password,
         }, { withCredentials: true })
        .then((response) => {
          console.log("response.data = ", response.data);
          console.log("response.data.data = ", response.data.data);
          console.log("response.data.user = ", response.data.user);
          localStorage.setItem('accessToken', response.data.data.access);
          localStorage.setItem('refreshToken', response.data.data.refresh);
          dispatch(setAccessToken(response.data.data));
          dispatch(setUser(response.data.user));
          navigator('/');

        })
        .catch((error) => {
          // if ({ withCredentials: false }){
          //   setBlocked("Your Blocked By Admin")
          // }
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


// function Login() {
//   const navigator = useNavigate();
//   const dispatch = useDispatch();
//   const user = useSelector((state) => state.user.currentUser);

//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const [emailError, setEmailError] = useState('');
//   const [passwordError, setPasswordError] = useState('');

//   const handleSubmit = (event) => {
//       event.preventDefault();
//       if (email.trim() === '' || password.trim() === '') {
//           if (email.trim() === '') {
//             setEmailError('Email is required');
//           }
//           if (password.trim() === '') {
//               setPasswordError('Password is required');
//           }

//       } else {
//           axios.post(
//               `${baseURL}accounts/login`,
//               {
//                 email: email,
//           password: password,
//         }, { withCredentials: true })
//           .then((response) => {
//               // const user = response.data.user;
//               localStorage.setItem('accessToken', response.data.access)
//               localStorage.setItem('refreshToken', response.data.refresh)
//               console.log("response.data", response.data);
//               console.log(response.data);
//               dispatch(setAccessToken(response.data.data));
//               dispatch(setUser(response.data.user));
          
//               // Redirect to the desired page after successful login
//               toast.success('Login Successful');
//               navigator('/');
//           }).catch((error) => {
//               if (error.code === 'ERR_BAD_REQUEST'){
//                   setPasswordError('Email or password is incorrect');
//                   setPassword('');
//               }
//               else{
//                   setPasswordError('Something went wrong')
//               }
//           })
//       }
//   }

//   useEffect(() => {
//       if (user !== null) {
//           navigator('/');
//       }
//   }, [user, navigator]);


//   const updateEmail = ({target:{value}}) => {
//       setEmail(value);
//       setEmailError('');
//   }

//   const updatePassword = ({target:{value}}) => {
//       setPassword(value);
//       setPasswordError('');
//   }


//   return (
//       <div className={'login'}>
//           <form>
//               <div className={'form'}>
//                   <h1>Login</h1>
//                   <input
//                       type='email'
//                       placeholder='Email'
//                       name='email'
//                       value={email}
//                       onChange={updateEmail}
//                       required
//                       className={emailError ? 'error' : ''}
//                   />
//                   {emailError && <p className={'error-message'}>{emailError}</p>}
//                   <input
//                       type="password"
//                       id="password"
//                       placeholder={'PASSWORD'}
//                       value={password}
//                       onChange={updatePassword}
//                       className={passwordError ? 'error' : ''}
//                   />
//                   {passwordError && <p className={'error-message'}>{passwordError}</p>}
//               </div>
//               <div className={'buttons'}>
//                   <button
//                       type="button"
//                       onClick={() => navigator('/signup/')
//                   }>Register</button>
//                   <button
//                       type="submit"
//                       onClick={handleSubmit}
//                   >Login</button>
//               </div>
//           </form>
//       </div>
//   );
// }

// export default Login;