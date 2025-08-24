import {Router} from 'express'
import {body,query} from 'express-validator'
import {userauthenticate,captionauthenticate} from '../middleware/auth.middleware.js'
import {createRide,getdisttime,confirmride,startride,endride} from '../controller/ride.controller.js'

const rideRoute=Router()
rideRoute.post('/ride', userauthenticate,
    body('pickup').isLength({min:3}).withMessage("Invalid pickUp address"),
    body('destination').isString().isLength({min:3}).withMessage("Invalid destination address"),
    body('vehicleType').isString().isIn(['auto','car','motorcycle']).withMessage("Invalid vehicle Type"),
   createRide)
rideRoute.get('/get-fare',userauthenticate,
         query('startaddress').isLength({min:3}).withMessage('Invalid pickup address'),
         query('endaddress').isLength({min:3}).withMessage('Invalid pickup address'),
         getdisttime)
rideRoute.post('/confirm-ride',captionauthenticate,
         body('rideId').isMongoId().withMessage('Invalid ride id'),
           confirmride
)
rideRoute.get('/start-ride',captionauthenticate,
  query('rideid').isMongoId().withMessage("Invalid ride id  "),
  query('otp').isString().isLength({ min: 6, max: 6 }).withMessage('Invalid OTP'),
  startride
)
rideRoute.post('/end-ride',captionauthenticate,
  body('rideid').isMongoId().withMessage("Invalid ride id"),
  endride
)

export default rideRoute;