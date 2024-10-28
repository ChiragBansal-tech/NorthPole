import { configureStore, createReducer } from '@reduxjs/toolkit'
import userReducer from './userSlice'


export const store = configureStore({
    reducer: {
        user: userReducer,
        
    },
});