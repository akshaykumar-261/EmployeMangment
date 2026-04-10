import mongoose from "mongoose";
import RoleModel from "./roles.js";
import EmployeModel from "./EmployesModel.js";
import TechnologyModel from "./technolgyModel.js";
const TeamSchema = mongoose.Schema(
  {
    team_name: {
      type: String,
      required: true,
    },
    team_leade: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "employe_info",
      required: true,
    },
    technology: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "technology",
      required: true,
    },
    members: [
      {
        employees: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "employe_info",
          required: true,
        },
        role_in_team: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "roles",
          required: true,
        },
      },
    ],
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
const TeamModel = mongoose.model("teams", TeamSchema);
export default TeamModel;
