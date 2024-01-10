import {Fragment}  from 'react'
import Header from '../components/Header/Header';
import Login from '../components/Login/Login';
import Footer from '../components/Footer/Footer';


function LoginPage() {
  return (
    <Fragment>
    <div>
        <Header/>
        <Login/> 
        <Footer/> 
    </div>
    </Fragment>
  )
}

export default LoginPage