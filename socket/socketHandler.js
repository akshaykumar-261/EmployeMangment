import jwt from "jsonwebtoken";
const users = new Map();
const socketHandler = (io) => {
  //io.use socket.io ka built in function auth middlewera chaeck karna ka liya
  io.use((socket, next) => {
    try {
       //socket.handshake -> connection ka time ka data 
      // auth.token -> token milta hai login user ka
      const token = socket.handshake.auth.token;
      if (!token) {
        // new Error java script ka built in error object
        return next(new Error("Token required"));
      }
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      socket.user = {
        // login user ki id save than use that id i every event
        id: decoded.id,
      };

      next();
    } catch (error) {
      next(new Error("Invalid Token"));
    }
  });

  io.on("connection", (socket) => {
    //io.on() built-in event listener hai.
    const userId = socket.user.id;

    users.set(userId, socket.id);

    console.log(`User ${userId} connected`);

    socket.emit("welcome", {
      //built-in function hai.Yeh sirf current connected user ko event bhejta hai.
      success: true,
      userId,
      message: "Connected Successfully",
    });

    socket.on("private_message", ({ receiverId, message }) => {
      const targetSocketId = users.get(receiverId);

      if (targetSocketId) {
        io.to(targetSocketId).emit("receive_private_message", {
          from: userId,
          message,
        });

        socket.emit("message_status", {
          success: true,
          message: "Message sent successfully",
        });
      } else {
        socket.emit("message_status", {
          success: false,
          message: "Receiver is offline",
        });
      }
    });
    // group message
    socket.on("group_message", ({ groupId, message }) => {
      io.to(groupId).emit("receive_group_message", {
        groupId,
        from: userId,
        message,
      });
      socket.emit("group_message_status", {
        success: true,
        message: "Group message sent successfully",
      });
    });
    socket.on("join_group", ({ groupId }) => {
      socket.join(groupId);

      console.log(`User ${userId} joined ${groupId}`);

      socket.emit("group_joined", {
        success: true,
        groupId,
        message: `Joined ${groupId}`,
      });
    });
    socket.on("leave_group", ({ groupId }) => {
      socket.leave(groupId);

      console.log(`User ${userId} left ${groupId}`);

      socket.emit("group_left", {
        success: true,
        groupId,
        message: `Left ${groupId}`,
      });
    });

    socket.on("disconnect", () => {
      users.delete(userId);
      console.log(`User ${userId} disconnected`);
    });
  });
};

export default socketHandler;
