import AdminHeader from '../components/AdminHeader/AdminHeader';
import AdminUserManagement from '../components/AdminUserManagement/AdminUserManagement';
import { useSelector} from "react-redux";
import { Navigate  } from 'react-router-dom';

function AdminUserManagementPage() {

  const user = useSelector((state)=>state.admin);
  // Check if the user is authenticated
  if (user && user.isAdminAuthenticated
    ){
    return (
      <div>
        <AdminHeader/>
        <AdminUserManagement/> 
        
      </div>
    );
  }else{
// Redirect to the login page if the user is not authenticated
return <Navigate to="/admin-login" />;
  
}

}

export default AdminUserManagementPage