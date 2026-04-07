import EmployeModel from "../models/EmployesModel.js";
import bcrypt from "bcryptjs";
import jsonwebtoken from "jsonwebtoken";``
export const createEmploye = async (req, res) => {
    try
    {
        const { name, lastname, email, phone, address, salary, password,role, department } = req.body;
        const employe = await EmployeModel.findOne({
            $or:[{email: email},{phone:phone}]
        });
        if (employe)
        {
            return res.status(400).json({ message:"Employee with this email or phone already exists"});
        }
        const hashPassword = await bcrypt.hash(password, 10);
        const newEmploye = new EmployeModel({
            name: name,
            lastname: lastname,
            email: email,
            phone: phone,
            address: address,
            salary: salary,
            password: hashPassword,
            role: role,
            department: department
        });
        await newEmploye.save();
        res.status(201).json({ message: "Employee created successfully", employe: newEmploye})
    }
    catch (error)
    {
        console.log(`Error creating Employee: ${error}`);
    }
}

export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const userInDb = await EmployeModel.findOne({ email: email });
        if (!userInDb)
        {
            return res.status(400).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcrypt.compare(password, userInDb.password);
        if (!isMatch)
        {
            return res.status(400).json({ message: "Inalid email or password" });
        }
        const token = jsonwebtoken.sign({
            id: userInDb._id,
            email: userInDb.email,
            role: userInDb.role
        }, process.env.JWT_SECRET, { expiresIn: "1d" },);
        res.status(200).json({message:"Login successfuly", token: token})
    }
    catch (error)
    {
        console.log(`Error logging in: ${error}`);
    }
}

export const deleteEmploye = async (req, res) => {
    try
    {
        const userId = req.params.id;
        const employee = await EmployeModel.findById(userId);
        if (!employee)
        {
           return res.status(404).json({ message: "Employee not found" });
        }
        employee.is_active = 0;
        employee.deleted_at = new Date();
        await employee.save();
        res.status(200).json({ message: "Employee deleted successfully" });
    }
    catch (error)
    {
        console.log(`Error deleting Employee: ${error}`);
    }
}

export const updateEmploye = async (req, res) => {
    try
    {         
        const { name, lastname, email, phone, address, salary, password, role, department } = req.body;
        const empData = await EmployeModel.findByIdAndUpdate({ _id: req.body.id }, {
            name: name,
            lastname: lastname,
            email: email,
            phone: phone,
            address: address,
            salary: salary,
            password: password,
            role: role,
            department: department 
        });
        if (!empData)
        {
            return res.status(404).json({ message: "Employee not found" });
        }
        res.status(200).json({ message: "Employee updated successfully", employe: empData });
    }
    catch (error)
    {
        console.log(`Error for updating Employee: ${error}`);
    }
}