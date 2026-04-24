import express from "express";
import authorize from "../middleweare/authmidleweare.js";
import checkRole from "../middleweare/rolemidleweare.js";
import {
  createTechnology,
  deleteTech,
  getTech,
  updateTech,
} from "../controller/technologyController.js";
const router = express.Router();
// 2.technology routes
router.post(
  "/createdTechnology",
  authorize,
  checkRole("Admin"),
  createTechnology,
);
router.put("/updateTechnology/:id", authorize, checkRole("Admin"), updateTech);
router.get("/getTechnologyList", authorize, checkRole("Admin"), getTech);
router.delete("/softDeleteTech/:id", deleteTech);
export default router;
