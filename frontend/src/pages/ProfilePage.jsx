import {Fragment}  from 'react'
import Header from '../components/Header/Header';
import Profile from '../components/Profile/Profile';


function ProfilePage() {
  return (
    <Fragment>
    <div>
        <Header/>
        <Profile/> 
    </div>
    </Fragment>
  )
}

export default ProfilePage