import { io } from "socket.io-client";

const socket = io("http://localhost:8081", {
    auth: {
      //69d5e4baa7b0cde6d8e7061a rohit.verma2@example.com
    token: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDVlNGJhYTdiMGNkZTZkOGU3MDYxYSIsImVtYWlsIjoicm9oaXQudmVybWEyQGV4YW1wbGUuY29tIiwicm9sZSI6IjY5ZDM4NzEwY2E2MjY3MTEyODA0ZjQzOSIsImlhdCI6MTc3NjMzMjk0NywiZXhwIjoxNzc2MzM2NTQ3fQ.f3ogARMML9espz5kjbnKetx0NDYJpq8Mq06RBSFlvCg"
  },
});

socket.on("connect", () => {
  console.log("User1 Connected");
});

socket.on("welcome", (data) => {
  console.log("Welcome:", data);
});

socket.on("receive_private_message", (data) => {
  console.log("User1 Received:", data);
});

socket.on("message_status", (data) => {
  console.log("User1 Status:", data);
});

setTimeout(() => {
  socket.emit("private_message", {
    receiverId: "69d5e54aa7b0cde6d8e7061b",
    message: "Helo user 2",
  });
}, 5000);
