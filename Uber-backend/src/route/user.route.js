import {Router} from 'express'
import {body} from 'express-validator'
import {userauthenticate} from '../middleware/auth.middleware.js'
import {registerusercontroller,loginusercontroller,profilecontroller,logoutcontroller} from '../controller/user.controller.js'
const userRouter=Router()
userRouter.post('/register',[
    body("fullname.firstname").isLength({min:3}).withMessage("length of first name should be greater than 3"),
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:6}).withMessage("length of passowrd must be greater than 2")
],registerusercontroller);
userRouter.post('/login',[
    body("email").isEmail().withMessage("Invalid email"),
    body("password").isLength({min:4}).withMessage("length of passowrd must be greater than 2")
],loginusercontroller)
userRouter.get('/profile',userauthenticate,profilecontroller)
userRouter.get('/logout',userauthenticate,logoutcontroller)


export {userRouter}