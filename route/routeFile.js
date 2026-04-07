import express from "express";
import { createEmployeValidation, loginValidation, userIdValidator, validateRequest } from "../controller/employeValidation.js";
import { createEmploye, deleteEmploye, login } from "../controller/employeController.js";
import authorize from "../middleweare/authmidleweare.js";
const router = express.Router();
router.post("/createEmployee",authorize, validateRequest(createEmployeValidation), createEmploye);
router.post("/login", validateRequest(loginValidation), login);
router.delete("/deleteEmp/:id",authorize, validateRequest(userIdValidator) ,deleteEmploye);
export default router;
