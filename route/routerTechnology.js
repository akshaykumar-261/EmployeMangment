import express from "express";
import authorize from "../middleweare/authmidleweare.js";
import {
  createTechnology,
  getTech,
  updateTech,
} from "../controller/technologyController.js";
const router = express.Router();
// 2.technology routes
router.post("/createdTechnology", authorize, createTechnology);
router.put("/updateTechnology", authorize, updateTech);
router.get("/getTechnologyList", authorize, getTech);
export default router;
