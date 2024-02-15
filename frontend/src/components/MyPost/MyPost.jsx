
import React, { useState, useEffect } from 'react';
import { baseURL } from '../../api/api';
import { useSelector} from "react-redux";
import { Link } from 'react-router-dom';
import axios from 'axios';
import "swiper/css";
import "./MyPost.css";

const MyPost = () => {
  const user = useSelector((state)=>state.user);
  console.log("@@@@@@@@@@@@@@@@@@@@@@@@@@@@user",user)
  const [listings, setListings] = useState([]);
  // console.log("Listingrrrrr",listings)
 

useEffect(() => {
  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}listings/my_listing/${user.user.id}/`,
      {headers: {
        Authorization: `Bearer ${user.accessToken}`, 
      },}
      );
      // Assuming the response.data is an array of Listing objects
      setListings(response.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    }
  };

  fetchData();
}, []);
console.log("FGDR",listings,"RRDDDFREEDDDF")
// console.log("card.id",listings.i)
// console.log("Selected Element ID:", listings[0].id);
// console.log("Selected Element slug:", listings[0].slug);

// const handleCardClick = (index) => {
//   const selectedListing = listings.results[index];
//   const { slug, id } = selectedListing;
//   console.log('Selected Listing Slug:', slug);
//   console.log('Selected Listing ID:', id);
//   // Now you can use slug and id as needed (e.g., navigate to the detail page)
// };

return (
  <div id="residencies" className="r-wrapper">
    <div className="flexColStart r-head">
        <span className="orangeText">MY POSTS</span>
      </div>
    <div className="paddings innerWidth r-container">
      {/* <div className="flexColStart r-head">
        <span className="orangeText">Best Choices</span>
        <span className="primaryText">Popular Residencies</span>
      </div> */}
      {listings && listings.map((card, i) => (
        // <div className="r-card-link" key={i} onClick={() => handleCardClick(i)}>
          <Link to={`/my-posts-detail/${card.slug}`} className="r-card-link">
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

export default MyPost;



