import authorize from "../middleweare/authmidleweare.js";
import express from "express";
import {
  assignProject,
  deleteAssignedProject,
  getAllProjects,
  getAssignedProjectById,
  updateAssignedProject,
} from "../controller/projectAssignController.js";
import {
  createAssignValidation,
  updateAssignValidation,
  validateAssignRequest,
} from "../controller/projectAssignValidation.js";
const router = express.Router();
// 1.Project assignment routes
router.post(
  "/assignProject_to_team",
  authorize,
  validateAssignRequest(createAssignValidation),
  assignProject,
);
router.get("/assignedProjectsList", authorize, getAllProjects);
router.get("/getProjectAssignById/:id", authorize, getAssignedProjectById);
router.put(
  "/updateProjectAssign/:id",
  authorize,
  validateAssignRequest(updateAssignValidation),
  updateAssignedProject,
);
router.delete("/deleteProjectAssign/:id", authorize, deleteAssignedProject);
export default router;