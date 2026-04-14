import authorize from "../middleweare/authmidleweare.js";
import checkRole from "../middleweare/rolemidleweare.js";
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
const role = checkRole("Manager", "Admin");
// 1.Project assignment routes
router.post(
  "/assignProject_to_team",
  authorize,
  role,
  validateAssignRequest(createAssignValidation),
  assignProject,
);
router.get(
  "/assignedProjectsList",
  authorize,
  checkRole("Admin", "Manager", "Employee"),
  getAllProjects,
);
router.get(
  "/getProjectAssignById/:id",
  authorize,
  checkRole("Admin", "Manager", "Employee"),
  getAssignedProjectById,
);
router.put(
  "/updateProjectAssign/:id",
  authorize,
  role,
  validateAssignRequest(updateAssignValidation),
  updateAssignedProject,
);
router.delete(
  "/deleteProjectAssign/:id",
  authorize,
  role,
  deleteAssignedProject,
);
export default router;
