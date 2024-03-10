import React from 'react'
import './Message.css'
import { useState, useEffect } from 'react'
import axios from 'axios';
import { baseURL } from '../../api/api';
import { useSelector, } from "react-redux";
import { Link} from 'react-router-dom';
import createChatRoomApi from './createChatRoomApi';
import getChatMessages from './getChatMessages';

function Message() {
  const user = useSelector((state)=>state.user);
  const [profile, setProfile] = useState([])
  const [anotheruserprofile, setanotheruserProfile] = useState([])
  const [messages, setMessages] = useState([]);
  const [profileList, setProfileList] = useState([]);
  const [ws, setWs] = useState(null);
  const [inputMessage, setInputMessage] = useState("");
  const [bg, setBg] = useState(false);
  const [selectedProfile, setSelectedProfile] = useState(null);
  // Get Userdata from decoded token
  const user_id = user.user.id

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${baseURL}listings/AllUserInterestsView`,
        {headers: {
          Authorization: `Bearer ${user.accessToken}`, 
        },}
        );
        setProfileList(response.data);
      } catch (error) {
        console.error('Error fetching notifications:', error);
      }
    };

    fetchData();
  }, [user.accessToken]);


  useEffect(() => {
    const fetchProfile = async () => {
          try {
            await axios.get(baseURL + 'listings/profile/' + user_id + '/').then((res) => {
              setProfile(res.data)
            })
          }catch (error) {
              console.log(error);
            }}
        fetchProfile()
  }, [])



  useEffect(() => {
    let messageListener;
    if (ws) {
      messageListener = (event) => {
        const message = JSON.parse(event.data);
        setMessages((prevMessages) => [...prevMessages, message]);
      };
      ws.addEventListener('message', messageListener);
    }
    return () => {
      if (ws) {
        ws.removeEventListener('message', messageListener);
      }
    };
  }, [ws]);
 
  const handleSendMessage = () => {
    if (ws && inputMessage.trim() !== "") {
      ws.send(JSON.stringify({ message: inputMessage,sender: user.user.username}));
      setInputMessage("");
    }
  };

  const joinChatroom = async (userId, cUserId) => {
    try {
      const data = await createChatRoomApi(userId, cUserId);
      const accessToken = localStorage.getItem("access_token");
      const websocketProtocol = window.location.protocol === "https:" ? "wss://" : "ws://";
      const wsUrl = `wss://rhbackend.robinjohnnvarghese.online/ws/chat/${data.id}/`
      const newChatWs = new WebSocket(wsUrl);
      setBg(true);

      newChatWs.onopen = async () => {
        console.log("Chatroom WebSocket connection opened.");
        // Fetch previous messages when the WebSocket connection is opened
        const previousMessages = await getChatMessages(data.id);
        setMessages(previousMessages);
        // await messageSeenApi(userId);
       
      };
      newChatWs.onclose = () => {
        console.log("Chatroom WebSocket connection closed.");
        // You can perform any necessary cleanup here when the WebSocket connection is closed.
      };
      newChatWs.onmessage = (event) => {
        const message = JSON.parse(event.data);
        console.log(message.message);
        // Handle incoming messages from the chatroom WebSocket
      };

      setWs(newChatWs);
    } catch (error) {
      console.error(error);
    }
    
      const fetchProfile = async () => {
            try {
              await axios.get(baseURL + 'listings/profile/' + userId + '/').then((res) => {
                setanotheruserProfile(res.data)
              })
                
            }catch (error) {
                console.log(error);
              }}
          fetchProfile()
    
    setSelectedProfile(userId)
  };

return (
  <div>
    <main className="content" >
      <div className="container p-0">
        <div style={{display:"flex", justifyContent:"space-between"}}>
        <h1 className="h3 mb-3">Messages</h1>
        <div className="py-2 px-4 border-bottom d-none d-lg-block">
          {bg?(
                <div className="d-flex align-items-center py-1">
                  <div className="position-relative">
                    <img
                      // src="https://bootdey.com/img/Content/avatar/avatar3.png"
                      src={anotheruserprofile.photo}
                      className="rounded-circle mr-1"
                      alt="Profile pic"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div className="flex-grow-1 pl-3" style={{paddingRight:"10px"}}>
                    <strong>{anotheruserprofile.name}</strong>
                    <div className="text-muted small">
                      <em>{anotheruserprofile.email}</em>
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
              ):null}
              </div>
        </div>
        <div className="card">
          <div className="row g-0" style={{width:"100%"}}>
            <div className="col-12 col-lg-5 col-xl-3 border-right">
            <div className="px-4 ">
                <div className="d-flfex align-itemfs-center">

                </div>
              </div>
              {profileList.map((prof) =>
                <Link  href="#" className="list-group-item list-group-item-action border-0" >
                      <small><div className="badge bg-success float-right text-white"></div></small>
                      <div className="d-flex align-items-start" onClick={() => joinChatroom(prof.id, user.user.id)}>

                        {prof.photo?
                        (<img src={prof.photo} className="rounded-circle mr-1" alt="1" width={40} height={40}/>)  :
                        (<img src="https://bootdey.com/img/Content/avatar/avatar1.png" className="rounded-circle mr-1" alt="1" width={40} height={40}/>)
                        }
                        <div className="flex-grow-1 ml-3">
                          {prof.name}
                            <div className="small">
                              <small></small>
                            </div>
                          </div>
                      </div>
                </Link>
              )}
              
              <hr className="d-block d-lg-none mt-1 mb-0" />
            </div>


            <div className="col-12 col-lg-7 col-xl-9">
            {bg ? (
            
              <div className="position-relative">
                <div className="chat-messages p-4">


                {messages.map((message, index) =>
              message.sender_email === user.user.username?
                  (
                    
                  <div className="chat-message-right pb-4">
                    <div>
                      <img
                        // src="https://bootdey.com/img/Content/avatar/avatar1.png"
                        src={profile.photo}
                        className="rounded-circle mr-1"
                        alt="Chris Wood"
                        width={40}
                        height={40}
                      />
                      
                    </div>
                        <div>
                    <div className="flex-shrink-1 bg-light rounded py-2 px-3 mr-3">
                      <div className="font-weight-bold mb-1">You</div>
                      {message.content}
                    </div>
                    <div className="text-muted small text-nowrap mt-2">
                        {message.created}
                        </div>
                        </div>
                  </div>
                  )
                  :
                  <div className="chat-message-left pb-4">
                    <div>

                      <img
                        // src="https://bootdey.com/img/Content/avatar/avatar3.png" 
                        src ={anotheruserprofile.photo}
                        className="rounded-circle mr-1"
                        alt="{message.sender_email}"
                        width={40}
                        height={40}
                      />
                    
                    </div>
                    <div>
                    <div className="flex-shrink-1 bg-light rounded py-2 px-3 ml-3">
                      <div className="font-weight-bold mb-1">{anotheruserprofile.name }</div>
                      {message.content}
                    </div>
                    <div className="text-muted small text-nowrap mt-2">
                        {message.created}
                        </div>
                      </div>
                  </div>
                  )
                  }

                  
                </div>
              </div>
            ):null}
          {bg?(
              <div className="flex-grow-0 py-3 px-4 border-top">
                <div className="input-group">
                      <input
                        type="text"
                        className="form-control"
                        placeholder="Type your message"
                        value={inputMessage}
                        onChange={(e) => setInputMessage(e.target.value)}
                      />

                  <button onClick={handleSendMessage} className="btn btn-primary">Send</button>
                </div>
              </div>
          ):null}
            </div>


          </div>
        </div>
      </div>
    </main>
  </div>
)
}

export default Message