
import data from "../../utils/slider.json";
import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import React, { useState, useEffect } from 'react';
import { baseURL } from '../../api/api';
import { useSelector} from "react-redux";

import axios from 'axios';
// Import Swiper styles
import "swiper/css";
import "./AdminPosts.css";
import { sliderSettings } from "../../utils/common";
const AdminPosts = () => {

  const [listings, setListings] = useState([]);
  const admin = useSelector((state)=>state.admin);
  console.log("Listingrrrrr",listings)
  console.log("Adminrrrrr1",admin)
//   useEffect(() => {
//     axios.get(`${baseURL}listings/`,{
//       headers: {
//         Authorization: `Bearer ${admin.adminAccessToken}`,
//       },
//     })
//         .then(response => {
//             console.log("fffffffff",)
//             setUsers(response.data);
//             console.log("EEEEEEEE",)
//         })
//         .catch(error => {
//             console.error('Error fetching user data:', error);
//         });
// }, []);

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





// return (
//   <div>
//     <h1>Listings</h1>
//     <ul>
//       {listings.map((listing, index) => (
//         <li key={index}>
//           <p>Title: {listing.title}</p>
//           <p>Address: {listing.address}</p>
//           {/* Add other fields as needed */}
//         </li>
//       ))}
//     </ul>
//   </div>
// );





  return (
    <div id="residencies" className="r-wrapper">
      <div className="paddings innerWidth r-container">
        <div className="flexColStart r-head">
          <span className="orangeText">Admin Options</span>
          {/* <span className="primaryText">Popular Residencies</span> */}
        </div>
        <Swiper {...sliderSettings}>
          <SlideNextButton />
          {/* slider */}
          {listings.results && listings.results.map((card, i) => (
            <SwiperSlide key={i}>
              <div className="flexColStart r-card">
                <img src={card.photo_main} alt="home" />

                <span className="secondaryText r-price">
                  <span style={{ color: "orange" }}>$</span>
                  <span>{card.price}</span>
                </span>
                <span className="primaryText">{card.title}</span>
                <span className="secondaryText">{card.address}</span>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default AdminPosts;

const SlideNextButton = () => {
  const swiper = useSwiper();
  return (
    <div className="flexCenter r-buttons">
      <button onClick={() => swiper.slidePrev()} className="r-prevButton">
        &lt;
      </button>
      <button onClick={() => swiper.slideNext()} className="r-nextButton">
        &gt;
      </button>
    </div>
  );
};
