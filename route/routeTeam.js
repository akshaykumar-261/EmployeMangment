import express from "express";
import authorize from "../middleweare/authmidleweare.js";
import checkRole from "../middleweare/rolemidleweare.js";
import {
  createTeam,
  deleteTeam,
  getTeam,
  updateTeam,
} from "../controller/teamController.js";
import {
  createTeamValidation,
  updateTeamValidation,
  validateTeamRequest,
} from "../controller/teamValidation.js";
const router = express.Router();
const role = checkRole("Admin", "Manager");
// 3.teams route
router.post(
  "/createdTeam",
  authorize,
  checkRole("Admin"),
  validateTeamRequest(createTeamValidation),
  createTeam,
);
router.put(
  "/updatingTeam/:id",
  authorize,
  role,
  validateTeamRequest(updateTeamValidation),
  updateTeam,
);
router.get("/teamList", authorize, role, getTeam);
router.delete("/softDeleteTeam/:id", authorize, role, deleteTeam);
export default router;
