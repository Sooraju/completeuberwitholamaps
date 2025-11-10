import { validationResult } from "express-validator";
import { createrideservice, getFare, confirmrideservice, startrideservice, endrideservice } from '../services/rides.service.js'
import { getcaptionintheradiusfromaddress } from '../services/maps.service.js'
import { sendMessageToSocketId } from '../socket.js'
import ridemodel from "../Model/ride.model.js";


const createRide = async (req, res, next) => {
    const error = validationResult(req)
    console.log(error);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array(), message: "please give all the fields properly" })
    }
    const { pickup, destination, vehicleType } = req.body;
    try {
        const ride = await createrideservice({ user: req.user._id, pickup, destination, vehicleType })
        console.log(ride)
        const captions = await getcaptionintheradiusfromaddress(pickup, 400);
        const ridewithuser = await ridemodel.findOne({ _id: ride._id }).populate("user")
        captions.forEach((caption) => {
            sendMessageToSocketId(caption.socketId, {
                event: 'new-ride',
                data: ridewithuser
            })
        })
        console.log("THe Caption are ", captions, "the ride ", ride);
        res.status(200).json(ride)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
const getdisttime = async (req, res, next) => {
    const error = validationResult(req)
    console.log(error);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array(), message: "please give all the fields properly" })
    }
    const { startaddress, endaddress } = req.query;
    try {
        const ride = await getFare(startaddress, endaddress);
        res.status(200).json(ride)
    } catch (err) {
        res.status(400).json({ message: err.message })
    }
}
const confirmride = async (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({ error: error.array(), message: "please give all the fields properly" })
    }
    const { rideId, captionid } = req.body;
    console.log("The ride  body ", req.body, "The ride id ", rideId)
    try {
        const ride = await confirmrideservice(rideId, captionid);
        console.log("The ride is the ride in conferm controller ", ride)
        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-confirmed",
            data: ride
        })
        return res.status(200).json(ride)
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}
const startride = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ err: err.array(), message: "Please give all the fields properly" })
    }
    const { rideid, otp } = req.query;
    try {
        const ride = await startrideservice({ rideid, otp, caption: req.caption });
        console.log("the ride in side start ri de is "+ride);
        sendMessageToSocketId(ride.user.socketId, {
            event: "ride-start",
            data: ride
        })
        return res.status(200).json(ride)
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}
const endride = async (req, res, next) => {
    const err = validationResult(req);
    if (!err.isEmpty()) {
        return res.status(400).json({ err: err.array(), message: "Please give all the fields properly" })
    }
    try {
        const { rideid } = req.body;
        const ride = await endrideservice({ rideid: rideid, caption: req.caption })
        sendMessageToSocketId(ride.user.socketId, {
            event: 'ride-end', // Corrected event name to match client
            data: ride
        })
        return res.status(200).json(ride)
    } catch (error) {
        return res.status(500).send({ message: error.message })
    }
}
export { createRide, getdisttime, confirmride, startride, endride };