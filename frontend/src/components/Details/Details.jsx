

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../api/api';
import { useSelector, } from "react-redux";
// import { Link } from 'react-router-dom';
import "./Details.css";


const Details = (props) => {
  const user = useSelector((state)=>state.user);
  // const { slug, id } = useParams();
  const param = useParams();
  const slug =param.slug
  console.log("ETETETTTTTTTTTTTTTTTTTTTTT",slug)
  const [listing, setListing] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}listings/${slug}`,
        {headers: {
          Authorization: `Bearer ${user.accessToken}`, 
        },}
        );
        const detaildata = response.data;
        console.log("//////////////", response.data);
        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing detail:', error);
      }
    };

    fetchData();  }, [slug]);

  if (!listing) {
    return <div>Loading...</div>;
  }




  const displayInteriorImages = () => {
    let images = [];
    
    images.push(
        <div key={1} className="images">
            <div className="flexColStart r-card">
                {
                    listing.photo_1 ? (
                        <div className='listingdetail__display'>
                            <img className='listingdetail__display__image' src={listing.photo_1} alt='' />
                        </div>
                    ) : null
                }
            </div>
            <div className="flexColStart r-card">
                {
                    listing.photo_2 ? (
                        <div className='listingdetail__display'>
                            <img className='listingdetail__display__image' src={listing.photo_2} alt='' />
                        </div>
                    ) : null
                }
            </div>
            <div className="flexColStart r-card">
                {
                    listing.photo_3 ? (
                        <div className='listingdetail__display'>
                            <img className='listingdetail__display__image' src={listing.photo_3} alt='' />
                        </div>
                    ) : null
                }
            </div>
            <div className="flexColStart r-card">
                {
                    listing.photo_4 ? (
                        <div className='listingdetail__display'>
                            <img className='listingdetail__display__image' src={listing.photo_4} alt='' />
                        </div>
                    ) : null
                }
            </div>
            <div className="flexColStart r-card">
                {
                    listing.photo_5 ? (
                        <div className='listingdetail__display'>
                            <img className='listingdetail__display__image' src={listing.photo_5} alt='' />
                        </div>
                    ) : null
                }
            </div>
        </div>
    );

return images;
};

  return (

  <div className='listingdetail'>
            {/* <Helmet>
                <title>Realest Estate - Listing | {`${listing.title}`}</title>
                <meta
                    name='description'
                    content='Listing detail'
                />
            </Helmet> */}
            <div className='listingdetail__header'>
                <h1 className='listingdetail__title'>{listing.title}</h1>
                <p className='listingdetail__location'>{listing.city}, {listing.state}, {listing.zipcode}</p>
            </div>
            {/* <div className='row'>
                <div className='listingdetail__breadcrumb'>
                    <Link className='listingdetail__breadcrumb__link' to='/'>Home</Link> / {listing.title}
                </div>
            </div> */}
            <div className='intrestsection'>
                <button className='intrestbutton'>
                    Send an Intrest
                </button>
            </div>
            <div className='row'>
                <div className='col-3-of-4' style={{ alignItems: "center", textAlign: "center" ,marginLeft:"33%"}}>
                    <div className='listingdetail__displaymain'>
                        <img className='listingdetail__displaymain__image' src={listing.photo_main} alt='' />
                    </div>
                </div>
                {/* <div className='col-1-of-4'>
                    <div className='listingdetail__display'>
                        <img className='listingdetail__display__image' src={realtor.photo} alt='' />
                    </div>
                    <h3 className='listingdetail__realtor'>{realtor.name}</h3>
                    <p className='listingdetail__contact'>{realtor.phone}</p>
                    <p className='listingdetail__contact'>{realtor.email}</p>
                    <p className='listingdetail__about'>{realtor.description}</p>
                </div> */}
            </div>
            <div className='row'>
                <div className='col-1-of-2' >
                    <ul className='listingdetail__list' style={{display:"flex" , justifyContent:"space-evenly"}}>
                        <li className='listingdetail__list__item'>Home Type: {listing.home_type}</li>
                        <li className='listingdetail__list__item'>Price: ₹{listing.price}</li>
                        <li className='listingdetail__list__item'>Bedrooms: {listing.bedrooms}</li>
                        <li className='listingdetail__list__item'>Bathrooms: {listing.bathrooms}</li>
                        <li className='listingdetail__list__item'>Square Feet: {listing.sqft}</li>
                    </ul>
                </div>
                <div className='col-1-of-2'>
                    <ul className='listingdetail__list' style={{ textAlign:"center"}}>
                        <li className='listingdetail__list__item'>Sale Type: {listing.sale_type}</li>
                        <li className='listingdetail__list__item'>Address: {listing.address}</li>
                        <li className='listingdetail__list__item'>City: {listing.city}</li>
                        <li className='listingdetail__list__item'>State: {listing.state}</li>
                        <li className='listingdetail__list__item'>Zipcode: {listing.zipcode}</li>
                    </ul>
                </div>
            </div>
            <div className='row'>
                <p className='listingdetail__description' style={{ textAlign:"center"}}>{listing.description}</p>
            </div>
            
            {displayInteriorImages()}
            
        </div>
    );
};
export default Details;
