import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { RouterProvider,createBrowserRouter } from 'react-router-dom'
import {Provider} from 'react-redux'
import store from './context/store.js'
import App from './App.jsx'
import Starthome from './Pages/Starthome.jsx'
import HomeUser from './Pages/HomeUser.jsx'
import HomeCaption from './Pages/HomeCaption.jsx'
import LoginUser from './Pages/LoginUser.jsx'
import LoginCaption from './Pages/LoginCaption.jsx'
import SignupCaption from './Pages/SignupCaption.jsx'
import SignupUser from './Pages/SignupUser.jsx'
import LogoutUser from './Pages/LogoutUser.jsx'
import Userprotectedwraper from './Pages/Userprotectedwraper.jsx'
import CaptionProtectedwraper from './Pages/Captionprotectedwraper.jsx'
import LogoutCaption from './Pages/LogoutCaption.jsx'
import Riding from './Pages/Riding.jsx'
import TrackRiding from './Pages/TrackRiding.jsx'
const router=createBrowserRouter(
  [
    {
      path:'/',
      element:<App/>,
      children:[
        {
            path:'/',
            element:<Starthome/>
        },{
          path:'/userhome',
          element:(
          <Userprotectedwraper><HomeUser/></Userprotectedwraper>
        )
        },{
          path:'/captionhome',
          element:(
            <CaptionProtectedwraper>
              <HomeCaption/>
            </CaptionProtectedwraper>
          )
        },{
          path:'/captionlogout',
          element:(
            <CaptionProtectedwraper>
              <LogoutCaption/>
            </CaptionProtectedwraper>
          )
        },
        {
          path:'/loginuser',
          element:<LoginUser/>
        },
        {
          path:'/logincaption',
          element:<LoginCaption/>
        },
        {
          path:'/signupuser',
          element:<SignupUser/>
        },
        {
          path:'/signupcaption',
          element:<SignupCaption/>
        },
        {
          path:'/logoutuser',
          element:<LogoutUser/>
        },{
          path:'/riding',
          element:<Riding/>
        },{
          path:'/caption-riding',
          element:<TrackRiding/>
        }
      ]
    }
  ]
)

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Provider store={store}>
   <RouterProvider router={router}/>
   </Provider>
  </StrictMode>,
)
