import React, { useState} from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet';
import axios from "axios";
import {baseURL} from "../../api/api";
import {useDispatch } from "react-redux";
import {setAdminAccessToken, setAdminUser} from '../../redux/AdminSlice'
// import { jwtDecode } from "jwt-decode";
// import { toast } from 'react-toastify';
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
  // console.log("form data", formData)

  const onSubmit = e => {
    e.preventDefault();
    // console.log("form data", formData)
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
        .post(`${baseURL}admin-side/admin-login/`, {
          email: email,
          password: password,
         }, { withCredentials: true })
        .then((response) => {
          console.log("response.data = ", response.data);
          console.log("response.data.access = ", response.data.access);
          console.log("response.data.user = ", response.data.user);
          localStorage.setItem('accessToken', response.data.access);
          localStorage.setItem('refreshToken', response.data.refresh);
          dispatch(setAdminAccessToken(response.data));
          dispatch(setAdminUser(response.data.user));
          navigator('/admin');
          console.log("UUUUUUUUUUUUUUUUUUUUUUU",response.user)

        })   
        .catch((error) => {
          if (error.response && error.response.status === 401) {
            console.log("ErrorRRRRRR")
            // Unauthorized: Invalid credentials
            // setEmailError('Invalid email or password');
            // setPasswordError('Invalid email or password');
          } else {
            // Other errors
            // console.error('Login error:', error);
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