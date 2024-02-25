import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../api/api';
import { useSelector, } from "react-redux";
import  './Sell.css'
import {useNavigate} from 'react-router-dom'
import {
  MDBBtn,
  MDBContainer,
  MDBCard,
  MDBCardBody,
  MDBCol,
  MDBRow,
  MDBInput,
  MDBTextArea,
  

} from 'mdb-react-ui-kit';




const Sell = () => {
  const user = useSelector((state)=>state.user);
  console.log("################ User",user.user.id)
  // const navigator = useNavigate();
  const [successMessage, setSuccessMessage] = useState('');
  const [slugError, setSlugError] = useState('');
  const [titleError, setTitleError] = useState('');
  const [addressError, setAddressError] = useState('');
  const [cityError, setCityError] = useState('');
  const [stateError, setStateError] = useState('');
  const [zipcodeError, setZipcodeError] = useState('');
  const [priceError, setPriceError] = useState('');
  const [bedroomsError, setBedroomsError] = useState('');
  const [bathroomsError, setBathroomsError] = useState('');
  const [sqftError, setSqftError] = useState('');
  const [photomainError, setPhotomainError] = useState('');
  const [formData, setFormData] = useState({
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
  console.log('formData',formData)

  
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleFileChange = (event) => {
    const fieldName = event.target.name;
    const file = event.target.files[0];

    setFormData({
      ...formData,
      [fieldName]: file,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    try {
      // Validation for slug
    if (!formData.slug || formData.slug.trim() === '' || formData.slug.length > 25) {
      setSlugError('Slug is required and should be less than 25 characters', 'error');
      return;
      }

    if (!formData.title || formData.title.trim() === '' || formData.title.length > 25) {
      setTitleError('Title is required and should be less than 25 characters', 'error');
      return;
      }
    
    if (!formData.address || formData.address.trim() === '' || formData.address.length > 25) {
      setAddressError('Address is required and should be less than 25 characters', 'error');
      return;
      }

    if (!formData.city || formData.city.trim() === '' || formData.city.length > 25) {
      setCityError('city is required and should be less than 25 characters', 'error');
      return;
      }

    if (!formData.state || formData.state.trim() === '' || formData.state.length > 25) {
      setStateError('state is required and should be less than 25 characters', 'error');
      return;
      }

    if (!formData.zipcode || formData.zipcode.trim() === '' || !/^\d{1,7}$/.test(formData.zipcode)) {
      setZipcodeError("Zipcode is required and should contain only numbers with a maximum length of 7 digits");
      return;
    }

    if (!formData.price || formData.price.trim() === '' || !/^\d{1,8}$/.test(formData.price)) {
      setPriceError("price is required and should contain only numbers with a maximum length of 8 digits");
      return;
      }

    if (!formData.bedrooms || formData.bedrooms.trim() === '') {
      setBedroomsError("Bedrooms is required");
      return;
    }
    const bedrooms = parseInt(formData.bedrooms);
    if (isNaN(bedrooms) || bedrooms >= 10) {
      setBedroomsError("Bedrooms should be a valid integer less than 10");
      return;
    }

    if (!formData.bathrooms || formData.bathrooms.trim() === '') {
      setBathroomsError("Bathrooms is required");
      return;
    }
    const bathrooms = parseInt(formData.bathrooms);
    if (isNaN(bathrooms) || bathrooms >= 10) {
      setBathroomsError("Bathrooms should be a valid integer less than 10");
      return;
    }

    if (!formData.sqft || formData.sqft.trim() === '' || !/^\d{1,5}$/.test(formData.sqft)) {
      setSqftError('bathrooms is required and should contain only numbers with a maximum length of 5 digits');
      return;
      }

    if (!formData.photo_main ) {
      setPhotomainError('photo main is required');
      return;
      }

      // Validate that all required fields are filled
      // if (!formData.title || !formData.address || !formData.slug || !formData.city || !formData.state 
      //   || !formData.zipcode || !formData.bedrooms || !formData.bathrooms || !formData.photo_main  ) {
      //   // setEmptyError("Please fill in all required fields");
      //   console.error("Please fill in all required fields");
      //   return;
      // }
  
      // Create a FormData object to send the data including files
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        // Append all form fields to the FormData object
        formDataToSend.append(key, formData[key]);
      });
      console.log("&&&&&&&&&&&&& form Data",formDataToSend)
      // Make a POST request to your backend API
      const response = await axios.post(`${baseURL}listings/create_listing/`,formDataToSend, {
        
        headers: {
          Accept: 'application/json',
          // body: formDataToSend,
          'Content-Type' :'multipart/form-data',
          Authorization: `Bearer ${user.accessToken}`, 
          // 'Authorization': `Bearer ${user.accessToken}`,
          // 'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.status === 201) {
        console.log('Form data sent successfully');
        // Show success message for 5 seconds
      setSuccessMessage('Form data sent successfully');
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000);

      // Clear all form fields
      setFormData({realtor_id: '',slug: '',title: '',address: '',city: '',
        state: '',zipcode: '',description: '',sale_type: 'For Rent',price: '',
        bedrooms: '',bathrooms: '',home_type: 'House',sqft: '',open_house: false,
        photo_main: null,photo_1: "",photo_2: "",photo_3: "",photo_4: "",
        photo_5: "",is_published: true,list_date: new Date().toISOString(),});

      // Redirect to the "residencies" page
      setTimeout(() => {
        window.location.href = '/residencies';
      }, 3000);
            // navigator('/residencies');
          } else {
            console.error('Error sending form data to the backend');
          }
    } catch (error) {
      console.error('An error occurred during form submission:', error);
    }
  };
  

  return (

    <MDBContainer fluid style={{padding:"0"}}>
        <div className="p-5 bg-image"style={{backgroundImage:'url(https://mdbootstrap.com/img/new/textures/full/171.jpg)',height: '1500px', 
                      backgroundSize: 'cover', 
                      backgroundRepeat: 'no-repeat' }}>
            <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                    }}>
            <MDBCard className=' mx-5 mb-5  p-5 shadow-5 w-75'style={{background: 'hsla(0, 0%, 100%, 0.8)',backdropFilter: 'blur(30px)',height: "fit-content",}}>
            {/* <form onSubmit={handleSubmit}> */}
                <MDBCardBody className='p-5 text-center'>
                    <h2 className='fw-bold mb-5'>Create New Post</h2>
                    {successMessage && (<div className="alert alert-success" role="alert">{successMessage}</div>)}
                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Realtor'
                              name='realtor_id'
                              type='text'
                              value={`${user.user.id} - ${user.user.name}`}
                              onChange={handleChange}
                              readOnly
                            />
                        </MDBCol>

                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Slug'
                              name='slug'
                              type='text'
                              value={formData.slug}
                              onChange={handleChange}
                            />
                          {slugError && <p className={'error-message'}>{slugError}</p>}

                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Title'
                              name='title'
                              type='text'
                              value={formData.title}
                              onChange={handleChange}
                            />
                            {titleError && <p className={'error-message'}>{titleError}</p>}
                        </MDBCol>

                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Address'
                              name='address'
                              type='text'
                              value={formData.address}
                              onChange={handleChange}
                            />
                          {addressError && <p className={'error-message'}>{addressError}</p>}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='City'
                              name='city'
                              type='text'
                              value={formData.city}
                              onChange={handleChange}
                            />
                            {cityError && <p className={'error-message'}>{cityError}</p>}
                        </MDBCol>

                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='State'
                              name='state'
                              type='text'
                              value={formData.state}
                              onChange={handleChange}
                            />
                            {stateError && <p className={'error-message'}>{stateError}</p>}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Zipcode'
                              name='zipcode'
                              type='text'
                              value={formData.zipcode}
                              onChange={handleChange}
                            />
                            {zipcodeError && <p className={'error-message'}>{zipcodeError}</p>}
                        </MDBCol>

                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Price'
                              name='price'
                              type='text'
                              value={formData.price}
                              onChange={handleChange}
                            />
                            {priceError && <p className={'error-message'}>{priceError}</p>}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Bedrooms'
                              name='bedrooms'
                              type='text'
                              value={formData.bedrooms}
                              onChange={handleChange}
                            />
                            {bedroomsError && <p className={'error-message'}>{bedroomsError}</p>}
                        </MDBCol>

                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Bathrooms'
                              name='bathrooms'
                              type='text'
                              value={formData.bathrooms}
                              onChange={handleChange}
                            />
                            {bathroomsError && <p className={'error-message'}>{bathroomsError}</p>}
                        </MDBCol>
                    </MDBRow>

                    <MDBRow>
                        <MDBCol col='6'>
                            <MDBInput
                              wrapperClass='mb-4'
                              label='Sqft'
                              name='sqft'
                              type='text'
                              value={formData.sqft}
                              onChange={handleChange}
                            />
                            {sqftError && <p className={'error-message'}>{sqftError}</p>}
                        </MDBCol>

                        <MDBCol col='6'>
                            <div class="form-outline mb-4">
                                <select className="form-control" name="sale_type" value={formData.sale_type} onChange={handleChange}>
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
                                    <select className="form-control" name="home_type" value={formData.home_type} onChange={handleChange}>
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
                                    <select className="form-control" name="open_house" value={formData.open_house} onChange={handleChange}>
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
                          <MDBInput
                            wrapperClass='mb-4'
                            label='Cover Photo'
                            name='photo_main'
                            type='file'
                            accept='image/*'
                            onChange={handleFileChange}
                          />
                          {photomainError && <p className={'error-message'}>{photomainError}</p>}
                        </MDBCol>

                        <MDBCol col='6'>
                          <MDBInput
                            wrapperClass='mb-4'
                            label='Photo 1'
                            name='photo_1'
                            type='file'
                            accept='image/*'
                            onChange={handleFileChange}
                            />
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
                            onChange={handleFileChange}
                          />
                        </MDBCol>

                        <MDBCol col='6'>
                          <MDBInput
                            wrapperClass='mb-4'
                            label='Photo 3'
                            name='photo_3'
                            type='file'
                            accept='image/*'
                            onChange={handleFileChange}
                            />
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
                            onChange={handleFileChange}
                          />
                        </MDBCol>

                        <MDBCol col='6'>
                          <MDBInput
                            wrapperClass='mb-4'
                            label='Photo 5'
                            name='photo_5'
                            type='file'
                            accept='image/*'
                            onChange={handleFileChange}
                            />
                        </MDBCol>
                    </MDBRow>
                    <MDBRow>
                        <MDBCol col='6'>
                          <MDBTextArea
                            wrapperClass='mb-4'
                            label='Description'
                            name='description'
                            type='text'
                            value={formData.description}
                            onChange={handleChange}
                          />
                        </MDBCol>
                    </MDBRow>
                  {successMessage && (<div className="alert alert-success" role="alert">{successMessage}</div>)}
                    <MDBBtn
                      className='w-100 mb-4'
                      style={{marginTop:"15px"}}
                      size='md'
                      type='submit'
                      onClick={handleSubmit}
                    >
                      Register
                    </MDBBtn>
{/* 
                  <div className="form-group-description">
                  <button className="form-submit" type="submit">
                    Submit
                  </button>
                  </div> */}

                </MDBCardBody>
                {/* </form> */}
            </MDBCard>
            </div>
        </div>
    </MDBContainer>

  );
};
export default Sell;
