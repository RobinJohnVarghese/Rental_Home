import { Navigate  } from 'react-router-dom';
import { Header,Sell,Footer} from '../components';
import { useSelector} from "react-redux";


function SellPage({ isAuthenticated }) {
  const user = useSelector((state)=>state.user);
  if (user && user.isAuthenticated) {
    return (
    
      <div>
        <Header/>
        <Sell/> 
        {/* <Footer/>  */}
      </div>        
    )  
  }else{
   // Redirect to the login page if the user is not authenticated
   return <Navigate to="/login" />;
}
}
export default SellPage;