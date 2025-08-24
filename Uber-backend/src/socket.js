import  {Server} from 'socket.io';
import userModel from './Model/user.model.js';
import captionModel from './Model/caption.model.js'

let io;

function initializeSocket(server) {
    io = new Server(server, {
        cors: {
            origin: '*',
            methods: [ 'GET', 'POST' ]
        }
    });
    io.on('connection', (socket) => {
        console.log(`Client connected: ${socket.id}`);
    socket.on('join', async (data) => {
            const { userId, userType } = data;
            console.log("this is the join ")
            console.log("The User Id is "+userId+"the user type is  "+userType);
            if (userType === 'user'){
                await userModel.findByIdAndUpdate(userId, { socketId: socket.id });
            } else if (userType === 'captain'){
                await captionModel.findByIdAndUpdate(userId, { socketId: socket.id });
            }
        });
    socket.on('update-location-captain', async (data) => {
            const { userId, location } = data;
            console.log("the up dated location The user Id  is "+userId+"The location is "+location);
            console.log("  updated ")
            if (!location || !location.ltd || !location.lng) {
                return socket.emit('error', { message: 'Invalid location data' });
            }
            
            const updated=await captionModel.findByIdAndUpdate(userId, {
                location: {
                    type:'Point',
                    coordinates:[location.lng,location.ltd]
                }
            });
            console.log("the updated ",updated)
        });

    socket.on('disconnect', () => {
            console.log(`Client disconnected: ${socket.id}`);
        });
    });
}

const sendMessageToSocketId = (socketId, messageObject) => {
    console.log("Inside senfMessageSocketId  the socket id  "+socketId);
    if (io) {
        io.to(socketId).emit(messageObject.event,messageObject.data);
    } else {
        console.log('Socket.io not initialized.');
    }
}

export { initializeSocket, sendMessageToSocketId };