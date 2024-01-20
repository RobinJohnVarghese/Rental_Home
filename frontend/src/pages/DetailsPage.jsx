// import { Navigate  } from 'react-router-dom';
// import { Header,Details,Footer} from '../components';
// import { useSelector} from "react-redux";
import Header from '../components/Header/Header';
import Details from '../components/Details/Details';


function DetailsPage({ isAuthenticated }) {

    return (
      <div>
        <Header />
        <Details />
        {/* <Footer /> */}
      </div>
    );
};
export default DetailsPage