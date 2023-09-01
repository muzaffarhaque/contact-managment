import {configureStore} from '@reduxjs/toolkit';
import ContactSlice from './ContactSlice';
const store=configureStore({
    reducer:{
        contactDetails:ContactSlice,
    }
})
export default store;