import express from "express";
import dotenv from "dotenv";
import http from "http";
import { Server } from "socket.io";
import socketHandler from "../socket/socketHandler.js";
import employeeRoutes from "../route/routeEmploye.js";
import projectRoutes from "../route/routeProject.js";
import teamRoutes from "../route/routeTeam.js";
import technologyRoutes from "../route/routerTechnology.js";
import startServer from "./connection.js";
const app = express();
dotenv.config();
app.use(express.json());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*",
  },
});
app.use("/api/employees", employeeRoutes);
app.use("/api/projects", projectRoutes);
app.use("/api/teams", teamRoutes);
app.use("/api/technologies", technologyRoutes);
const PORT = process.env.PORT;
socketHandler(io);
startServer(server, PORT);
