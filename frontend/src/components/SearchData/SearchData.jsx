// import React, { useState, useEffect} from "react";
// import { Link } from 'react-router-dom';
// import { imageBaseUrl } from '../../api/api';
// import "./SearchData.css";
// import { useLocation } from 'react-router-dom';

// function SearchData() {
//     const { state } = useLocation();
//     const [results, setResults] = useState([]); 
//     useEffect(() => {
//       if (state) {
//         setResults(state);
//       }
//       // setResults(state);
//   }, [state]);
//     console.log("^^^^^^^^^^  state",state)
//     const searchResults = Array.isArray(state) ? state : [];
//     console.log("^^^^^^^^^^  searchResults",searchResults)
//     console.log("^^^^^^^^^^  results",searchResults)
  
//   return (
//     <div id="residencies" className="r-wrapper">
//       <div className="flexColStart r-head">
//           <span className="orangeText">Best Choices</span>
//           <span className="primaryText">Popular Residencies</span>
//         </div>
//       <div className="paddings innerWidth r-container">
//         {results.map((card, i) => (
//             <Link key={i} to={`/residencies/detail/${card.slug}`} className="r-card-link">
//               {console.log("card.photo_main",card.photo_main)}
//               <div className="flexColStart r-card">
//                 <img src={imageBaseUrl + card.photo_main} alt="home" />
  
//                 <span className="secondaryText r-price">
//                   <span style={{ color: 'orange' }}>₹</span>
//                   <span>{card.price}</span>
//                 </span>
//                 <span className="primaryText">{card.title}</span>
//                 <span className="secondaryText">{card.address}</span>
//               </div>
//             </Link>
//         ))}
//       </div>
//     </div>
//   );
// }

// export default SearchData;

import React, { useState, useEffect } from "react";
import { Link } from 'react-router-dom';
import { imageBaseUrl } from '../../api/api';
import "./SearchData.css";
import { useLocation } from 'react-router-dom';

function SearchData() {
    const { state } = useLocation();
    console.log("$$$$$$$$$$$$$$$$$$$$$$$ state",state)
    const [results, setResults] = useState([]); 
    useEffect(() => {
      if (state && Array.isArray(state.searchData)) {
        console.log("Setting results:", state.searchData);
        setResults(state.searchData);
      }
  }, [state]);
  
  return (
    <div id="residencies" className="r-wrapper">
      <div className="flexColStart r-head">
          <span className="orangeText">Best Choices</span>
          <span className="primaryText">Popular Residencies</span>
        </div>
      <div className="paddings innerWidth r-container">
        {results.map((card, i) => (
            <Link key={i} to={`/residencies/detail/${card.slug}`} className="r-card-link">
              <div className="flexColStart r-card">
                <img src={imageBaseUrl + card.photo_main} alt="home" />
  
                <span className="secondaryText r-price">
                  <span style={{ color: 'orange' }}>₹</span>
                  <span>{card.price}</span>
                </span>
                <span className="primaryText">{card.title}</span>
                <span className="secondaryText">{card.address}</span>
              </div>
            </Link>
        ))}
      </div>
    </div>
  );
}

export default SearchData;
