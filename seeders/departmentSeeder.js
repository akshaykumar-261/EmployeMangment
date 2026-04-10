import mongoose from "mongoose";
import DepartmentModel from "../models/departmentModel.js";

const departments = [
  { name: "Development" },
  { name: "Testing" },
  { name: "HR" },
  { name: "Finance" },
  { name: "Development" },
  { name: "Management" },
  { name: "Quality Assurance" },
];

const seederDepartment = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/Employe_Managment_System",
    );
    await DepartmentModel.deleteMany();
    await DepartmentModel.insertMany(departments);
    console.log("Departments seeded successfully");
    process.exit();
  } catch (error) {
    console.log("Error seeding departments:", error);
  }
};
seederDepartment();
