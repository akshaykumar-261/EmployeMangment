import express from "express";
import { createEmployeValidation, loginValidation, updateEmployeValidation, userIdValidator, validateRequest } from "../controller/employeValidation.js";
import { createEmploye, deleteEmploye, getEmployee, getEmployeList, getMangerList, getQAList, login, updateEmploye } from "../controller/employeController.js";
import authorize from "../middleweare/authmidleweare.js";
import { assignProject, deleteAssignedProject, getAssignedProjectById, getAssignedProjects, updateAssignedProject } from "../controller/projectAssignController.js";
import { createAssignValidation, updateAssignValidation, validateAssignRequest } from "../controller/projectAssignValidation.js";
const router = express.Router();
router.post("/createEmployee",authorize, validateRequest(createEmployeValidation), createEmploye);
router.post("/login", validateRequest(loginValidation), login);
router.put("/updateEmp",authorize,validateRequest(updateEmployeValidation) ,updateEmploye);
router.delete("/deleteEmp/:id", authorize, validateRequest(userIdValidator), deleteEmploye);
router.get("/getAllEmp", authorize, getEmployee);
router.get("/getManager", getMangerList);
router.get("/getEmployee", getEmployeList);
router.get("/getQA", getQAList);

// Project assignment routes
router.post("/projectAssignToEmp",authorize,validateAssignRequest(createAssignValidation),assignProject);
router.get("/getAssignedProjects",authorize,getAssignedProjects);
router.get("/projectAssignById/:id",authorize, getAssignedProjectById);
router.put("/updateProjectAssign/:id", authorize, validateAssignRequest(updateAssignValidation),updateAssignedProject);
router.delete("/deleteProjectAssign/:id",authorize,deleteAssignedProject);
export default router;
