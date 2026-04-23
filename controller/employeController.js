import EmployeModel from "../models/EmployesModel.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
import { sendOtpMail } from "../utility/sendEmail.js";
import { empMESSAGE } from "../utility/helper/commMessage.js";
import { sendResponse } from "../utility/helper/responseHandler.js";
import { STATUS } from "../utility/helper/statusCode.js";
import {
  findEmploye,
  createEmp,
  updateEmployeById,
  getEmployeeList,
  findEmpAndDelete
} from "./employeService.js";
export const createEmploye = async (req, res) => {
  try {
    const {
      name,
      lastname,
      email,
      phone,
      address,
      salary,
      password,
      role,
      department,
    } = req.body;
    /*  do we need whole body destructing or can we pass request payload to service layer , learn pros and cons of both */
    // required field check
    if (!name || !email || !password) {
      return sendResponse(res, STATUS.BAD_REQUEST, empMESSAGE.REQUIRE_FIELDS);
    }
    const existing = await findEmploye(email);
    if (existing) {
      return sendResponse(res, STATUS.BAD_REQUEST, empMESSAGE.EMPLOYE_EXISTS);
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newEmploye = await createEmp({
      name,
      lastname,
      email,
      phone,
      address,
      salary,
      password: hashPassword,
      role,
      department,
    });
    return sendResponse(res, STATUS.CREATED, empMESSAGE.EMPLOYE_CREATED);
  } catch (error) {
    console.log(`Error creating Employee: ${error}`);
    return sendResponse(res, STATUS.SERVER_ERROR, empMESSAGE.SERVER_ERROR);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInDb = await findEmploye(email);
    if (!userInDb) {
      return sendResponse(
        res,
        STATUS.NOT_FOUND,
        empMESSAGE.INVALID_CREDENTIALS,
      );
    }
    const isMatch = await bcrypt.compare(password, userInDb.password);
    if (!isMatch) {
      return sendResponse(
        res,
        STATUS.NOT_FOUND,
        empMESSAGE.INVALID_CREDENTIALS,
      );
    }
    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    userInDb.otp = otp;
    userInDb.otpExpires = new Date(Date.now() + 5 * 60 * 1000);
    await userInDb.save();
    await sendOtpMail(userInDb.email, otp, userInDb.name);
    return sendResponse(res, STATUS.SUCCESS, empMESSAGE.OTP_SENT);
  } catch (error) {
    console.log(`Error logging in: ${error}`);
    return sendResponse(res, STATUS.SERVER_ERROR, empMESSAGE.SERVER_ERROR);
  }
};

export const verifyOtp = async (req, res) => {
  try {
    const { email, otp } = req.body;
    const userInDb = await findEmploye(email);
    if (!userInDb) {
      return sendResponse(res, STATUS.NOT_FOUND, empMESSAGE.EMPLOYE_NOT_FOUND);
    }
    if (
      userInDb.otp !== otp ||
      !userInDb.otpExpires ||
      userInDb.otpExpires < new Date()
    ) {
      return sendResponse(res, STATUS.BAD_REQUEST, empMESSAGE.INVALID_OTP);
    }
    const token = jsonwebtoken.sign(
      {
        id: userInDb._id,
        email: userInDb.email,
        role: userInDb.role,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1d",
      },
    );

    userInDb.otp = null;
    userInDb.otpExpires = null;

    await userInDb.save();
    return sendResponse(res, STATUS.SUCCESS, empMESSAGE.LOGIN_SUCCESS, {
      token,
    });
  } catch (error) {
    console.log(`Error verifiying OTP: ${error}`);
    return sendResponse(res, STATUS.SERVER_ERROR, empMESSAGE.SERVER_ERROR);
  }
};

export const deleteEmploye = async (req, res) => {
  try {
    const userId = req.params.id;
    const employee = await findEmpAndDelete(userId);
    if (!employee) {
      return sendResponse(res, STATUS.NOT_FOUND, empMESSAGE.EMPLOYE_NOT_FOUND);
    }
    employee.is_active = 0;
    employee.deleted_at = new Date();
    await employee.save();
    return sendResponse(res, STATUS.SUCCESS, empMESSAGE.EMPLOYE_DELETED);
  } catch (error) {
    console.log(`Error deleting Employee: ${error}`);
    return sendResponse(res, STATUS.SERVER_ERROR, empMESSAGE.SERVER_ERROR);
  }
};

export const updateEmploye = async (req, res) => {
  try {
    const { name, lastname, email, phone, address, salary, role, department } =
      req.body;
    /*  await CompanyUser.findByIdAndUpdate(
    req.user.id,
    filteredBody,
  ); findByIdAndUpdate only take id as string , no need to pass keyvalue pair */
    const empData = await updateEmployeById(req.body.id, {
      name,
      lastname,
      phone,
      address,
      salary,
      role,
      department,
    });
    if (!empData) {
      return sendResponse(
        res,
        STATUS.BAD_REQUEST,
        empMESSAGE.EMPLOYE_NOT_FOUND,
      );
    }
    return sendResponse(res, STATUS.SUCCESS, empMESSAGE.EMPLOYE_UPDATED);
  } catch (error) {
    console.log(`Error for updating Employee: ${error}`);
    return sendResponse(res, STATUS.BAD_REQUEST, empMESSAGE.SERVER_ERROR);
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const { employees, totalEmployees, totalPages } = await getEmployeeList({ page, limit });
    return sendResponse(res, STATUS.SUCCESS, empMESSAGE.EMPLOYEE_FETCHED, {
      page,
      limit,
      totalPages,
      totalEmployees,
      employees,
    });
  } catch (error) {
    console.log(`Error for getting Employee: ${error}`);
    return sendResponse(res, STATUS.SERVER_ERROR, empMESSAGE.SERVER_ERROR);
  }
};
