import dotenv from 'dotenv'
dotenv.config({
     path:"./src/.env"
}
)
import express from 'express'
import cors from 'cors'
import cookieparser from "cookie-parser"
import captionrout from './route/caption.route.js'
import maproute from './route/maps.router.js'
import rideRoute from './route/ride.route.js'
const app=express()
app.use(
    cors(
        {
            origin: process.env.CORS_ORIGIN, // This will be 'http://localhost:3000'
            credentials: true,               // Allow cookies to be sent
            methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE'], // Recommended to specify methods
            optionsSuccessStatus: 204        // For preflight requests
        }
    )
)
// app.use(cors());

app.use(express.json())
app.use(express.urlencoded({extended:true,limit:"16kb"}))
app.use(cookieparser())
app.get('/',(req,res)=>{
   res.send("Hi")
})

import {userRouter}  from './route/user.route.js'
app.use('/api/v1/users',userRouter)  
app.use('/api/v1/caption',captionrout)  
app.use('/api/v1/maps',maproute)  
app.use('/api/v1/riderout',rideRoute)  
export default app;