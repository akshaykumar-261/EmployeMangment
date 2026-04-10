import mongoose from "mongoose";
import TeamModel from "./teamModule.js";
const ProjectAssignSchema = mongoose.Schema(
  {
    project_name: {
      type: String,
      required: true,
    },
    project_description: {
      type: String,
      required: true,
    },
    assign_project_team: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "teams",
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
const ProjectAssignModel = mongoose.model(
  "project_assign",
  ProjectAssignSchema,
);
export default ProjectAssignModel;
