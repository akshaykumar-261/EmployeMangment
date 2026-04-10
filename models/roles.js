import mongoose from "mongoose";

const rolesSchema = mongoose.Schema(
  {
    name: {
      type: String,
      enum: ["Admin", "QA", "Manager", "HR", "Employee"],
      default: "Employee",
    },
  },
  { timestamps: true },
);
const RoleModel = mongoose.model("roles", rolesSchema);
export default RoleModel;
