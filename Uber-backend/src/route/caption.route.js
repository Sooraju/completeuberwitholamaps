import {Router} from 'express'
import {body} from 'express-validator'
import {captionauthenticate} from '../middleware/auth.middleware.js'

import {captionregistercontroller,captionlogincontroller,userprofile,captionlogout} from '../controller/caption.controller.js'
const captionrout=Router()
captionrout.post('/register',[
    body("fullname.firstname").isLength({min:3}).withMessage("lenght of firstm name should be greater than 3"),
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("lenght of pasword should be greater than 6"),
    body("vehicle.color").isLength({min:3}).withMessage("lenght of color should be greater than 3"),
    body("vehicle.plate").isLength({min:5}).withMessage("Lenght of number plate must be greater than 6"),
    body("vehicle.capacity").isInt({min:1}).withMessage("cpacity must be at list one"),
    body("vehicle.type").isIn([ 'car', 'motorcycle', 'auto' ]).withMessage('Invalid vehicle type')
],captionregistercontroller)
captionrout.post('/login',[
    body("email").isEmail().withMessage("Invalid Email"),
    body("password").isLength({min:6}).withMessage("Length of password should be greater than 6")
],captionlogincontroller)
captionrout.get('/profile',captionauthenticate,userprofile)
captionrout.get('/logout',captionauthenticate,captionlogout)
export default captionrout;
