export const sendWelcome = (socket, userId) => {
  socket.emit("welcome", {
    success: true,
    userId,
    message: "Connected Successfully",
  });
};

export const sendPrivateMessage = (socket, success, message) => {
  socket.emit("message_status", {
    success,
    message,
  });
};
export const sendGroupMessageStatus = (socket) => {
  socket.emit("group_message_status", {
    success: true,
    message: "Group message sent successfully",
  });
};
export const sendGroupJoin = (socket, groupId) => {
  socket.emit("group_joined", {
    success: true,
    groupId,
    message: `Joined ${groupId}`,
  });
};
export const sendLeaveGroup = (socket, groupId) => {
  socket.emit("group_left", {
    success: true,
    groupId,
    message: `Left ${groupId}`,
  });
};
