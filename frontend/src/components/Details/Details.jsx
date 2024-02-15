

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../api/api';
import { useSelector, } from "react-redux";
import "./Details.css";
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBTable, 
    MDBTableHead,
    MDBTableBody,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBTextArea,
  } from 'mdb-react-ui-kit';



const Details = (props) => {
  const user = useSelector((state)=>state.user);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [showErrorMessage, setShowErrorMessage] = useState(false);
  // const { slug, id } = useParams();
  const param = useParams();
  const slug =param.slug
  
//   console.log("ETETETTTTTTTTTTTTTTTTTTTTT",slug)
  
  const [listing, setListing] = useState(null);
//   console.log("#########################from user",user.user.id)
//   console.log("#########################To user",listing.realtor)
//   console.log("#########################listing.id",listing.id)
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
        // console.log("$$$$$$$$$$$$$$$$",response.data.id)
        setListing(response.data);
      } catch (error) {
        console.error('Error fetching listing detail:', error);
      }
    };

    fetchData();  }, [slug]);

  if (!listing) {
    return <div>Loading...</div>;
  }


  const handleSubmit = async () => {
    try {
      const fromuser = user.user.id;
      const touser = listing.realtor;
      const postid = listing.id;
      console.log("**********************",fromuser,touser,postid)
      const response = await axios.post(
        `${baseURL}listings/send_interest/`,
        { fromuser, touser, postid },
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
            Accept: 'application/json',
          },
        }
      );
      setShowSuccessMessage(true);
      console.log('Interest sent successfully', response.data);
      // You can handle success or update the UI as needed
    } catch (error) {
      setShowErrorMessage(true);
      console.error('Error sending interest:', error);
      // You can handle errors or show an error message
    }
  };




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

    <MDBContainer fluid style={{padding:"0"}}>
        <div className="p-5 bg-image"style={{backgroundImage:'url(https://mdbootstrap.com/img/new/textures/full/175.jpg)',height: '100%px', 
                      backgroundSize: 'cover', 
                      backgroundRepeat: 'no-repeat' }}>
            <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                    }}>
    <MDBCard className=' mx-5 mb-5  p-5 shadow-5 'style={{background: 'hsla(0, 0%, 100%, 0.8)',backdropFilter: 'blur(30px)',height: "fit-content",}}>
    <MDBCardBody className='p-5 text-center' style={{width:"100%"}}>
  <div className='listingdetail'>
            <div className='listingdetail__header'>
                <h1 className='listingdetail__title'>{listing.title}</h1>
                <p className='listingdetail__location'>{listing.city}, {listing.state}, {listing.zipcode}</p>
            </div>
            <div className='intrestsection'>
            {showSuccessMessage && (<div style={{ color: 'green' }}>Interest sent successfully!</div>)}
            {showErrorMessage && (<div style={{ color: 'red' }}>Interest already sent!</div>)}
                
            </div>
            <div className='intrestsection'>
                {user.user.id !== listing.realtor && (
                    <button className='intrestbutton' onClick={handleSubmit}>
                    Send an Interest
                    </button>
                )}
                {user.user.id === listing.realtor && (
                    <p className='intrestbutton__message'>
                    You can't make an interest because you are the seller.
                    </p>
                )}
            </div>
            <div className='row'>
                <img className='listingdetail__displaymain__image' src={listing.photo_main} alt='' />  
            </div>
            <div >
                {/* <div className='col-1-of-2' >
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
                </div> */}
                <div className='row'>
                <p className='listingdetail__description' style={{ textAlign:"center"}}>Details</p>
            </div>
            <MDBTable hover>
            <MDBTableBody>
                <tr>
                <th scope='row'>Home Type</th>
                <td>{listing.home_type}</td>
                <th scope='row'>Sale Type</th>
                <td>{listing.sale_type}</td>
                </tr>
                <tr>
                <th scope='row'>Price</th>
                <td>₹{listing.price}</td>
                <th scope='row'>Square Feet</th>
                <td>{listing.sqft}ft</td>
                </tr>
                <tr>
                <th scope='row'>Bedrooms</th>
                {/* <td colSpan={2}>Larry the Bird</td> */}
                <td>{listing.bedrooms}</td>
                <th scope='row'>Bathrooms</th>
                <td>{listing.bathrooms}</td>
                </tr>
                <tr>
                <th scope='row'>Address and Zipcode</th>
                <td colSpan={2}>{listing.address}</td>
                {/* <td>{listing.city}</td>
                <td>{listing.state}</td> */}
                <td >{listing.zipcode}</td>
                </tr>
                <tr>
                <th scope='row'>City</th>
                {/* <td colSpan={2}>Larry the Bird</td> */}
                <td>{listing.city}</td>
                <th scope='row'>State</th>
                <td>{listing.state}</td>
                </tr>
            </MDBTableBody>
            </MDBTable>
            <div className='row'>
                <p className='listingdetail__description' style={{ textAlign:"center",fontSize:"medium"}}>{listing.description}</p>
            </div>
            </div>
            
            
            {displayInteriorImages()}
            
        </div>
        </MDBCardBody>
        </MDBCard>
        </div>
        </div>
    </MDBContainer>
    );
};
export default Details;
