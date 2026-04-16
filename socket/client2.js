import { io } from "socket.io-client";

const socket = io("http://localhost:8081", {
    auth: {
      //69d5e54aa7b0cde6d8e7061b neha.kapoor3@example.com
    token:"eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDVlNTRhYTdiMGNkZTZkOGU3MDYxYiIsImVtYWlsIjoibmVoYS5rYXBvb3IzQGV4YW1wbGUuY29tIiwicm9sZSI6IjY5ZDM4NzEwY2E2MjY3MTEyODA0ZjQzOSIsImlhdCI6MTc3NjMzMzAyNSwiZXhwIjoxNzc2MzM2NjI1fQ.f_9W2tbg7t12sl1onfrCDwJoeYKHCw7O3NRDFdsr-Aw",
  },
});

socket.on("connect", () => {
  console.log("User2 Connected");
});

socket.on("welcome", (data) => {
  console.log("Welcome:", data);
});

socket.on("receive_private_message", (data) => {
  console.log("User2 Received:", data);
});

socket.on("message_status", (data) => {
  console.log("User2 Status:", data);
});

setTimeout(() => {
  socket.emit("private_message", {
    receiverId: "69d5e4baa7b0cde6d8e7061a",
    message: "Hello User 1",
  });
}, 5000);
