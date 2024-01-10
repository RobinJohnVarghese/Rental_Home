import React, { useState } from 'react';
import  './Sell.css'


const Sell = () => {
  const [formData, setFormData] = useState({
    realtor: '',
    slug: '',
    title: '',
    address: '',
    city: '',
    state: '',
    zipcode: '',
    description: '',
    sale_type: 'For Sale',
    price: '',
    bedrooms: '',
    bathrooms: '',
    home_type: 'House',
    sqft: '',
    open_house: false,
    is_published: true,
    list_date: '',
    // Add other fields as needed
  });

  const handleChange = (e) => {
    const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
    setFormData({
      ...formData,
      [e.target.name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Logic to handle form submission and API request to Django backend
    console.log(formData); // To check the form data before sending it
    // Make an API request to submit formData to Django backend
  };

  return (
    <div className="form-container">
      <h1 className="form-title">Create New Post</h1>
      <form onSubmit={handleSubmit} className="form">
        <label className="form-label">
          Realtor:
          <input
            type="text"
            name="realtor"
            value={formData.realtor}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </label>
        <label className="form-label">
          Slug:
          <input
            type="text"
            name="slug"
            value={formData.slug}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </label>
        <label className="form-label">
          Title:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </label>
        <label className="form-label">
        Address:
          <input
            type="text"
            name="address"
            value={formData.address}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </label>
        <label className="form-label">
         City:
          <input
            type="text"
            name="city"
            value={formData.city}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </label>
        <label className="form-label">
        State:
          <input
            type="text"
            name="state"
            value={formData.state}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </label>
        <label className="form-label">
        Zipcode:
          <input
            type="text"
            name="zipcode"
            value={formData.zipcode}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </label>
        <label className="form-label">
        Description:
          <input
            type="text"
            name="description"
            value={formData.description}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </label>
        <label className="form-label">
        Sale Type:
          <input
            type="text"
            name="sale_type"
            value={formData.sale_type}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </label>
        <label className="form-label"> 
        Price:
          <input
            type="text"
            name="price"
            value={formData.price}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </label>
        <label className="form-label">
          Bedrooms:
          <input
            type="text"
            name="bedrooms"
            value={formData.bedrooms}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </label>
        <label className="form-label">
        Bathrooms:
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </label>
        <label className="form-label">
          Home Type:
          <input
            type="text"
            name="home_type"
            value={formData.home_type}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </label>
        <label className="form-label">
          Sqft:
          <input
            type="text"
            name="sqft"
            value={formData.sqft}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </label>
        <label className="form-label">
          Open House:
          <input
            type="text"
            name="open_house"
            value={formData.open_house}
            onChange={handleChange}
            style={{ marginBottom: '10px', padding: '5px' }}
          />
        </label>
        
        <button type="submit" style={{ padding: '8px 16px', marginTop: '10px' }}>
          Submit
        </button>
      </form>
    </div>
  );
};
export default Sell;
