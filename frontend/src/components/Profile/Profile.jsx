import React, { useState, useEffect } from 'react';
import './Profile.css';
import { useSelector, } from "react-redux";
import axios from 'axios';
import { baseURL,imageBaseUrl } from '../../api/api';
import Cookies from 'js-cookie';
import {
  MDBContainer,
  MDBCard,
  MDBCardBody,
} from 'mdb-react-ui-kit';




function Profile() {
  const user = useSelector((state)=>state.user);
  console.log("+++++ user ",user.user)
  const [editMode, setEditMode] = useState(false);
  // console.log("%%%%%%%%%%%%%%%%%%%%%",editMode)
  const [successMessage, setSuccessMessage] = useState('');
  const [profile, setProfile] = useState({
    name: user.user.name || "",
    email: user.user.username || "",
    phone: "",
    age: '',
    description: '',
    profilePicture: "null",
  });
  const [selectedFileName, setSelectedFileName] = useState('');
  const [selectedFile,setSelectedFile] =useState(null)

  useEffect(() => {
    // Fetch user profile data when the component mounts
    const fetchUserProfile = async () => {
      try {
        // console.log("###################",)
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
        // console.log("//////////////", response.data);
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
  // console.log("^^^^^^^^^^^^^^^^^^ user",user)

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value,
    }));
  };
  
  // const handleImageChange = (event) => {
  //   const { name, files } = event.target;
  //   setProfile((prevProfile) => ({
  //     ...prevProfile,
  //     [name]: files[0],  // Assuming a single file is expected
  //   }));
  // };

  const handleFileChange = (event) => {
    const formData = new FormData();
    formData.append('photo', selectedFile);
    console.log('Selected file:', selectedFile);

    const file = event.target.files[0];
    console.log('Selected event.target.files[0]:',event.target.files[0]);
    // Update selected file
    setSelectedFile(file);

    // Update selected file name
    setSelectedFileName(file ? file.name : '');

    // Now you can do something with the selected file, like saving it to local storage
    console.log('Selected file:',file);
    
};
  


  const handleUpdate = async () => {
    try {
      console.log("************* Entered to try ***********************")
      
      const formData = new FormData();
      formData.append('name', profile.name);
      formData.append('email', profile.email);
      formData.append('phone', profile.phone || '');
      formData.append('age', profile.age || '');
      formData.append('description', profile.description || '');
  
      if (selectedFile) {
        formData.append('photo', selectedFile, selectedFile.name);
      }
      
      // Make the API request
      const response = await axios.put(`${baseURL}accounts/user_profile`,formData, 
      {
        headers: {
          Accept: 'application/json',
          'Content-Type' :'multipart/form-data',
          Authorization: `Bearer ${user.accessToken}`, 
        },
      }
    );
    console.log("EWEWEWEFWEWEWEWEWE profile picture",formData)
  
      console.log('Profile updated successfully:', response.data);
      setSuccessMessage('Profile updated successfully');

      // Clear the success message after a few seconds (adjust as needed)
      setTimeout(() => {
        setSuccessMessage('');
      }, 3000); // Clear the message after 3 seconds
  
      // Exit edit mode
      setEditMode(false);
    } catch (error) {
      console.error('Error updating profile:', error);
      if (error.response) {
        console.error('Response data:', error.response.data);
      }
    }
  };
  

  const handleDelete = async () => {
    // Display a confirmation dialog before deleting (optional)
    const confirmDelete = window.confirm('Are you sure you want to delete your profile?');
  
    if (confirmDelete) {
      try {
        // Make an API request to delete the user profile
        const response = await axios.delete(`${baseURL}accounts/user_profile`, {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${user.accessToken}`,
          },
        });
  
        console.log('Profile deleted successfully:', response.data);
  
        // Clear user data from local storage or wherever it is stored
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        Cookies.remove('accessToken');
        // Navigate to the sign-in page (assuming your sign-in page route is '/signin')
        window.location.href = '/signup';
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
        <div className="p-5 bg-image"style={{backgroundImage:'url(https://mdbootstrap.com/img/new/textures/full/175.jpg)',height: '1200px', 
                      backgroundSize: 'cover', 
                      backgroundRepeat: 'no-repeat' }}>
            <div style={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '100vh',
                    }}>
    <MDBCard className=' mx-5 mb-5  p-5 shadow-5 w-50'style={{background: 'hsla(0, 0%, 100%, 0.8)',backdropFilter: 'blur(30px)',height: "1000px",}}>
    <MDBCardBody className='p-5 text-center'>


    <div id="profile" className="r-wrapper clearfix">
      <div className="paddings innerWidth flexCenter r-containers">
        {/* <div className="flexColStart r-head"> */}
          <div className="form-container">
            <div className="profile-card">
              <div className="profile-picture">
                
                <img
                  src={selectedFile
                    ? URL.createObjectURL(selectedFile)
                    : profile.profilePicture
                    ? `${imageBaseUrl}${profile.profilePicture}`
                    : "https://via.placeholder.com/150"}
                  alt="Profile"
                  className="img-fluid"
                />
              </div>
              <div className="profile-info">
                <h4>{profile.name}</h4>
                <p className="text-muted">{profile.email}</p>
              </div>
            </div>
            {successMessage && <div className="success-message">{successMessage}</div>}
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
                  onChange={handleFileChange}
                />
                {selectedFileName && (<p>Selected File: {selectedFileName}</p>)}
                

                <div className="edit-button-container">
                  
                    <button style={{marginRight:"5px",transition: "background-color 0.3s"}} type="button" onClick={handleUpdate}>
                      Update
                    </button>
                  <button style={{backgroundColor: "red",transition: "background-color 0.3s"}}type="button" onClick={handleDelete}>
                    Delete
                  </button>
                </div>
              </form>
            
          </div>
        {/* </div> */}
      </div>
    </div>

    </MDBCardBody>
        </MDBCard>
        </div>
        </div>
    </MDBContainer>
  );
}

export default Profile;
