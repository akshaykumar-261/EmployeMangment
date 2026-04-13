import express from "express";
import authorize from "../middleweare/authmidleweare.js";
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
  validateTeamRequest(createTeamValidation),
  createTeam,
);
router.put(
  "/updatingTeam/:id",
  authorize,
  validateTeamRequest(updateTeamValidation),
  updateTeam,
);
router.get("/teamList", authorize, getTeam);
router.delete("/softDeleteTeam/:id", authorize, deleteTeam);
export default router;
