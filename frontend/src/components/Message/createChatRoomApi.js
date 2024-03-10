import axios from 'axios';
import { baseURL } from '../../api/api';

const createChatRoomApi = async(userId,cuserId) => {
  try {
    let body = {}
    const response = await axios.post(`${baseURL}listings/create-chat-room/${userId}/${cuserId}/`,body,{
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
    });
    if (response.status === 200) {
      return response.data
    } else {
      console.log(response.error);
    }
  } catch (error) {
    console.error(error);
  }
};

export default createChatRoomApi;