import { createServer } from "http";
import { Server } from "socket.io";

const httpServer = createServer();

const io = new Server(httpServer, {
    cors: {
        origin: ["http://localhost:3000", "http://localhost:3002", "https://recepti-na-shushanite.web.app/"],
        methods: ["GET", "POST"]
    }
});

let connectedUsers = [];

function connectUser(userId, socketId) {
    if (!connectedUsers.some(user => user.userId === userId)) {
        const newUser = { userId, socketId };
        connectedUsers.push(newUser);
    }
}

function disconnectUser(socketId) {
    connectedUsers = connectedUsers.filter(user => user.socketId !== socketId);
}

function getUser(userId) {
    return connectedUsers.find(user => user.userId === userId);
}

io.on("connection", (socket) => {
    socket.on('newUser', (userId) => {
        connectUser(userId, socket.id);
    });

    socket.on('sendNewMessageNotification', ({ 
        senderName, 
        senderAvatar, 
        senderId, 
        receiverId, 
        sendedOn, 
        locationId,
        locationName, 
        action 
                    }) => {
        
        const receiver = getUser(receiverId);

        if (receiver) {
            const notificationContent = {
                createdAt: sendedOn,
                action,
                isMarkedAsRead: false,
                senderId, 
                senderName, 
                senderAvatar,
                receiverId,
                locationId,
                locationName 
            }

            io.to(receiver.socketId).emit('receiveNotification', notificationContent);
        }
    });

    socket.on('disconnect', () => {
        disconnectUser(socket.id);
    });
});

httpServer.listen(3030);