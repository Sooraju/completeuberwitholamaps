import { useState } from 'react'
import {useDispatch } from 'react-redux'
import {connectSocket} from './context/socket.slice.js'
import {Outlet} from 'react-router-dom'
import './App.css'
import { useEffect } from 'react'

function App() {
   const dispatch=useDispatch();
   useEffect(()=>{
    dispatch(connectSocket());
   },[dispatch]);

  return (
  <>
  <Outlet/>
  </>
  )
}

export default App
