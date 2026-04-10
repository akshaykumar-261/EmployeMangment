import monggose from "mongoose";
import RoleModel from "../models/roles.js";
import mongoose from "mongoose";

const roles = [
  { name: "Admin" },
  { name: "Manager" },
  { name: "QA" },
  { name: "HR" },
  { name: "Employee" },
];
const seederRoles = async () => {
  try {
    await mongoose.connect(
      "mongodb://localhost:27017/Employe_Managment_System",
    );
    await RoleModel.deleteMany();
    await RoleModel.insertMany(roles);
    console.log("Roles seeded successfully");
    process.exit();
  } catch (error) {
    console.error("Error seeding roles:", error);
  }
};
seederRoles();
