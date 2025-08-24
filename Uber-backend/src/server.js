import http from 'http'
import connectdb from './db/index.js'
import app from './app.js'
import { initializeSocket } from './socket.js';
const port = process.env.PORT || 3000;
connectdb().then(()=>{
        const server = http.createServer(app);
        initializeSocket(server);
        server.listen(port, () => {
                console.log(`Server is running on port ${port}`);
        });
}).catch(e=>{
    console.log("Database connecteion error ",e);
})
