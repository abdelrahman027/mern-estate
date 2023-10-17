/* eslint-disable no-unused-vars */
import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import userReducer from './user/userSlice.js';
import storage from 'redux-persist/lib/storage'
import { persistReducer, persistStore } from "redux-persist";

const rootReducer = combineReducers({ user: userReducer });
const persistConfig = {
    key: 'root',
    storage,
    version: 1,
};

const persistedUser = persistReducer(persistConfig, rootReducer)


export const store = configureStore({
    reducer: persistedUser,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware({
        serializableCheck: false,
    }),
});

export const persistor = persistStore(store)