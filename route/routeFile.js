import express from "express";
import {
  createEmployeValidation,
  loginValidation,
  updateEmployeValidation,
  userIdValidator,
  validateRequest,
} from "../controller/employeValidation.js";
import {
  createEmploye,
  deleteEmploye,
  getEmployee,
  login,
  updateEmploye,
} from "../controller/employeController.js";
import authorize from "../middleweare/authmidleweare.js";
import {
  assignProject,
  deleteAssignedProject,
  getAssignedProjectById,
  getAssignedProjects,
  updateAssignedProject,
} from "../controller/projectAssignController.js";
import {
  createAssignValidation,
  updateAssignValidation,
  validateAssignRequest,
} from "../controller/projectAssignValidation.js";
import {
  createTechnology,
  getTech,
  updateTech,
} from "../controller/technologyController.js";
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
router.post(
  "/createEmployee",
  authorize,
  validateRequest(createEmployeValidation),
  createEmploye,
);
router.post("/login", validateRequest(loginValidation), login);
router.put(
  "/updateEmp",
  authorize,
  validateRequest(updateEmployeValidation),
  updateEmploye,
);
router.delete(
  "/deleteEmp/:id",
  authorize,
  validateRequest(userIdValidator),
  deleteEmploye,
);
router.get("/getEmpList", authorize, getEmployee);
// router.get("/getManager", getMangerList);
// router.get("/getEmployee", getEmployeList);
// router.get("/getQA", getQAList);

// 1.Project assignment routes
router.post(
  "/assignProject_to_team",
  authorize,
  validateAssignRequest(createAssignValidation),
  assignProject,
);
router.get("/assignedProjectsList", authorize, getAssignedProjects);
router.get("/getProjectAssignById/:id", authorize, getAssignedProjectById);
router.put(
  "/updateProjectAssign/:id",
  authorize,
  validateAssignRequest(updateAssignValidation),
  updateAssignedProject,
);
router.delete("/deleteProjectAssign/:id",authorize, deleteAssignedProject);
// 2.technology routes
router.post("/createdTechnology", authorize, createTechnology);
router.put("/updateTechnology", authorize, updateTech);
router.get("/getTechnologyList", authorize, getTech);
// 3.teams route
router.post(
  "/createdTeam",
  validateTeamRequest(createTeamValidation),
  authorize,
  createTeam,
);
router.put(
  "/updatingTeam/:id",
  validateTeamRequest(updateTeamValidation),
  authorize,
  updateTeam,
);
router.get("/teamList", authorize, getTeam);
router.delete("/softDeleteTeam/:id", authorize, deleteTeam);
export default router;
