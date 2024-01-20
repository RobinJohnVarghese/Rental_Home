import {Fragment}  from 'react'
import Header from '../components/Header/Header';
import Profile from '../components/Profile/Profile';
// import Footer from '../components/Footer/Footer';


function ProfilePage() {
  return (
    <Fragment>
    <div>
        <Header/>
        <Profile/> 
        {/* <Footer/>  */}
    </div>
    </Fragment>
  )
}

export default ProfilePage