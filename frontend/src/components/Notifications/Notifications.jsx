import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../api/api';
import { useSelector, } from "react-redux";
import { useNavigate } from 'react-router-dom';



function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const user = useSelector((state)=>state.user);

  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%notifications",notifications)
  console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%user",user)
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}listings/UserInterestsView`,
        {headers: {
          Authorization: `Bearer ${user.accessToken}`, 
        },}
        );
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchData();
  }, [user.accessToken]);

  const handleRead = async (notificationId, is_seen,intrested_post_slug) => {
    
    console.log('notification Id',notificationId,user.accessToken)
    try {
      // Make an API request to mark the notification as read
      const response = await axios.post(`${baseURL}listings/mark-notification-as-seen/${notificationId}/`,
      {headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${user.accessToken}`, 
      },
      });
      
      console.log('is_seen  updated successfully:', response.data);
      const updatedResponse = await axios.get(`${baseURL}listings/UserInterestsView`, {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      });
  
      // Update the notifications state with the new data
      setNotifications(updatedResponse.data);
      navigate(`/residencies/detail/${intrested_post_slug}`);
    } catch (error) {
      console.error('Error marking notification as read:', error);
      // Handle any errors
    }
  };
  
  return (
    <div>
      <h2>Notifications</h2>
      <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
    <tbody>
      {notifications.map((notification,i) => (
        <tr key={i} style={{ borderBottom: '1px solid #dee2e6' }}>
          <td style={{ padding: '10px' }}><strong>{notification.fromuser_name}</strong> sent an Interest for the  <strong>{notification.intrested_post_title}</strong> post this is your Slug <strong>{notification.intrested_post_slug}</strong></td>
          {/* <td style={{ padding: '10px' }}>{notification.fromuser_email}</td> */}
          {/* <td style={{ padding: '10px' }}>{notification.intrested_post_title}</td> */}
          {/* --{notification.id}--{i} */}
          <td style={{ padding: '10px' }}>
              {notification.is_seen ? (
                null // If message is seen, don't render the button
              ) : (
                <button
                  onClick={() => handleRead(notification.id, notification.is_seen,notification.intrested_post_slug)}
                  style={{
                    borderRadius: '5px',
                    padding: '6px 12px',
                    backgroundColor: notification.is_seen ? '#28a745' : '#dc3545',
                    color: '#fff',
                    border: 'none',
                    cursor: 'pointer',
                  }}
                >
                  {user.is_seen ? '' : 'View'}
                  
                </button>
              )}
            </td>
        </tr>
      ))}
    </tbody>
  </table>
    </div>
  );
}

export default Notifications