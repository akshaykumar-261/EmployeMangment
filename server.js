import express from "express";
import mongoose from "mongoose";
import cors from "cors";
import dotenv from "dotenv";
import routeFile from "./route/routeFile.js";
const app = express();
dotenv.config();
app.use(express.json());
const ports = process.env.PORT;
const option = {
    origin: "*",              // allow requests from any origin
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
};
app.use(cors(option));
app.use("/api/managment", routeFile);
mongoose
    .connect(process.env.DB_URL).then((d) => {
    console.log("Database Connection Successfully");
    app.listen(ports, () => {
        console.log(`Server is running on port ${ports}`);
    });
})
    .catch((error) => {
        console.log("Databse Connection Filed", error);
})
