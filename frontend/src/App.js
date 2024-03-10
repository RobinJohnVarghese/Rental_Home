import React from 'react'
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import { HomePage, LoginPage, SignUpPage, ResidenciesPage, SellPage, ProfilePage,DetailsPage,MyPostPage ,NotificationPage ,MembershipPage , NotFound
  ,AdminHomePage,AdminLoginPage, AdminUserManagementPage, AdminPostManagementPage,MyPostDetailPage,SearchDataPage,MessagePage } from './pages';
import "./App.css";
import { AdminUserManagement } from './components';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';



function App() {

  
  return (

  <div>
   <ToastContainer
    position="top-right"
    autoClose={5000}
    hideProgressBar={false}
    newestOnTop={false}
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover
    theme="colored"
    />
    <Router> 
        <Routes>
          
            
            <Route path="/" element={<HomePage/>}/>
            <Route path="/login" element={<LoginPage/>}/>
            <Route path="/signup" element={<SignUpPage/>}/>
            <Route path="/residencies" element={<ResidenciesPage/>}/>
            <Route path="/residencies/detail/:slug" element={<DetailsPage/>}/>
            <Route path="/sell" element={<SellPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/my-posts" element={<MyPostPage/>}/>
            <Route path="/my-posts-detail/:slug" element={<MyPostDetailPage/>}/>
            <Route path="/notifications" element={<NotificationPage/>}/>
            <Route path="/membership" element={<MembershipPage/>}/>
            <Route path="/searchdatapage" element={<SearchDataPage/>}/>
            <Route path="/message" element={<MessagePage/>}/>
           


            <Route path="/admin" element={<AdminHomePage/>}/>
            <Route path='/admin-login' element={<AdminLoginPage/>} />
            <Route path='/admin/user-list' element={<AdminUserManagement/>} />
            <Route path="/admin-usermanagement" element={<AdminUserManagementPage/>}/>
            <Route path="/admin-postmanagement" element={<AdminPostManagementPage/>}/>
            
            <Route path="*" element={<NotFound/>}/>
            
            
        </Routes>
        </Router> 
        </div>
  )
}

export default App