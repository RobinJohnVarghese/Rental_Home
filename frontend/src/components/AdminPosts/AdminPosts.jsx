import React, { useState, useEffect } from 'react';
import { baseURL } from '../../api/api';
import { useSelector} from "react-redux";
import axios from 'axios';
import "swiper/css";
import "./AdminPosts.css";
const AdminPosts = () => {

  const [listings, setListings] = useState([]);
  const admin = useSelector((state)=>state.admin);
  console.log("Listingrrrrr",listings)

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

