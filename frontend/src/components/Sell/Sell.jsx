import React, { useState } from 'react';
import axios from 'axios';
import { baseURL } from '../../api/api';
import { useSelector, } from "react-redux";
import  './Sell.css'


const Sell = () => {
  const user = useSelector((state)=>state.user);
  console.log("################ User",user.user.id)
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
  console.log(formData)

  
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
      // Validate that all required fields are filled
      if (!formData.title || !formData.address ) {
        console.error("Please fill in all required fields");
        return;
      }
  
      // Create a FormData object to send the data including files
      const formDataToSend = new FormData();
      Object.keys(formData).forEach((key) => {
        // Append all form fields to the FormData object
        formDataToSend.append(key, formData[key]);
      });
      console.log("&&&&&&&&&&&&& form Data",formDataToSend)
      // Make a POST request to your backend API
      const response = axios.post(`${baseURL}listings/create_listing/`,formDataToSend, {
        
        headers: {
          Accept: 'application/json',
          // body: formDataToSend,
          'Content-Type' :'multipart/form-data',
          Authorization: `Bearer ${user.accessToken}`, 
          // 'Authorization': `Bearer ${user.accessToken}`,
          // 'Content-Type': 'multipart/form-data',
        },
      });
  
      if (response.ok) {
        console.log('Form data sent successfully');
      } else {
        console.error('Error sending form data to the backend');
      }
    } catch (error) {
      console.error('An error occurred during form submission:', error);
    }
  };
  

  return (
    
    <div className="form-containerouter">
      <div className="form-containerinner">
        <h1 className="form-title">Create New Post</h1>
        <form onSubmit={handleSubmit} className="form">
          <div className="form-group-1main">
              <div className="form-group1">
                  <label className="form-label">Realtor:</label>
                  <input className="form-input" type="text" name="realtor_id" value={user.user.id} onChange={handleChange} readOnly/>
              </div>
              <div className="form-group2">
                  <label className="form-label">Slug:</label>
                  <input className="form-input" type="text" name="slug" value={formData.slug} onChange={handleChange} />
              </div>
          </div>
          <div className="form-group-1main">
                <div className="form-group1">
                    <label className="form-label">Title:</label>
                    <input className="form-input" type="text" name="title" value={formData.title} onChange={handleChange} />
                </div>
                <div className="form-group2">
                    <label className="form-label">Address:</label>
                    <input className="form-input" type="text" name="address" value={formData.address} onChange={handleChange} />
                </div>
          </div>
          <div className="form-group-1main">
                <div className="form-group1">
                  <label className="form-label">City:</label>
                  <input className="form-input" type="text" name="city" value={formData.city} onChange={handleChange} />
                </div>
                <div className="form-group2">
                  <label className="form-label">State:</label>
                  <input className="form-input" type="text" name="state" value={formData.state} onChange={handleChange} />
                </div>
          </div>
          <div className="form-group-1main">
                <div className="form-group1">
                  <label className="form-label">Zipcode:</label>
                  <input className="form-input" type="text" name="zipcode" value={formData.zipcode} onChange={handleChange} />
                </div>
                <div className="form-group2">
                  <label className="form-label">Price:</label>
                  <input className="form-input" type="text" name="price" value={formData.price} onChange={handleChange} />
                </div>
          </div>
          <div className="form-group-1main">
                <div className="form-group1">
                    <label className="form-label">Bedrooms:</label>
                    <input className="form-input" type="text" name="bedrooms" value={formData.bedrooms} onChange={handleChange} />
                </div>
                <div className="form-group2">
                    <label className="form-label">Bathrooms:</label>
                    <input className="form-input" type="text" name="bathrooms" value={formData.bathrooms} onChange={handleChange} />
                </div>
          </div>
          <div className="form-group-1main">
                <div className="form-group1">
                    <label className="form-label">Sqft:</label>
                    <input className="form-input" type="text" name="sqft" value={formData.sqft} onChange={handleChange} />
                </div>
                {/* <div className="form-group2">
                    <label className="form-label">Sale Type:</label>
                    <select className="form-input" type="text" name="sale_type" value={formData.sale_type} onChange={handleChange} >
                        <option value="For Rent">For Rent</option>
                        <option value="For Sale">For Sale</option>
                    </select>
                </div> */}
          </div>
          <div className="form-group-1main">
                <div className="form-group2">
                    <label className="form-label">Sale Type:</label>
                    <select className="form-input" type="text" name="sale_type" value={formData.sale_type} onChange={handleChange} >
                        <option value="For Rent">For Rent</option>
                        <option value="For Sale">For Sale</option>
                    </select>
                </div>
                <div className="form-group1">
                    <label className="form-label"> Home Type:</label>
                    <select className="form-input" type="text" name="home_type" value={formData.home_type} onChange={handleChange} >
                        <option value="House">House</option>
                        <option value="Condo">Condo</option>
                        <option value="Townhouse">Townhouse</option>
                    </select>
                </div>
                <div className="form-group2">
                    <label className="form-label"> Open House:</label>
                    <select className="form-input" type="text" name="open_house" value={formData.open_house} onChange={handleChange} >
                        <option value={false}>False</option>
                        <option value={true}>True</option>
                    </select>
                </div>
          </div>
          <div className="form-group-1main">
                <div className="form-group1">
                    <label className="form-label">Cover Photo:</label>
                    <input className="form-input" type="file" name="photo_main"  onChange={handleFileChange} />
                </div>
                <div className="form-group2">
                      <label className="form-label">Photo 1:</label>
                      <input className="form-input" type="file" name="photo_1"  onChange={handleFileChange} />
                </div>
                <div className="form-group1">
                      <label className="form-label">Photo 2:</label>
                      <input className="form-input" type="file" name="photo_2"  onChange={handleFileChange} />
                </div>
          </div>
          <div className="form-group-1main">
                <div className="form-group2">
                      <label className="form-label">Photo 3:</label>
                      <input className="form-input" type="file" name="photo_3"  onChange={handleFileChange} />
                </div>
                <div className="form-group1">
                      <label className="form-label">Photo 4:</label>
                      <input className="form-input" type="file" name="photo_4"  onChange={handleFileChange} />
                </div>
                <div className="form-group2">
                      <label className="form-label">Photo 5:</label>
                      <input className="form-input" type="file" name="photo_5"  onChange={handleFileChange} />
                </div>
          </div>
          {/* <div className="form-group-1main">
                
          </div> */}
          <div className="form-group-description">
            <label className="form-label-description">Description:</label>
            <textarea className="form-textarea-description" type="text" name="description" value={formData.description} onChange={handleChange} />
          </div>
          <div className="form-group-description">
          <button className="form-submit" type="submit">
            Submit
          </button>
          </div>
        </form>
      </div>
    </div>
  );
};
export default Sell;
