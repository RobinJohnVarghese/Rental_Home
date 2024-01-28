
// import data from "../../utils/slider.json";
// import { Swiper, SwiperSlide, useSwiper } from "swiper/react";
import React, { useState, useEffect } from 'react';
import { baseURL } from '../../api/api';
import { useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';
// Import Swiper styles
import "swiper/css";
import "./AdminPosts.css";
// import { sliderSettings } from "../../utils/common";
const AdminPosts = () => {

  const [listings, setListings] = useState([]);
  const admin = useSelector((state)=>state.admin);
  console.log("Listingrrrrr",listings)
  // console.log("Adminrrrrr1",admin)
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
      const response = await axios.get(`${baseURL}admin-side/users_Postmanagement/`);
      // Assuming the response.data is an array of Listing objects
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);
console.log("FGDR",listings,"RRDDDFREEDDDF")
console.log("card.id",listings.id)


// const handleCardClick = (index) => {
//   const selectedListing = listings.results[index];
//   const { slug, id } = selectedListing;
//   console.log('Selected Listing Slug:', slug);
//   console.log('Selected Listing ID:', id);
//   // Now you can use slug and id as needed (e.g., navigate to the detail page)
// };

const handleBlockUnblock = async (cardId, is_published) => {
  console.log('post ID',cardId)
    try {
      const url = `${baseURL}admin-side/users_Postmanagement/${cardId}/${is_published ? 'block' : 'unblock'}/`;
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${admin.adminAccessToken}`,
        },
      });
  
      if (!response.ok) {
        throw new Error(`Failed to ${is_published ? 'block' : 'unblock'} post.`);
        
      }
      
      
      setListings(prevListings => {
        return prevListings.map(listings => {
          if (listings.id === cardId) {
            return { ...listings, is_published: !is_published };
          }
          return listings;
        });
      });
  
  
      const data = await response.json();
      // console.log(data)
    } catch (error) {
      console.error('Error:', error.message);
    }
  };  

  return (
    <div id="residencies" className="r-wrapper">
      <div className="flexColStart r-head">
          <span className="orangeText">Admin Options</span>

        </div>
      <div className="paddings innerWidth r-container">

          {listings && listings.map((card, i) => (
              // onClick={() => handleCardClick(i)}
            <div className="r-card-link" key={i} >
              <div className="flexColStart r-card">
                <img src={card.photo_main} alt="home" />
  
                <span className="secondaryText r-price">
                  <span style={{ color: 'orange' }}>₹</span>
                  <span>{card.price}</span>
                </span>
                <span className="primaryText">{card.title}</span>
                <span className="secondaryText">{card.address}</span>
                <span className="secondaryText">{card.city}</span>
                <span className="secondaryText">{card.state}</span>
                <div>
                  <button 
                          onClick={() => handleBlockUnblock(card.id, card.is_published)}
                          style={{
                              borderRadius: '5px',
                              padding: '6px 12px',
                              backgroundColor: card.is_published ? '#72d88a' : '#dc3545',
                              color: '#fff',
                              border: 'none',
                              cursor: 'cell',
                            }}>
                              {card.is_published ? 'Block' : 'UnBlock'}
                              {/* --{card.id}--{i} */}
                  </button>
                  </div>
              </div>
          </div>
          ))}
      </div>
    </div>
  );
};

export default AdminPosts;

