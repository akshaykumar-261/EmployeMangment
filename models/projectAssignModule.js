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
    /*  can we only assign team to project , why it is not possible to assign single user to project
        Technically, it is possible to assign a project to a single employee 
        by referencing an Employee model. However, in our system design, 
        we enforce that a project must be assigned to a team.
        The reason behind this approach is:
        1. Projects are usually handled by multiple members, not individuals.
        2. It ensures better organization and scalability.
        3. A team should be created first, and then the project is assigned to that team.
        This is a business rule, not a technical limitation.
     */
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
