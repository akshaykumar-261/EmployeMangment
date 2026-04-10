import mongoose from "mongoose";
import RoleModel from "./roles.js";
import DepartmentModel from "./departmentModel.js";
const EmployesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    lastname: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    phone: {
      type: String,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
    salary: {
      type: Number,
    },
    joinig_date: {
      type: Date,
      default: Date.now,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "roles",
      required: true,
    },
    department: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "departments",
      required: true,
    },
    is_active: {
      type: Boolean,
      default: true,
    },
    deleted_at: {
      type: Date,
      default: null,
    },
  },
  { timestamps: true },
);
const EmployeModel = mongoose.model("employe_info", EmployesSchema);
export default EmployeModel;
