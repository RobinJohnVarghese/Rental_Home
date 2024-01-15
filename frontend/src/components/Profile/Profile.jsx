import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useSelector, } from "react-redux";
import axios from 'axios';
import { baseURL,imageBaseUrl } from '../../api/api';
// import default_profile.jpg from frontend/public


function Profile() {
  const user = useSelector((state)=>state.user);
  console.log("+++++ user accessToken",user.accessToken)
  const [editMode, setEditMode] = useState(false);
  // console.log("%%%%%%%%%%%%%%%%%%%%%",editMode)
  const [profile, setProfile] = useState({
    name: user.user.name || "",
    email: user.user.username || "",
    phone: "",
    age: '',
    description: '',
    profilePicture: null,
  });

  useEffect(() => {
    // Fetch user profile data when the component mounts
    const fetchUserProfile = async () => {
      try {
        console.log("###################",)
        const response = await axios.get(
          `${baseURL}accounts/user_profile`, 
          {
            headers: {
              Accept: 'application/json',
              'Content-Type' :'application/json',
              Authorization: `Bearer ${user.accessToken}`, 
            },
          }
        );
        const userProfileData = response.data; 
        console.log("//////////////", response.data);
        setProfile((prevProfile) => ({
          ...prevProfile,
          phone: userProfileData.phone,
          age: userProfileData.age,
          description: userProfileData.description,
          profilePicture: userProfileData.photo,
        }));
      } catch (error) {
        console.error('Error fetching user profile:', error);
        if (error.response) {
          console.error('Response data:', error.response.data);
        }
      }
    };
  
      fetchUserProfile();
    
  }, [ editMode, user.accessToken ]);

  console.log("^^^^^^^^^^^^^^^^^^ profile",profile)

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile({ ...profile, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setProfile({ ...profile, profilePicture: file });
  };

  const handleCancel = () => {
    // Add logic to save the updated profile data
    setEditMode(false);
  };

  const handleUpdate = () => {
    // Add logic to update the profile data
    setEditMode(false);
  };

  const handleDelete = () => {
    // Add logic to delete the profile
    // Display a confirmation dialog before deleting
  };



  return (
    <div id="profile" className="r-wrapper clearfix">
      <div className="paddings innerWidth flexCenter r-container">
        <div className="flexColStart r-head">
          <div className="form-container">
            <div className="profile-card">
              <div className="profile-picture">
                <img
                  src={profile.profilePicture ? `${imageBaseUrl}${profile.profilePicture}` : "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="img-fluid"
                />
              </div>
              <div className="profile-info">
                <h4>{profile.name}</h4>
                <p className="text-muted">{profile.email}</p>
              </div>
            </div>
              <form>
                <label htmlFor="name">Name:</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={profile.name}
                  onChange={handleInputChange}
                />

                <label htmlFor="email">Email:</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={profile.email}
                  onChange={handleInputChange}
                />

                <label htmlFor="phone">Phone:</label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={profile.phone}
                  onChange={handleInputChange}
                />

                <label htmlFor="age">Age:</label>
                <input
                  type="number"
                  id="age"
                  name="age"
                  value={profile.age}
                  onChange={handleInputChange}
                />

                <label htmlFor="description">Description:</label>
                <textarea 
                  id="description"
                  name="description"
                  value={profile.description}
                  onChange={handleInputChange}
                />
                <label htmlFor="profilePicture">Profile Picture:</label>
                <input
                  type="file"
                  id="profilePicture"
                  name="profilePicture"
                  accept="image/*"
                  onChange={handleImageChange}
                />

                <div className="edit-button-container">
                  
                    <button style={{marginRight:"5px"}} type="button" onClick={handleUpdate}>
                      Update
                    </button>
                  
                  <button style={{marginRight:"5px"}} type="button" onClick={handleCancel}>
                    Cancel
                  </button>
                  <button type="button" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </form>
            
          </div>
        </div>
      </div>
    </div>
  );
}

export default Profile;
