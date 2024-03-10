import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL,imageBaseUrl } from '../../api/api';
import { useSelector, } from "react-redux";
import "./MyPostDetail.css";
import {
    MDBContainer,
    MDBCard,
    MDBCardBody,
    MDBCol,
    MDBRow,
    MDBInput,
    MDBTextArea,
  } from 'mdb-react-ui-kit';


const MyPostDetail = (props) => {
  const user = useSelector((state)=>state.user);
  const [successMessage, setSuccessMessage] = useState('');
  const param = useParams();
  const slug =param.slug
 
  const [listing, setListing] = useState({
    realtor_id: user.user.id,
    slug: '',
    title: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    description: '',
    sale_type: 'For Rent',
    price: '',
    bedrooms: '',
    bathrooms: '',
    home_type: 'House',
    sqft: '',
    open_house: false,
    photo_main: null,
    photo_1: "",photo_2: "",photo_3: "",photo_4: "",photo_5: "",
    is_published: true,
    list_date: new Date().toISOString(),
    // Add other fields as needed
  });
  // console.log('formData from listing',listing)

useEffect(() => {
    const fetchData = async () => {
    try {
        const response = await axios.get(`${baseURL}listings/${slug}`,
        {headers: {
        Authorization: `Bearer ${user.accessToken}`, 
        },}
        );
        // const detaildata = response.data;
        setListing(response.data);
    } catch (error) {
        console.error('Error fetching listing detail:', error);
    }
    };

    fetchData();  }, [slug ,user.accessToken]);

if (!listing) {
    return <div>Loading...</div>;
}

const handleChange = (event) => {
  const fieldName = event.target.name;
  const file = event.target.files[0];
    setListing((prevProfile) => ({
      ...prevProfile,
      [fieldName]: file,
    }));
  };


  const handleFileChange = (event) => {
    const fieldName = event.target.name;
    const file = event.target.files[0];

    setListing((prevProfile) => ({
      ...prevProfile,
      [fieldName]: file,
    }));
  };

  function ensureHttps(url) {
    if (url.startsWith('http://')) {
      return url.replace(/^http:\/\//i, 'https://');
    }
    return url;
  }
  
  const handleUpdate = async () => {
    try {
      console.log("************* Entered to try ***********************")
      
      const formData = new FormData();
      formData.append( 'realtor_id', user.user.id,);
      formData.append('slug', listing.slug);
      formData.append('title', listing.title);
      formData.append('address', listing.address);
      formData.append('city', listing.city);
      formData.append('state', listing.state);
      formData.append('zipcode', listing.zipcode);
      formData.append('description', listing.description);
      formData.append('sale_type', listing.sale_type);
      formData.append('price', listing.price);
      formData.append('bedrooms', listing.bedrooms);
      formData.append('bathrooms', listing.bathrooms);
      formData.append('home_type', listing.home_type);
      formData.append('sqft', listing.sqft);
      formData.append('open_house', listing.open_house);
      formData.append('is_published', listing.is_published);
      formData.append('list_date', listing.list_date);
      
      if (listing.photo_main instanceof File) {
        // If it's a File object (i.e., a newly uploaded file), append it directly
        formData.append('photo_main', listing.photo_main);
        
      } else if (typeof listing.photo_main === 'string') {
        // If it's a string (i.e., an existing file URL), fetch the file and append it
        const response = await fetch(listing.photo_main);
        const blob = await response.blob();
        formData.append('photo_main', blob, 'photo_main.jpg');
      }

      if (listing.photo_1 instanceof File) {
        // If it's a File object (i.e., a newly uploaded file), append it directly
        formData.append('photo_1', listing.photo_1);
      } else if (typeof listing.photo_1 === 'string') {
        // If it's a string (i.e., an existing file URL), fetch the file and append it
        const response = await fetch(listing.photo_1);
        const blob = await response.blob();
        formData.append('photo_1', blob, 'photo_1.jpg');
      }

      if (listing.photo_2 instanceof File) {
        // If it's a File object (i.e., a newly uploaded file), append it directly
        formData.append('photo_2', listing.photo_2);
      } else if (typeof listing.photo_2 === 'string') {
        // If it's a string (i.e., an existing file URL), fetch the file and append it
        const response = await fetch(listing.photo_2);
        const blob = await response.blob();
        formData.append('photo_2', blob, 'photo_2.jpg');
      }

      if (listing.photo_3 instanceof File) {
        // If it's a File object (i.e., a newly uploaded file), append it directly
        formData.append('photo_3', listing.photo_3);
      } else if (typeof listing.photo_3 === 'string') {
        // If it's a string (i.e., an existing file URL), fetch the file and append it
        const response = await fetch(listing.photo_3);
        const blob = await response.blob();
        formData.append('photo_3', blob, 'photo_3.jpg');
      }

      if (listing.photo_4 instanceof File) {
        // If it's a File object (i.e., a newly uploaded file), append it directly
        formData.append('photo_4', listing.photo_4);
      } else if (typeof listing.photo42 === 'string') {
        // If it's a string (i.e., an existing file URL), fetch the file and append it
        const response = await fetch(listing.photo_4);
        const blob = await response.blob();
        formData.append('photo_4', blob, 'photo_4.jpg');
      }

      if (listing.photo_5 instanceof File) {
        // If it's a File object (i.e., a newly uploaded file), append it directly
        formData.append('photo_5', listing.photo_5);
      } else if (typeof listing.photo_5 === 'string') {
        // If it's a string (i.e., an existing file URL), fetch the file and append it
        const response = await fetch(listing.photo_5);
        const blob = await response.blob();
        formData.append('photo_5', blob, 'photo_5.jpg');
      }
      
      // Make the API request
      const response = await axios.put(`${baseURL}listings/update/${slug}`,formData, 
      {
        headers: {
        //   Accept: 'application/json',
          'Content-Type' :'multipart/form-data',
          Authorization: `Bearer ${user.accessToken}`, 
        },
      }
    );
    
      setSuccessMessage('Post updated successfully');

      // Clear the success message after a few seconds (adjust as needed)
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear the message after 3 seconds
      window.location.href = '/my-posts';
      // Exit edit mode
    //   setEditMode(false);
    } catch (error) {
      console.error('Error updating post:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };

  console.log("listing.photo_main",listing.photo_main)

  const handleDelete = async () => {
    // Display a confirmation dialog before deleting (optional)
    const confirmDelete = window.confirm('Are you sure you want to delete your post - '+listing.slug + '?');
  
    if (confirmDelete) {
      try {
        // Make an API request to delete the user profile
        const response = await axios.delete(`${baseURL}listings/delete/${slug}`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
  
        console.log('Post deleted successfully:', response.data);
        
        window.location.href = '/my-posts';
      } catch (error) {
        console.error('Error deleting profile:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
        }
        // Handle the error (display an error message, etc.)
      }
    }
  };

  return (

    <MDBContainer fluid style={{padding:"0"}}>
        <div className="p-5 bg-image"style={{backgroundImage:'url(https://mdbootstrap.com/img/new/textures/full/174.jpg)',height: '1600px', 
                      backgroundSize: 'cover', 
                      backgroundRepeat: 'no-repeat' }}>
            <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                    }}>
    <MDBCard className=' mx-5 mb-5  p-5 shadow-5 w-75'style={{background: 'hsla(0, 0%, 100%, 0.8)',backdropFilter: 'blur(30px)',height: "fit-content",}}>
    <MDBCardBody className='p-5 text-center'>
    <form>
  <div className='listingdetail'>
        {successMessage && (<div className="alert alert-success" role="alert">{successMessage}</div>)}
            <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Realtor'
                              name='realtor_id'
                              type='text'
                              value={`${user.user.id} - ${user.user.name}`}
                            //   onChange={handleChange}
                              readOnly
                            />
                        </MDBCol>

                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Slug'
                              name='slug'
                              type='text'
                              value={listing.slug}
                              onChange={handleChange}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Title'
                              name='title'
                              type='text'
                              value={listing.title}
                              onChange={handleChange}
                            />
                        </MDBCol>

                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Address'
                              name='address'
                              type='text'
                              value={listing.address}
                              onChange={handleChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='City'
                              name='city'
                              type='text'
                              value={listing.city}
                              onChange={handleChange}
                            />
                        </MDBCol>

                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='State'
                              name='state'
                              type='text'
                              value={listing.state}
                              onChange={handleChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Zipcode'
                              name='zipcode'
                              type='text'
                              value={listing.zipcode}
                              onChange={handleChange}
                            />
                        </MDBCol>

                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Price'
                              name='price'
                              type='text'
                              value={listing.price}
                              onChange={handleChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Bedrooms'
                              name='bedrooms'
                              type='text'
                              value={listing.bedrooms}
                              onChange={handleChange}
                            />
                        </MDBCol>

                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Bathrooms'
                              name='bathrooms'
                              type='text'
                              value={listing.bathrooms}
                              onChange={handleChange}
                            />
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Sqft'
                              name='sqft'
                              type='text'
                              value={listing.sqft}
                              onChange={handleChange}
                            />
                        </MDBCol>

                        <MDBCol col='6'>
                            <div class="form-outline mb-4">
                                <select className="form-control" name="sale_type" value={listing.sale_type}
                                 onChange={handleChange}
                                 >
                                    <option value="For Rent">For Rent</option>
                                    <option value="For Sale">For Sale</option>
                                </select>
                                <label className="form-label">Sale Type</label>
                                <div class="form-notch">
                                    <div class="form-notch-leading"></div>
                                    <div class="form-notch-middle" style={{width:"32.8px"}}></div>
                                    <div class="form-notch-trailing"></div>
                                </div>
                            </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol col='6'>
                            <div class="form-outline mb-4">
                                    <select className="form-control" name="home_type" value={listing.home_type} 
                                    onChange={handleChange}
                                    >
                                        <option value="House">House</option>
                                        <option value="Condo">Condo</option>
                                        <option value="Townhouse">Townhouse</option>
                                    </select>
                                    <label className="form-label">Home Type</label>
                                    <div class="form-notch">
                                        <div class="form-notch-leading"></div>
                                        <div class="form-notch-middle" style={{width:"32.8px"}}></div>
                                        <div class="form-notch-trailing"></div>
                                    </div>
                                </div>
                        </MDBCol>

                        <MDBCol col='6'>
                            <div class="form-outline mb-4">
                                    <select className="form-control" name="open_house" value={listing.open_house} 
                                    onChange={handleChange}
                                    >
                                        <option value={false}>False</option>
                                        <option value={true}>True</option>
                                    </select>
                                    <label className="form-label">Open House</label>
                                    <div class="form-notch">
                                        <div class="form-notch-leading"></div>
                                        <div class="form-notch-middle" style={{width:"32.8px"}}></div>
                                        <div class="form-notch-trailing"></div>
                                    </div>
                                </div>
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol col='6'>
                          <MDBTextArea
                            wrapperClass='mb-4'
                            label='Description'
                            name='description'
                            type='text'
                            value={listing.description}
                            onChange={handleChange}
                          />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow style={{paddingBottom:"1rem"}}>
                        <MDBCol col='6'>
                          <MDBInput
                            wrapperClass='mb-4'
                            label='Cover Photo'
                            name='photo_main'
                            type='file'
                            accept='image/*'
                            onChange={handleFileChange}
                          />
                        <div  className="images">
                            <div className="flexColStart r-card">
                                {
                                    listing.photo_main ? (
                                        <div className='listingdetail__display'>
                                            {/* <img className='listingdetail__display__image' src={selectedFile ? URL.createObjectURL(selectedFile):listing.photo_main */}
                                            <img className='listingdetail__display__image' src={typeof listing.photo_main === 'string' ? ensureHttps(listing.photo_main) : URL.createObjectURL(listing.photo_main)} alt='' />
                                            {/* <img className='listingdetail__display__image' src={typeof listing.photo_main === 'string' ? listing.photo_main : URL.createObjectURL(listing.photo_main)} alt='' /> */}

                                              {/* //  `${imageBaseUrl}${listing.photo_main}` */}
                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>                             
                        </MDBCol>

                        <MDBCol col='6'>
                          <MDBInput
                            wrapperClass='mb-4'
                            label='Photo 1'
                            name='photo_1'
                            type='file'
                            accept='image/*'
                            // onChange={handleFileChange1}
                            onChange={handleFileChange}
                            />
                        <div  className="images">
                            <div className="flexColStart r-card">
                                {
                                    listing.photo_1 ? (
                                        <div className='listingdetail__display'>
                                            {/* <img className='listingdetail__display__image' src={selectedFile1 ? URL.createObjectURL(selectedFile1): listing.photo_1} alt='' /> */}
                                            <img className='listingdetail__display__image' src={typeof listing.photo_1 === 'string' ? ensureHttps(listing.photo_1) : URL.createObjectURL(listing.photo_1)} alt='' />

                                            {/* <img className='listingdetail__display__image' src={typeof listing.photo_1 === 'string' ? listing.photo_1 : URL.createObjectURL(listing.photo_1)} alt='' /> */}
                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol col='6'>
                          <MDBInput
                            wrapperClass='mb-4'
                            label='Photo 2'
                            name='photo_2'
                            type='file'
                            accept='image/*'
                            // onChange={handleFileChange2}
                            onChange={handleFileChange}
                          />
                          <div key={1} className="images">
                            <div className="flexColStart r-card">
                                {
                                    listing.photo_2 ? (
                                        <div className='listingdetail__display'>
                                            {/* <img className='listingdetail__display__image' src={selectedFile2 ? URL.createObjectURL(selectedFile2):listing.photo_2} alt='' /> */}
                                            <img className='listingdetail__display__image' src={typeof listing.photo_2 === 'string' ? ensureHttps(listing.photo_2) : URL.createObjectURL(listing.photo_2)} alt='' />

                                            {/* <img className='listingdetail__display__image' src={typeof listing.photo_2 === 'string' ? listing.photo_2 : URL.createObjectURL(listing.photo_2)} alt='' /> */}
                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>
                        </MDBCol>

                        <MDBCol col='6'>
                          <MDBInput
                            wrapperClass='mb-4'
                            label='Photo 3'
                            name='photo_3'
                            type='file'
                            accept='image/*'
                            // onChange={handleFileChange3}
                            onChange={handleFileChange}
                            />
                            <div key={1} className="images">
                            <div className="flexColStart r-card">
                                {
                                    listing.photo_3 ? (
                                        <div className='listingdetail__display'>
                                            {/* <img className='listingdetail__display__image' src={selectedFile3 ? URL.createObjectURL(selectedFile3):listing.photo_3} alt='' /> */}
                                            <img className='listingdetail__display__image' src={typeof listing.photo_3 === 'string' ? ensureHttps(listing.photo_3) : URL.createObjectURL(listing.photo_3)} alt='' />

                                            {/* <img className='listingdetail__display__image' src={typeof listing.photo_3 === 'string' ? listing.photo_3 : URL.createObjectURL(listing.photo_3)} alt='' /> */}
                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol col='6'>
                          <MDBInput
                            wrapperClass='mb-4'
                            label='Photo 4'
                            name='photo_4'
                            type='file'
                            accept='image/*'
                            // onChange={handleFileChange4}
                            onChange={handleFileChange}
                          />
                          <div key={1} className="images">
                            <div className="flexColStart r-card">
                                {
                                    listing.photo_4 ? (
                                        <div className='listingdetail__display'>
                                            {/* <img className='listingdetail__display__image' src={selectedFile4 ? URL.createObjectURL(selectedFile4):listing.photo_4} alt='' /> */}
                                            <img className='listingdetail__display__image' src={typeof listing.photo_4 === 'string' ? ensureHttps(listing.photo_4) : URL.createObjectURL(listing.photo_4)} alt='' />

                                            {/* <img className='listingdetail__display__image' src={typeof listing.photo_4 === 'string' ? listing.photo_4 : URL.createObjectURL(listing.photo_4)} alt='' /> */}

                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>
                        </MDBCol>

                        <MDBCol col='6'>
                          <MDBInput
                            wrapperClass='mb-4'
                            label='Photo 5'
                            name='photo_5'
                            type='file'
                            accept='image/*'
                            // onChange={handleFileChange5}
                            onChange={handleFileChange}
                            />
                            <div key={1} className="images">
                            <div className="flexColStart r-card">
                                {
                                    listing.photo_5 ? (
                                        <div className='listingdetail__display'>
                                            {/* <img className='listingdetail__display__image' src={selectedFile5 ? URL.createObjectURL(selectedFile5):listing.photo_5} alt='' /> */}
                                            <img className='listingdetail__display__image' src={typeof listing.photo_5 === 'string' ? ensureHttps(listing.photo_5) : URL.createObjectURL(listing.photo_5)} alt='' />

                                            {/* <img className='listingdetail__display__image' src={typeof listing.photo_5 === 'string' ? listing.photo_5 : URL.createObjectURL(listing.photo_5)} alt='' /> */}

                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>
                        </MDBCol>
                    </MDBRow>
            {successMessage && (<div className="alert alert-success" role="alert">{successMessage}</div>)}
            <div className='intrestsection'>
                <button className='intrestbutton' style={{background:'lightgreen'}} type="button" onClick={handleUpdate}>
                    Update Post
                </button>
                <button className='intrestbutton' style={{background:'orangered'}} type="button" onClick={handleDelete}>
                    Delete Post
                </button>
            </div>
            <div className='row'>
            </div>   
        </div>
        </form>
        </MDBCardBody>
        </MDBCard>
        </div>
        </div>
    </MDBContainer>
    );
};
export default MyPostDetail;
