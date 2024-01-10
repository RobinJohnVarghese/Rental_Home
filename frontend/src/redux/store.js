import {configureStore} from "@reduxjs/toolkit";
import { persistReducer, persistStore } from "redux-persist";
import storage from 'redux-persist/lib/storage';
import adminReducer from "./AdminSlice";
import userReducer from './userSlice';

const persistConfig={
    key:'root',
    storage
}

export const store = configureStore({
    reducer: {
        admin: persistReducer(persistConfig, adminReducer),
        user: persistReducer(persistConfig, userReducer)
    }
});

export const PersistStore = persistStore(store);
