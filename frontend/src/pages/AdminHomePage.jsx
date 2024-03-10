
import AdminHeader from '../components/AdminHeader/AdminHeader';
import AdminHome from '../components/Admin/AdminHome';
import { useSelector} from "react-redux";
import { Navigate  } from 'react-router-dom';


function AdminHomePage() {

  const user = useSelector((state)=>state.admin);
  // Check if the user is authenticated
  if (user && user.isAdminAuthenticated
    ){
    return (
      <div>
        <AdminHeader/>
        <AdminHome/> 
        
      </div>
    );
  }else{
// Redirect to the login page if the user is not authenticated
return <Navigate to="/admin-login" />;
  
}
}

export default AdminHomePage