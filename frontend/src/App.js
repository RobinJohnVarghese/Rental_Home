import React from 'react'
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import { HomePage, LoginPage, SignUpPage, ResidenciesPage, SellPage, ProfilePage,DetailsPage,MyPostPage ,NotificationPage ,MembershipPage , NotFound
  ,AdminHomePage,AdminLoginPage, AdminUserManagementPage, AdminPostManagementPage,MyPostDetailPage,SearchDataPage,MessageDetailsPage,MessagePage } from './pages';
import "./App.css";
import { AdminUserManagement } from './components';

function App() {
  return (
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
            <Route path="/messagedetails/:id" element={<MessageDetailsPage/>}/>


            <Route path="/admin" element={<AdminHomePage/>}/>
            <Route path='/admin-login' element={<AdminLoginPage/>} />
            <Route path='/admin/user-list' element={<AdminUserManagement/>} />
            <Route path="/admin-usermanagement" element={<AdminUserManagementPage/>}/>
            <Route path="/admin-postmanagement" element={<AdminPostManagementPage/>}/>
            
            <Route path="*" element={<NotFound/>}/>
        
        </Routes>
        </Router> 
  )
}

export default App