import {Fragment}  from 'react'
import Header from '../components/Header/Header';
import Footer from '../components/Footer/Footer';
import SignUp from '../components/SignUp/SignUp';

function SignUpPage() {
  return (
    <Fragment>
    <div>
        <Header/>
        <SignUp/> 
        <Footer/> 
    </div>
    </Fragment>
  )
}

export default SignUpPage