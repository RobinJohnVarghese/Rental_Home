// import {Fragment}  from 'react';
import AdminHeader from '../components/AdminHeader/AdminHeader';
import AdminPosts from '../components/AdminPosts/AdminPosts';
// import AdminFooter from '../components/AdminFooter/AdminFooter'
import { useSelector} from "react-redux";
import { Navigate  } from 'react-router-dom';




function AdminPostManagementPage() {
  // return (
  //   <Fragment>
        
  //       <div>
  //         <AdminHeader/>
  //         <AdminPosts/> 
  //         {/* <AdminFooter/>  */}
  //       </div>      
  //   </Fragment>
  // )

  const user = useSelector((state)=>state.admin);
  // Check if the user is authenticated
  if (user && user.isAdminAuthenticated
    ){
    return (
      <div>
        <AdminHeader/>
        <AdminPosts/>
        
      </div>
    );
  }else{
// Redirect to the login page if the user is not authenticated
return <Navigate to="/admin-login" />;
  
}


}

export default AdminPostManagementPage