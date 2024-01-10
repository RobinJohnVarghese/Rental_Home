// import {createSlice} from "@reduxjs/toolkit";

// const accessToken = 'accessToken';
// const refreshToken = 'refreshToken';

// const initialState = {
//     currentUser: null,
// }


// const userSlice = createSlice({
//     name: 'user',
    
//     initialState,
//     reducers: {
//         loginUser: (state, action) => {
//             state.currentUser = action.payload.user;
//         },
//         logoutUser: (state) =>{
//             state.currentUser = null;
//             localStorage.removeItem(accessToken);
//             localStorage.removeItem(refreshToken)
//         },
//         updateUser: (state, action)=> {
//             const {name, username, password, profilePicture} = action.payload;
//             state.currentUser.name = name;
//             state.currentUser.username = username;
//             state.currentUser.password = password;
//             state.currentUser.profilePicture = profilePicture;
//         }
//     },
//     // extraReducers: {
//     //     ['users/editUser']: (state, action) => {
//     //         const {id, name, username, profilePicture} = action.payload;
//     //         if (state.currentUser.id === id) {
//     //             state.currentUser.name = name;
//     //             state.currentUser.username = username;
//     //             state.currentUser.profilePicture = profilePicture;
//     //         } 
//     //     }
//     // }
// })

// export default userSlice.reducer;
// export const {loginUser, logoutUser, updateUser} = userSlice.actions;


import { createSlice } from '@reduxjs/toolkit';
import Cookies from 'js-cookie';

const initialState = {
  user: null,
  accessToken: null,
  isAuthenticated: false,
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setAccessToken(state, action) {
      state.accessToken = action.payload.access;
      Cookies.set('accessToken', action.payload.access);
    },
    setUser(state, action) {
      state.user = action.payload;
      state.isAuthenticated = !!action.payload;
    },
    clearAuth(state) {
      state.user = null;
      state.accessToken = null;
      state.isAuthenticated = false;
    },
  },
});

export const { setAccessToken, setUser, clearAuth } = userSlice.actions;
export default userSlice.reducer;
