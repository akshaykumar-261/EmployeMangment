import EmployeModel from "../models/EmployesModel.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";
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
    const employe = await EmployeModel.findOne(
      { email },
      /* why or condition for single field  */
    );
    if (employe) {
      return res
        .status(400)
        .json({ message: "Employee with this email already exists" });
    }
    const hashPassword = await bcrypt.hash(password, 10);
    const newEmploye = await EmployeModel.create({
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
    res
      .status(201)
      .json({ message: "Employee created successfully", employe: newEmploye });
  } catch (error) {
    console.log(`Error creating Employee: ${error}`);
  }
};

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;
    const userInDb = await EmployeModel.findOne({ email: email });
    if (!userInDb) {
      return res.status(400).json({ message: "Invalid email or password" });
    }
    const isMatch = await bcrypt.compare(password, userInDb.password);
    if (!isMatch) {
      return res.status(400).json({ message: "Inalid email or password" });
    }
    const token = jsonwebtoken.sign(
      {
        id: userInDb._id,
        email: userInDb.email,
        role: userInDb.role,
      },
      process.env.JWT_SECRET,
      { expiresIn: "1h" },
    );
    res.status(200).json({ message: "Login successfuly", token: token });
  } catch (error) {
    console.log(`Error logging in: ${error}`);
  }
};
export const deleteEmploye = async (req, res) => {
  try {
    const userId = req.params.id;
    const employee = await EmployeModel.findById(userId);
    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }
    employee.is_active = 0;
    employee.deleted_at = new Date();
    await employee.save();
    res.status(200).json({ message: "Employee deleted successfully" });
  } catch (error) {
    console.log(`Error deleting Employee: ${error}`);
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
    const empData = await EmployeModel.findByIdAndUpdate(req.body.id, {
      name,
      lastname,
      phone,
      address,
      salary,
      role,
      department,
    });
    if (!empData) {
      return res.status(404).json({ message: "Employee not found" });
    }
    res
      .status(200)
      .json({ message: "Employee updated successfully", employe: empData });
  } catch (error) {
    console.log(`Error for updating Employee: ${error}`);
  }
};

export const getEmployee = async (req, res) => {
  try {
    const { page = 1, limit = 10 } = req.query;
    const skip = (page - 1) * parseInt(limit);
    const query = {};
    const result = await EmployeModel.aggregate([
      {
        $match: {
          ...query,
          is_active: true,
          deleted_at: null,
        },
      },
      {
        $facet: {
          employees: [
            { $sort: { createdAt: -1 } },
            { $skip: skip },
            { $limit: parseInt(limit) },
          ],
          totalCount: [{ $count: "count" }],
        },
      },
    ]);
    const employees = result[0].employees;
    const totalEmployes = result[0].totalCount[0]?.count || 0;
    const totalPages = Math.ceil(totalEmployes / parseInt(limit));
    /* is it possible to fetch whole paginated results in single query using aggregations */
    res.status(200).json({ page, limit, totalPages, totalEmployes, employees });
  } catch (error) {
    console.log(`Error for getting Employee: ${error}`);
  }
};
