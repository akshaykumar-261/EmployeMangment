
import mongoose from "mongoose";
import EmployeModel from "./EmployesModel.js";
import RoleModel from "./roles.js";
const ProjectAssignSchema = mongoose.Schema({
    project_name: {
        type: String,
        required: true
    },
    project_description: {
        type: String,
        required: true
    },  
    employees: [
        {
            employee: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "employe_info",
                required: true
            },
            role_in_project: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "roles",
                required: true
            }
       }  
    ]
}, { timestamps: true });
const ProjectAssignModel = mongoose.model("project_assign", ProjectAssignSchema);
export default ProjectAssignModel; 
