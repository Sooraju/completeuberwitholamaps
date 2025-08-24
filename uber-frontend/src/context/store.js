import {configureStore} from '@reduxjs/toolkit'
import  authSlice  from './auth.slice'
import captionAuthSlice from './caption.auth.slice'
import socketSlice from './socket.slice.js'
const store=configureStore({
    reducer:{
        authservice:authSlice,
        captionAuth:captionAuthSlice,
        socketSlice:socketSlice,
    }
})

export default store