import { Navigate  } from 'react-router-dom';
import { Header,MyPost} from '../components';
import { useSelector} from "react-redux";

function MyPostPage(isAuthenticated) {
    const user = useSelector((state)=>state.user);
    // Check if the user is authenticated
    if (user && user.isAuthenticated){
      return (
        <div>
          <Header />
          <MyPost />
        </div>
      );
    }else{
  // Redirect to the login page if the user is not authenticated
  return <Navigate to="/login" />;
    
  }
}

export default MyPostPage