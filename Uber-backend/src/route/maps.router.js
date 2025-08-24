import { Router  } from "express";
import {userauthenticate} from '../middleware/auth.middleware.js'
import {mapslatlongcontroller,mapsdisttimecontroller,mapslocsuggestioncontroller} from '../controller/maps.controller.js'
const maproute=Router();
maproute.get('/get-lat-long',userauthenticate,mapslatlongcontroller)
maproute.get('/get-dist-time',userauthenticate,mapsdisttimecontroller)
maproute.get('/get-loc-suggestion',userauthenticate,mapslocsuggestioncontroller)
export default maproute;