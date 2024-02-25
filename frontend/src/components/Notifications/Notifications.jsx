// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { baseURL } from '../../api/api';
// import { useSelector, } from "react-redux";
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';


// function Notifications() {
//   const navigate = useNavigate();
//   const [notifications, setNotifications] = useState([]);
//   const user = useSelector((state)=>state.user);

//   console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%notifications",notifications)
//   console.log("$$$$$$$$$$$$$$$lenth notifications",notifications.length)
//   console.log("%%%%%%%%%%%%%%%%%%%%%%%%%%user",user)
//   // useEffect(() => {
//   //   const fetchData = async () => {
//   //     try {
//   //       const response = await axios.get(`${baseURL}listings/UserInterestsView`,
//   //       {headers: {
//   //         Authorization: `Bearer ${user.accessToken}`, 
//   //       },}
//   //       );
//   //       setNotifications(response.data);
        
//   //     } catch (error) {
//   //       console.error('Error fetching notifications:', error);
//   //     }
//   //   };

//   //   fetchData();
//   // }, [user.accessToken]);

//   useEffect(() => {
    
//       const accessToken = localStorage.getItem("access_token");
//       const websocketProtocol =
//         window.location.protocol === "https:" ? "wss://" : "ws://";
//       // const wsURL = ${websocketProtocol}${window.location.host}/ws/notification/?token=${accessToken};
//       const wsURL = `ws://localhost:8000/ws/listings/UserInterestsView`
//       const socket = new WebSocket(wsURL);
//       console.log(wsURL);
  
//       socket.onopen = () => {
//         console.log("WebSocket connection established");
//       };
  
//       socket.onmessage = (event) => {
//         const data = JSON.parse(event.data);
//         // console.log(data)
  
//         if (data.type === "notification") {
//           // console.log("Notification is : ", data.type)
//           // Update the notification state with the new notification
//           setNotifications((prevNotifications) => [
//             ...prevNotifications,
//             data.payload,
//           ]);
//           toast.info(`New Notification: ${data.payload.message}`);
//         }
//         //  else if (data.type === "logout") {
//         //   dispatch(logout());
//         //   navigate("/");
//         // }
//         console.log("DATA : : : : : : : ", data)
//         console.log("NOTIFICATION LIST : ", notifications);
  
//       };
  
//       socket.onclose = (event) => {
//         console.log("WebSocket connection closed", event);
//       };
//       return () => {
//         socket.close();
//       };
    
//   }, []);




//   const handleRead = async (notificationId, is_seen,intrested_post_slug) => {
    
//     console.log('notification Id',notificationId,user.accessToken)
//     try {
//       // Make an API request to mark the notification as read
//       const response = await axios.post(`${baseURL}listings/mark-notification-as-seen/${notificationId}/`,
//       {headers: {
//         'Content-Type': 'application/json',
//         Authorization: `Bearer ${user.accessToken}`, 
//       },
//       });
      
//       console.log('is_seen  updated successfully:', response.data);
//       const updatedResponse = await axios.get(`${baseURL}listings/UserInterestsView`, {
//         headers: {
//           Authorization: `Bearer ${user.accessToken}`,
//         },
//       });
  
//       // Update the notifications state with the new data
//       setNotifications(updatedResponse.data);
//       navigate(`/residencies/detail/${intrested_post_slug}`);
//     } catch (error) {
//       console.error('Error marking notification as read:', error);
//       // Handle any errors
//     }
//   };
  
//   return (
//     <div>
//       <div style={{display:'flex'}}>
//       <h2>Notifications</h2>
//         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
//           <span class="navbar-toggler-icon"></span>
//         </button>
//         <h3>count:{notifications.length}</h3>
//         </div>
//       <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px' }}>
//     <tbody>
//       {notifications.map((notification,i) => (
//         <tr key={i} style={{ borderBottom: '1px solid #dee2e6' }}>
//           <td style={{ padding: '10px' }}><strong>{notification.fromuser_name}</strong> sent an Interest for the  <strong>{notification.intrested_post_title}</strong> post this is your Slug <strong>{notification.intrested_post_slug}</strong></td>
//           {/* <td style={{ padding: '10px' }}>{notification.fromuser_email}</td> */}
//           {/* <td style={{ padding: '10px' }}>{notification.intrested_post_title}</td> */}
//           {/* --{notification.id}--{i} */}
//           <td style={{ padding: '10px' }}>
//               {notification.is_seen ? (
//                 null // If message is seen, don't render the button
//               ) : (
//                 <button
//                   onClick={() => handleRead(notification.id, notification.is_seen,notification.intrested_post_slug)}
//                   style={{
//                     borderRadius: '5px',
//                     padding: '6px 12px',
//                     backgroundColor: notification.is_seen ? '#28a745' : '#dc3545',
//                     color: '#fff',
//                     border: 'none',
//                     cursor: 'pointer',
//                   }}
//                 >
//                   {user.is_seen ? '' : 'View'}
                  
//                 </button>
//               )}
//             </td>
//         </tr>
//       ))}
//     </tbody>
//   </table>
//     </div>
//   );
// }

// export default Notifications




import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { baseURL } from '../../api/api';
import { useSelector,useDispatch } from "react-redux";
import { useNavigate } from 'react-router-dom';




function Notifications() {
  const navigate = useNavigate();
  const [notifications, setNotifications] = useState([]);
  const user = useSelector((state)=>state.user);
  const dispatch = useDispatch();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}listings/UserInterestsView`,
        {headers: {
          Authorization: `Bearer ${user.accessToken}`, 
        },}
        );
        console.log("Notifications Onload : ", response.data)
        console.log("Notifications Onload : ", response.data.length)
        setNotifications(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchData();
  }, [user.accessToken]);

/////////////////////////////////////////////////////////////////////////
useEffect(() => {
  if (user) {
    const accessToken = localStorage.getItem("access_token");
    const websocketProtocol =
      window.location.protocol === "https:" ? "wss://" : "ws://";
    // const wsURL = ${websocketProtocol}${window.location.host}/ws/notification/?token=${accessToken};
    const wsURL = `ws://localhost:8000/ws/notification/${user.user.id}/`
    // const wsURL = `wss://classiquecurl.shop/ws/salon-notification/${user.id}/`
    const socket = new WebSocket(wsURL);
    console.log(wsURL);

    socket.onopen = () => {
      console.log("WebSocket connection established");
    };

    socket.onmessage = (event) => {
      const data = JSON.parse(event.data);
      console.log("Datteeyyy: ",data);
      console.log("data.payload: ",data.payload);
      console.log("Datteeyyy: ",data);

      if (data.type === "notification") {
        console.log("Notification is : ", data.type)
        console.log('*****', data)
        // Update the notification state with the new notification
        setNotifications((prevNotifications) => [
          ...prevNotifications,
          data.payload,
        ]);
        console.log("Array.isArray(data.payload) = ",Array.isArray(data.payload));
        // setNotifications(data.payload);
      } else if (data.type === "logout") {
        // dispatch(logout());
        navigate("/");
      }


    };

    socket.onclose = (event) => {
      console.log("WebSocket connection closed", event);
    };
    return () => {
      socket.close();
    };
  }
}, [user, dispatch, navigate]);
/////////////////////////////////////////////////////////////////////////






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
       <div style={{display:'flex',paddingLeft:'10px'}}>
       <h2>Notifications</h2>
         <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
           <span class="navbar-toggler-icon"></span>
         </button>
         {notifications.length > 0 && (
            <h3>count: {notifications.length}</h3>
          )}
         </div>
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