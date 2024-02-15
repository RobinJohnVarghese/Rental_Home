

import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { baseURL } from '../../api/api';
import { useSelector, } from "react-redux";
// import { Link } from 'react-router-dom';
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

    // const [formData, setFormData] = useState({
    //     realtor_id: user.user.id,
    //     slug: '',
    //     title: '',
    //     address: '',
    //     city: '',
    //     state: '',
    //     zipcode: '',
    //     description: '',
    //     sale_type: 'For Rent',
    //     price: '',
    //     bedrooms: '',
    //     bathrooms: '',
    //     home_type: 'House',
    //     sqft: '',
    //     open_house: false,
    //     photo_main: null,
    //     photo_1: "",photo_2: "",photo_3: "",photo_4: "",photo_5: "",
    //     is_published: true,
    //     list_date: new Date().toISOString(),
    //     // Add other fields as needed
    //   });
    //   console.log('formData',formData)
    
  const [selectedFile, setSelectedFile] = useState(null);
  const [selectedFile1, setSelectedFile1] = useState(null);
  const [selectedFile2, setSelectedFile2] = useState(null);
  const [selectedFile3, setSelectedFile3] = useState(null);
  const [selectedFile4, setSelectedFile4] = useState(null);
  const [selectedFile5, setSelectedFile5] = useState(null);

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
  console.log('formData',listing)

  const handleFileChange = (event) => {
    const formData = new FormData();
    formData.append('photo', selectedFile);
    console.log('Selected file:', selectedFile);
    const file = event.target.files[0];
    console.log('Selected event.target.files[0]:',event.target.files[0]);
    // Update selected file
    setSelectedFile(file);
    console.log('Selected file:',file);
    
    };
  const handleFileChange1 = (event) => {
    const formData = new FormData();
    formData.append('photo', selectedFile1);
    console.log('Selected file:', selectedFile1);
    const file = event.target.files[0];
    console.log('Selected event.target.files[0]:',event.target.files[0]);
    // Update selected file
    setSelectedFile1(file);
    console.log('Selected file:',file);
    
    };
  const handleFileChange2 = (event) => {
    const formData = new FormData();
    formData.append('photo', selectedFile2);
    console.log('Selected file:', selectedFile2);
    const file = event.target.files[0];
    console.log('Selected event.target.files[0]:',event.target.files[0]);
    // Update selected file
    setSelectedFile2(file);
    console.log('Selected file:',file);
    
    };
  const handleFileChange3 = (event) => {
    const formData = new FormData();
    formData.append('photo', selectedFile3);
    console.log('Selected file:', selectedFile3);
    const file = event.target.files[0];
    console.log('Selected event.target.files[0]:',event.target.files[0]);
    // Update selected file
    setSelectedFile3(file);
    console.log('Selected file:',file);
    
    };
  const handleFileChange4 = (event) => {
    const formData = new FormData();
    formData.append('photo', selectedFile4);
    console.log('Selected file:', selectedFile4);
    const file = event.target.files[0];
    console.log('Selected event.target.files[0]:',event.target.files[0]);
    // Update selected file
    setSelectedFile4(file);
    console.log('Selected file:',file);
    
    };
  const handleFileChange5 = (event) => {
    const formData = new FormData();
    formData.append('photo', selectedFile5);
    console.log('Selected file:', selectedFile5);
    const file = event.target.files[0];
    console.log('Selected event.target.files[0]:',event.target.files[0]);
    // Update selected file
    setSelectedFile5(file);
    console.log('Selected file:',file);
    
    };

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
    const { name, value } = event.target;
    setListing((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };


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
  
      if (selectedFile) {
        formData.append('photo_main', selectedFile, selectedFile.name);
      }else{
        formData.append('photo_main', listing, listing.name);
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
    console.log("EWEWEWEFWEWEWEWEWE profile picture",formData)
  
      console.log('Profile updated successfully:', response.data);
    //   setSuccessMessage('Profile updated successfully');

      // Clear the success message after a few seconds (adjust as needed)
      setTimeout(() => {
        // setSuccessMessage('');
      }, 3000); // Clear the message after 3 seconds
  
      // Exit edit mode
    //   setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };



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
        // Navigate to the sign-in page (assuming your sign-in page route is '/signin')
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

//     const handleChange = (e) => {
//         const { name, value, type, checked, files } = e.target;
    
//         setFormData((prevData) => ({
//           ...prevData,
//           [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
//         }));
//       };


    //   const handleFileChange = (event) => {
    //     const fieldName = event.target.name;
    //     const file = event.target.files[0];
    
    //     setListing({
    //       ...listing,
    //       [fieldName]: file,
    //     });
    //   };
//     };





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
                        <div key={1} className="images">
                            <div className="flexColStart r-card">
                                {
                                    listing.photo_main ? (
                                        <div className='listingdetail__display'>
                                            <img className='listingdetail__display__image' src={selectedFile ? URL.createObjectURL(selectedFile): listing.photo_main} alt='' />
                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>
                        {/* {newPhoto && (
                                <div key={2} className="images">
                                    <div className="flexColStart r-card">
                                        <div className='listingdetail__display'>
                                            <img className='listingdetail__display__image' src={newPhoto} alt='' />
                                        </div>
                                    </div>
                                </div>
                            )}                         */}
                        </MDBCol>

                        <MDBCol col='6'>
                          <MDBInput
                            wrapperClass='mb-4'
                            label='Photo 1'
                            name='photo_1'
                            type='file'
                            accept='image/*'
                            onChange={handleFileChange1}
                            />
                        <div key={1} className="images">
                            <div className="flexColStart r-card">
                                {
                                    listing.photo_1 ? (
                                        <div className='listingdetail__display'>
                                            <img className='listingdetail__display__image' src={selectedFile1 ? URL.createObjectURL(selectedFile1): listing.photo_1} alt='' />
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
                            onChange={handleFileChange2}
                          />
                          <div key={1} className="images">
                            <div className="flexColStart r-card">
                                {
                                    listing.photo_2 ? (
                                        <div className='listingdetail__display'>
                                            <img className='listingdetail__display__image' src={selectedFile2 ? URL.createObjectURL(selectedFile2):listing.photo_2} alt='' />
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
                            onChange={handleFileChange3}
                            />
                            <div key={1} className="images">
                            <div className="flexColStart r-card">
                                {
                                    listing.photo_3 ? (
                                        <div className='listingdetail__display'>
                                            <img className='listingdetail__display__image' src={selectedFile3 ? URL.createObjectURL(selectedFile3):listing.photo_3} alt='' />
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
                            onChange={handleFileChange4}
                          />
                          <div key={1} className="images">
                            <div className="flexColStart r-card">
                                {
                                    listing.photo_4 ? (
                                        <div className='listingdetail__display'>
                                            <img className='listingdetail__display__image' src={selectedFile4 ? URL.createObjectURL(selectedFile4):listing.photo_4} alt='' />
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
                            onChange={handleFileChange5}
                            />
                            <div key={1} className="images">
                            <div className="flexColStart r-card">
                                {
                                    listing.photo_5 ? (
                                        <div className='listingdetail__display'>
                                            <img className='listingdetail__display__image' src={selectedFile5 ? URL.createObjectURL(selectedFile5):listing.photo_5} alt='' />
                                        </div>
                                    ) : null
                                }
                            </div>
                        </div>
                        </MDBCol>
                    </MDBRow>
                    

                    
            {/* <div className='listingdetail__header'>
                <h1 className='listingdetail__title'>{listing.title}</h1>
                <p className='listingdetail__location'>{listing.city}, {listing.state}, {listing.zipcode}</p>
            </div> */}
            
            {/* <div className='intrestsection'>
            {showSuccessMessage && (<div style={{ color: 'green' }}>Interest sent successfully!</div>)}
            {showErrorMessage && (<div style={{ color: 'red' }}>Interest already sent!</div>)}
                onClick={handleDelete}
                onClick={handleUpdate}
            </div> */}
            <div className='intrestsection'>
                <button className='intrestbutton' style={{background:'lightgreen'}} type="button" onClick={handleUpdate}>
                    Update Post
                </button>
                <button className='intrestbutton' style={{background:'orangered'}} type="button" onClick={handleDelete}>
                    Delete Post
                </button>
            </div>
            <div className='row'>
                
                    {/* <div className='listingdetail__displaymain'> */}
                        {/* <img className='listingdetail__displaymain__image' src={listing.photo_main} alt='' /> */}
                    {/* </div> */}
                
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
            {/* <div >
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
            </div> */}
            
            {/* {displayInteriorImages()} */}
            
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
