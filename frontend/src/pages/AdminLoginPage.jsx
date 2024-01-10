import {Fragment}  from 'react'
import AdminHeader from '../components/AdminHeader/AdminHeader';
import AdminLogin from '../components/AdminLogin/AdminLogin';
import Footer from '../components/Footer/Footer';


function AdminLoginPage() {
  return (
    <Fragment>
    <div>
        <AdminHeader/>
        <AdminLogin/> 
        <Footer/> 
    </div>
    </Fragment>
  )
}

export default AdminLoginPage