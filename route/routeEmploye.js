import express from "express";
import checkRole from "../middleweare/rolemidleweare.js"
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
router.get("/getEmpList", authorize,checkRole("Manager"),getEmployee);

export default router;
