import { io } from "socket.io-client";

const socket = io("http://localhost:8081", {
    auth: {
      //69d5e585a7b0cde6d8e7061c simran.kaur4@example.com
    token:  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY5ZDVlNTg1YTdiMGNkZTZkOGU3MDYxYyIsImVtYWlsIjoic2ltcmFuLmthdXI0QGV4YW1wbGUuY29tIiwicm9sZSI6IjY5ZDM4NzEwY2E2MjY3MTEyODA0ZjQzOSIsImlhdCI6MTc3NjQwMTA5NCwiZXhwIjoxNzc2NDg3NDk0fQ.1BCwJlePhNCjBQcs4l1nDzMfqHbhsX1Pk2djm5IR7kQ"
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
    message: "hello user 3",
  });
}, 5000);
