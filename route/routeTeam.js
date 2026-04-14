import express from "express";
import authorize from "../middleweare/authmidleweare.js";
import checkRole from "../middleweare/rolemidleweare.js"
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
  checkRole("Admin","Manager"),
  validateTeamRequest(updateTeamValidation),
  updateTeam,
);
router.get("/teamList", authorize,checkRole("Admin","Manager"),getTeam);
router.delete("/softDeleteTeam/:id", authorize,checkRole("Admin","Manager"), deleteTeam);
export default router;
