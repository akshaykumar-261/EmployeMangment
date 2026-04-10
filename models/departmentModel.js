import mongoose from "mongoose";

const departmentSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
  },
  { timestamps: true },
);
const DepartmentModel = mongoose.model("departments", departmentSchema);
export default DepartmentModel;
