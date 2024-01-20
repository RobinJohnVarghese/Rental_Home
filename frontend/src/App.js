import React from 'react'
import {BrowserRouter as Router,Route, Routes} from "react-router-dom"
import { HomePage, LoginPage, SignUpPage, ResidenciesPage, SellPage, ProfilePage,DetailsPage, NotFound
  ,AdminHomePage,AdminLoginPage, AdminUserManagementPage, AdminPostManagementPage } from './pages';
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
            <Route path="/sell" element={<SellPage/>}/>
            <Route path="/profile" element={<ProfilePage/>}/>
            <Route path="/residencies/detail/:id" element={<DetailsPage/>}/>


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