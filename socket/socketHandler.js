const users = new Map();
let userCount = 0;
const socketHandler = (io) => {
    io.on("connection", (socket) => {
        userCount++;
        const userId = userCount;
        users.set(userId, socket.id);
        console.log(`User ${userId} connected`);
        socket.emit("welcome", {
            userId,
            message: "Connected Successfully",
        });
        // Event for private message
        socket.on("private_message", ({ userKey, message }) => {
            const targetSocketId = users.get(userKey);
            if (targetSocketId) {
                io.to(targetSocketId).emit("receive_private_message", {
                    from: userId,
                    message,
                });
                socket.emit("message_status", {
                    success: true,
                    message: `Message sent successfuly to user ${userKey}`,
                })
            } else {
                socket.emit("message_status", {
                    success: false,
                    message: `User ${userKey} not found`,
                })
            }
        });
        //Event for group Message
        socket.on("group_message", ({ message }) => {
            socket.broadcast.emit("recive_group_message", {
                from: userId,
                message,
            });
            socket.emit("message_status", {
                success: true,
                message: "Group message sent successfully",
            });
        });
        socket.on("disconnect", () => {
            users.delete(userId);
            console.log(`User ${userId} disconnected`)
        })
    })
}
export default socketHandler;