
// import data from "../../utils/slider.json";
// import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import React, { useState, useEffect } from 'react';
import { baseURL } from '../../api/api';
// import { useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';
// Import Swiper styles
import "swiper/css";
import "./Residencies.css";
// import { sliderSettings } from "../../utils/common";
const Residencies = () => {

  const [listings, setListings] = useState([]);
  // console.log("Listingrrrrr",listings)
 

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}listings/`);
      // Assuming the response.data is an array of Listing objects
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);
console.log("FGDR",listings,"RRDDDFREEDDDF")

return (
  <div id="residencies" className="r-wrapper">
    <div className="flexColStart r-head">
        <span className="orangeText">Best Choices</span>
        <span className="primaryText">Popular Residencies</span>
      </div>
    <div className="paddings innerWidth r-container">
      {/* <div className="flexColStart r-head">
        <span className="orangeText">Best Choices</span>
        <span className="primaryText">Popular Residencies</span>
      </div> */}
      {listings && listings.map((card, i) => (
        // <div className="r-card-link" key={i} onClick={() => handleCardClick(i)}>
          <Link to={`/residencies/detail/${card.slug}`} className="r-card-link">
            {console.log("card.slug",card.slug)}
            <div className="flexColStart r-card">
              <img src={card.photo_main} alt="home" />

              <span className="secondaryText r-price">
                <span style={{ color: 'orange' }}>₹</span>
                <span>{card.price}</span>
              </span>
              <span className="primaryText">{card.title}</span>
              <span className="secondaryText">{card.address}</span>
            </div>
          </Link>
        //  </div>
      ))}
    </div>
  </div>
);
};

export default Residencies;

// const SlideNextButton = () => {
//   const swiper = useSwiper();
//   return (
//     <div className="flexCenter r-buttons">
//       <button onClick={() => swiper.slidePrev()} className="r-prevButton">
//         &lt;
//       </button>
//       <button onClick={() => swiper.slideNext()} className="r-nextButton">
//         &gt;
//       </button>
//     </div>
//   );
// };

