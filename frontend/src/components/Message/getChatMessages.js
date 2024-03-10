import axios from 'axios';
import { baseURL } from '../../api/api';

const getChatMessages = async (roomId) => {
  try {
    const accessToken = localStorage.getItem('access_token');
    const response = await axios.get(`${baseURL}listings/chat-room/${roomId}/`, {
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
        
      },
    });
    if  (response.status === 200) {
        return response.data;
    } else {
        console.log(response.error)
    }
    console.log(response.data);
  } catch (error) {
    console.error(error);
  }
};

export default getChatMessages;