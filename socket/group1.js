import { io } from "socket.io-client";

const socket = io("http://localhost:8081", {
  auth: {
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDVlNGJhYTdiMGNkZTZkOGU3MDYxYSIsImVtYWlsIjoicm9oaXQudmVybWEyQGV4YW1wbGUuY29tIiwicm9sZSI6IjY5ZDM4NzEwY2E2MjY3MTEyODA0ZjQzOSIsImlhdCI6MTc3NjMzMjk0NywiZXhwIjoxNzc2MzM2NTQ3fQ.f3ogARMML9espz5kjbnKetx0NDYJpq8Mq06RBSFlvCg",
  },
});

socket.on("connect", () => {
  console.log("User Connected");
});

socket.on("welcome", (data) => {
  console.log("Welcome:", data);
});

// group join response
socket.on("group_joined", (data) => {
  console.log("Group Joined:", data);
});

// group leave response
socket.on("group_left", (data) => {
  console.log("Group Left:", data);
});

// receive group message
socket.on("receive_group_message", (data) => {
  console.log("Group Message:", data);
});

// group message status
socket.on("group_message_status", (data) => {
  console.log("Group Status:", data);
});

// join group after 2 sec
setTimeout(() => {
  socket.emit("join_group", {
    groupId: "group123",
  });
}, 2000);

// send message in group after 5 sec
setTimeout(() => {
  socket.emit("group_message", {
    groupId: "group123",
    message: "Hello Everyone",
  });
}, 5000);

// leave group after 10 sec
setTimeout(() => {
  socket.emit("leave_group", {
    groupId: "group123",
  });
}, 10000);