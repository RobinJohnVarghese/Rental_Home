import React, { useState, useEffect } from 'react';
import './MessageDetails.css'
import axios from 'axios';
import { baseURL,imageBaseUrl } from '../../api/api';
import { useSelector, } from "react-redux";
import { Link, useParams,} from 'react-router-dom/'
import moment from 'moment';
import { useNavigate } from 'react-router-dom';


function MessageDetails() {
  const navigate = useNavigate();
  const user = useSelector((state)=>state.user);
  const [messages, setMessages] = useState([])
  const [message, setMessage] = useState([])
  const [users, setUser] = useState([])
  const [profile, setProfile] = useState([])
  let [newMessage, setnewMessage] = useState({message: "",});
  const [ws,setWs]=useState(null)
  // let [newSearch, setnewSearch] = useState({search: "",});

  
  const id = useParams()
  const token = user.accessToken
//   const decoded = jwtDecode(token)
const user_id = user.user.id
const username = user.user.name
//   const history = useHistory()

  useEffect(() => {
    try {
      axios.get(baseURL + 'listings/my-messages/' + user_id + '/').then((res) => {
        setMessages(res.data)
        console.log("$$$$$$$$$$$$$$ res.data or messages",res.data)
      })
    } catch (error) {
      console.log(error);
    }
  }, [user_id])


  // Get all messages for a conversation
  useEffect(() => {
    // let interval = setInterval(() => {
      try {
        axios.get(baseURL + 'listings/get-messages/' + user_id + '/' + id.id + '/').then((res) => {
          setMessage(res.data)
          console.log("message b/w two",res.data);
        })
      } catch (error) {
        console.log(error);
      }
    // }, 1000);
    // return () => {
    //   clearInterval(interval);
    // };
  }, [id, user_id]);

  useEffect(() => {
    const fetchProfile = async () => {
          try {
            await axios.get(baseURL + 'listings/profile/' + id.id + '/').then((res) => {
              setProfile(res.data)
              setUser(res.data.user)
              console.log("$$$$$$$$ profile",profile)
              console.log("$$$$$$$$ setProfile",res.data)
              console.log("$$$$$$$$ user",user)
            })
              
          }catch (error) {
              console.log(error);
            }}
        fetchProfile()
  }, [id])

  
  
  useEffect(() => {
    const socket = new WebSocket('ws://localhost:8000/ws/chat/' + user_id + '/');
    
    socket.onopen = () => {
      console.log('WebSocket connected');
    };
    
    socket.onmessage =  (event) => {
      const messageData = JSON.parse(event.data);
      console.log("message messageData",messageData.message)
      setMessage(prevMessages => [...prevMessages, messageData.message]);
      console.log("message of two 1",message)
    };

    socket.onerror = (error) => {
      console.error('WebSocket error:', error);
    };
  
    socket.onclose = () => {
      console.log('WebSocket disconnected');
    };
  
    
    setWs(socket);

    // Fetch initial messages from the server after WebSocket connection is established
  const fetchInitialMessages = async () => {
    try {
      const response = await axios.get(baseURL + 'listings/get-messages/' + user_id + '/' + id.id + '/');
      setMessage(response.data);
      console.log("Initial message list:", response.data);
    } catch (error) {
      console.error("Error fetching initial message list:", error);
    }
  };

  fetchInitialMessages();
    
    return () => {
      socket.close();
    };
  }, [user_id,id.id]);

 
  // capture changes made by the user in those fields and update the component's state accordingly.
  const handleChange = (event) => {
    setnewMessage({
      ...newMessage,
      [event.target.name]: event.target.value,
    });
  };

//   const handleSendMessage = () => {
//     console.log("newMessage",newMessage,ws)
//     if (ws && newMessage.trim() !== "") {
//       ws.send(JSON.stringify({ message: newMessage }));
//       setnewMessage("");
//     }
//   };


  const SendMessage = async () => {
    const messageData = {
    message: newMessage.message,
    sender_id: user_id,
    receiver_id: id.id
  };

  // Send the message data to the server
  if (ws && newMessage.message.trim() !== "") {
    ws.send(JSON.stringify(messageData));
    // setMessage(prevMessages => [...prevMessages, messageData.message]); // Display sent message immediately
    // console.log("message of two 2",message)

    try {
      // Fetch the updated message list after sending the message
      const response = await axios.get(baseURL + 'listings/get-messages/' + user_id + '/' + id.id + '/');
      setMessage(response.data);
      console.log("Updated message list:", response.data);
    } catch (error) {
      console.error("Error fetching updated message list:", error);
    }
  }

  // Clear the input field after sending the message
  setnewMessage({ message: "" });
};




// const socket = new WebSocket('ws://localhost:8000/ws/chat/' + user_id + '/');

// const SendMessage = () => {
//   const messageData = {
//       message: newMessage.message,
//       sender_id: user_id,
//       receiver_id: id.id
//   };

//   // Send the message data to the server
//   socket.send(JSON.stringify(messageData));

//   // Update the message state to include the new message
//   setMessage(prevMessages => [...prevMessages, messageData]);

//   // Clear the input field after sending the message
//   setnewMessage({ message: "" });
// };

// useEffect(() => {
//   // Listen for messages from the WebSocket server
//   socket.onmessage = (event) => {
//       const messageData = JSON.parse(event.data);
//       console.log("####### messageData",messageData)
//       // setMessage((prevMessages)=>[...prevMessages,message.message])
//       // Handle the received message data (e.g., update state)
//   };

//   // Cleanup function
//   setWs(socket)
//   return () => {
//       socket.close(); // Close the WebSocket connection when the component unmounts
//   };
// }, []);


// useEffect(() => {
//   let messageListener;
//   if (ws) {
//     messageListener = (event) => {
//       const message = JSON.parse(event.data);
//       setMessage((prevMessages) => [...prevMessages, message]);
//     };
//     ws.addEventListener('message', messageListener);
//   }
//   return () => {
//     if (ws) {
//       ws.removeEventListener('message', messageListener);
//     }
//   };
//   }, [ws]);

  // Send Message
  // const SendMessage = () => {
  //   const formdata = new FormData()
  //   formdata.append("sender", user_id)
  //   formdata.append("reciever", id.id)
  //   formdata.append("message", newMessage.message)
    

  // const websocketProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
  // // const wsURL = ${websocketProtocol}${window.location.host}/ws/notification/?token=${accessToken};
  // const wsURL = 'ws://localhost:8000/ws/chat/' + user_id + '/'
  // // const wsURL = `wss://classiquecurl.shop/ws/salon-notification/${user.id}/`
  // const socket = new WebSocket(wsURL);
  // // console.log("wsURL",wsURL);

  // socket.onopen = () => {
  //   console.log("WebSocket connection established");
  //   console.log("socket",socket);
  // };
  // setWs(socket);
  // socket.onmessage = (event) => {
  //   const data = JSON.parse(event.data);
  //   console.log("Datteeyyy: ",data);
  //   console.log("data.payload: ",data.payload);
  //   console.log("Datteeyyy: ",data);

  //   if (data.type === "chat") {
  //     console.log("Chat is : ", data.type)
  //     console.log('*****', data)
  //     // Update the notification state with the new chat
  //     setMessage((prevNotifications) => [
  //       ...prevNotifications,
  //       data.payload,
  //     ]);
  //     console.log("Array.isArray(data.payload) = ",Array.isArray(data.payload));
  //     // setNotifications(data.payload);
  //   } else if (data.type === "logout") {
  //     // dispatch(logout());
  //     navigate("/");
  //   }
    
  //   socket.onclose = (event) => {
  //     console.log("WebSocket connection closed", event);
  //   };
    
  //   return () => {
  //     socket.close();
  //   };

  // };

  //   // try {
  //   //     axios.post(baseURL + 'listings/send-messages/', formdata).then((res) => {
  //   //       document.getElementById("text-input").value = "";
  //   //       setnewMessage(newMessage = "")
  //   //     })
  //   // } catch (error) {
  //   //     console.log("error ===", error);
  //   // }

  // }

 

  return (
    <div>
      <main className="content" >
        <div className="container p-0">
        <div style={{display:"flex", justifyContent:"space-between"}}>
          <h1 className="h3 mb-3">Messages</h1>
          
          <div className="py-2 px-4 border-bottom d-none d-lg-block">
                  <div className="d-flex align-items-center py-1">
                    <div className="position-relative">
                      <img
                        src={profile.photo}
                        // src="https://bootdey.com/img/Content/avatar/avatar3.png"
                        className="rounded-circle mr-1"
                        alt="Profile Pic"
                        width={40}
                        height={40}
                      />
                    </div>
                    {/* <div className="flex-grow-1 pl-3 pr-3">
                      <strong>{profile.name}</strong>
                      <div className="text-muted small">
                        <em>{profile.email}</em>
                      </div>
                    </div> */}
                    <div className="flex-grow-1 pl-3 pr-3">
                      <strong>{profile && profile.name}</strong>
                      <div className="text-muted small">
                        <em>{profile && profile.email}</em>
                      </div>
                    </div>
                    <div>
                      <button className="btn btn-primary btn-lg mr-1 px-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-phone feather-lg"
                        >
                          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                        </svg>
                      </button>
                      <button className="btn btn-info btn-lg mr-1 px-3 d-none d-md-inline-block">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-video feather-lg"
                        >
                          <polygon points="23 7 16 12 23 17 23 7" />
                          <rect x={1} y={5} width={15} height={14} rx={2} ry={2} />
                        </svg>
                      </button>
                      <button className="btn btn-light border btn-lg px-3">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width={24}
                          height={24}
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={2}
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          className="feather feather-more-horizontal feather-lg"
                        >
                          <circle cx={12} cy={12} r={1} />
                          <circle cx={19} cy={12} r={1} />
                          <circle cx={5} cy={12} r={1} />
                        </svg>
                      </button>
                    </div>
                  </div>
                </div>
          </div>
          <div className="card">
            <div className="row g-0" style={{width:"100%"}}>
              <div className="col-12 col-lg-5 col-xl-3 border-right">
                <div className="px-4 ">
                  <div className="d-flfex align-itemfs-center">
                  </div>
                </div>
                {messages.map((messages) =>
                  <Link 
                    to={"/messagedetails/" + (messages.sender === user_id ? message.reciever : message.sender) + "/"}
                    href="#"
                    className="list-group-item list-group-item-action border-0"
                  >
                    <small><div className="badge bg-success float-right text-white">{moment.utc(message.date).local().startOf('seconds').fromNow()}</div></small>
                    <div className="d-flex align-items-start">
                    {messages.sender !== user_id && messages.sender_profile?.photo && (
                    <img src={messages.sender_profile.photo} className="rounded-circle mr-1" alt="1" width={40} height={40}/>
                    )}
                    {messages.sender === user_id && messages.reciever_profile?.photo && (
                    <img src={messages.reciever_profile.photo} className="rounded-circle mr-1" alt="2" width={40} height={40}/>
                    )}
                      <div className="flex-grow-1 ml-3">
                          {messages.sender === user_id && 
                            // (message.reciever_profile.name !== null ? message.reciever_profile.name : message.reciever.name)
                            (messages.reciever_profile && messages.reciever_profile.name !== null ? messages.reciever_profile.name : messages.reciever && messages.reciever.name)
                          }

                          {messages.sender !== user_id && 
                            (messages.sender_profile && messages.sender_profile.name) 
                          }
                       
                        <div className="small">
                           <small>{messages.message}</small>
                        </div>
                      </div>
                    </div>
                    </Link>
                )}

                
                <hr className="d-block d-lg-none mt-1 mb-0" />
              </div>
              <div className="col-12 col-lg-7 col-xl-9">
                <div className="position-relative">
                  <div className="chat-messages p-4 ">
                    {message.map((message, index) => 
                    <>
                        {message.sender !== user_id && message.sender_profile && ( 
                          <div className="chat-message-left pb-4" key={index}>
                            <div style={{paddingRight:"5px"}}>
                              <img src={message.sender_profile.photo} className="rounded-circle mr-1" alt="Chris Wood" style={{objectFit:"cover"}} width={40} height={40}/>
                              <br />
                              <div className="text-muted small text-nowrap mt-2">{moment.utc(message.date).local().startOf('seconds').fromNow()}</div>
                            </div>
                            <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                            <div className="font-weight-bold mb-1">{message.sender_profile.name}</div>
                              {message.message}
                            </div>
                          </div>
                        )}
                        {message.sender === user_id &&  message.sender_profile && (
                          <div className="chat-message-right pb-4" key={index}>
                            <div style={{paddingLeft:"5px"}}>
                              <img  src={message.sender_profile.photo.startsWith('http') ? message.sender_profile.photo : imageBaseUrl + message.sender_profile.photo} 
 
                              className="rounded-circle mr-1" alt="{message.reciever_profile.name}" style={{objectFit:"cover"}} width={40} height={40}/>
                               <br />
                              <div className="text-muted small text-nowrap mt-2">{moment.utc(message.date).local().startOf('seconds').fromNow()}</div>
                            </div>
                            <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                              <div className="font-weight-bold mb-1">You</div>
                              {message.message}
                            </div>
                          </div>
                        )}
                    </>
                    )}

                  </div>
                </div>
                <div className="flex-grow-0 py-3 px-4 border-top">
                  <div className="input-group" >
                    <input
                      type="text"
                      className="form-control"
                      placeholder="Type your message"
                      value={newMessage.message} 
                      name="message" 
                      id='text-input'
                      onChange={handleChange}
                    />
                    <button onClick={SendMessage} className="btn btn-primary">Send</button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}

export default MessageDetails;