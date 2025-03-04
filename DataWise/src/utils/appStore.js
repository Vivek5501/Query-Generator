import { configureStore } from "@reduxjs/toolkit";
import useReducer from './userSlice.js';

const appStore = configureStore({
    reducer: {
        user: useReducer,
    },
});

export default appStore; 