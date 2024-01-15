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
    photo_main: null,
    photo_1: null,photo_2: null,photo_3: null,photo_4: null,photo_5: null,photo_6: null,photo_7: null,photo_8: null,photo_9: null,photo_10: null,
    photo_11: null,photo_12: null,photo_13: null,photo_14: null,photo_15: null,photo_16: null,photo_17: null,photo_18: null,photo_19: null,photo_20: null,
    is_published: true,
    list_date: new Date().toISOString(),
    // Add other fields as needed
  });
  console.log(formData)

  // const handleChange = (e) => {
  //   const value = e.target.type === 'checkbox' ? e.target.checked : e.target.value;
  //   setFormData({
  //     ...formData,
  //     [e.target.name]: value,
  //   });
  // };

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  //   // Logic to handle form submission and API request to Django backend
  //   console.log(formData); // To check the form data before sending it
  //   // Make an API request to submit formData to Django backend
  // };
  const handleChange = (e) => {
    const { name, value, type, checked, files } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      [name]: type === 'checkbox' ? checked : type === 'file' ? files[0] : value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send data to the server
    console.log(formData);
  };

  return (
    <div id="sell" className="r-wrapper clearfix">
      <div className="paddings innerWidth flexCenter r-container">
        <div className="flexColStart r-head">
              <div className="form-container">
                <h1 className="form-title">Create New Post</h1>
                <form onSubmit={handleSubmit} className="form">
                  <label className="form-label">
                    Realtor:
                    <input className="form-input" type="text" name="realtor" value={formData.realtor} onChange={handleChange}/>
                  </label>
                  <label className="form-label">
                    Slug:
                    <input className="form-input" type="text" name="slug" value={formData.slug} onChange={handleChange}/>
                  </label>
                  <label className="form-label">
                    Title:
                    <input className="form-input" type="text" name="title" value={formData.title} onChange={handleChange}/>
                  </label>
                  <label className="form-label">
                  Address:
                    <input className="form-input" type="text" name="address"  value={formData.address} onChange={handleChange}/>
                  </label>
                  <label className="form-label">
                  City:
                    <input className="form-input" type="text" name="city" value={formData.city} onChange={handleChange}/>
                  </label>
                  <label className="form-label">
                  State:
                    <input className="form-input" type="text" name="state" value={formData.state} onChange={handleChange}/>
                  </label>
                  <label className="form-label">
                  Zipcode:
                    <input className="form-input" type="text" name="zipcode" value={formData.zipcode} onChange={handleChange}/>
                  </label>
                  <label className="form-label">
                  Description:
                    <textarea className="form-textarea" type="text" name="description"value={formData.description} onChange={handleChange}/>
                  </label>
                  <label className="form-label">
                  Sale Type:
                    <input className="form-input" type="text" name="sale_type" value={formData.sale_type} onChange={handleChange}/>
                  </label>
                  <label className="form-label"> 
                  Price:
                    <input className="form-input" type="text" name="price" value={formData.price} onChange={handleChange}/>
                  </label>
                  <label className="form-label">
                    Bedrooms:
                    <input className="form-input" type="text" name="bedrooms" value={formData.bedrooms} onChange={handleChange}/>
                  </label>
                  <label className="form-label">
                  Bathrooms:
                    <input className="form-input" type="text" name="bathrooms" value={formData.bathrooms} onChange={handleChange}/>
                  </label>
                  <label className="form-label">
                    Home Type:
                    <input className="form-input" type="text" name="home_type" value={formData.home_type} onChange={handleChange}/>
                  </label>
                  <label className="form-label">
                    Sqft:
                    <input className="form-input" type="text" name="sqft" value={formData.sqft} onChange={handleChange}/>
                  </label>
                  <label className="form-label">
                    Open House:
                    <input className="form-input" type="text" name="open_house" value={formData.open_house} onChange={handleChange}/>
                  </label>
                  <label className="form-label">
                  Photo Main:
                  <input className="form-input" type="file" name="photo_main" value={formData.photo_main} onChange={handleChange} />
                </label>
                <label className="form-label">
                  Photo 1:
                  <input className="form-input" type="file" name="photo_1" value={formData.photo_1} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 2:
                  <input className="form-input" type="file" name="photo_2" value={formData.photo_2} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 3:
                  <input className="form-input" type="file" name="photo_3" value={formData.photo_3} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 4:
                  <input className="form-input" type="file" name="photo_4" value={formData.photo_4} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 5:
                  <input className="form-input" type="file" name="photo_5" value={formData.photo_5} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 6:
                  <input className="form-input" type="file" name="photo_6" value={formData.photo_6} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 7:
                  <input className="form-input" type="file" name="photo_7" value={formData.photo_7} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 8:
                  <input className="form-input" type="file" name="photo_8" value={formData.photo_8} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 9:
                  <input className="form-input" type="file" name="photo_9" value={formData.photo_9} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 10:
                  <input className="form-input" type="file" name="photo_10" value={formData.photo_10} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 11:
                  <input className="form-input" type="file" name="photo_11" value={formData.photo_11} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 12:
                  <input className="form-input" type="file" name="photo_12" value={formData.photo_12} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 13:
                  <input className="form-input" type="file" name="photo_13" value={formData.photo_13} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 14:
                  <input className="form-input" type="file" name="photo_14" value={formData.photo_14} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 15:
                  <input className="form-input" type="file" name="photo_15" value={formData.photo_15} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 16:
                  <input className="form-input" type="file" name="photo_16" value={formData.photo_16} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 17:
                  <input className="form-input" type="file" name="photo_17" value={formData.photo_17} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 18:
                  <input className="form-input" type="file" name="photo_18" value={formData.photo_18} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 19:
                  <input className="form-input" type="file" name="photo_19" value={formData.photo_19} onChange={handleChange} />
                </label >
                <label className="form-label">
                  Photo 20:
                  <input className="form-input" type="file" name="photo_20" value={formData.photo_20} onChange={handleChange} />
                </label >
                  
                  <button className='form-submit' type="submit">
                    Submit
                  </button>
                </form>
            </div>
        </div>
      </div>
    </div>
  );
};
export default Sell;
