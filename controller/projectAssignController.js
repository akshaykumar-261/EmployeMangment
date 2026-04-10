import ProjectAssignModel from "../models/projectAssignModule.js";
import TeamModel from "../models/teamModule.js";
//import EmployeModel from "../models/EmployesModel.js";
//import RoleModel from "../models/roles.js";
export const assignProject = async (req, res) => {
  try {
    const { project_name, project_description, assign_project_team } = req.body;
    const project = await ProjectAssignModel.create({
      project_name,
      project_description,
      assign_project_team,
    });
    return res
      .status(201)
      .json({ message: "Project assigned successfuly", data: project });
  } catch (error) {
    console.log(`Error assigining project: ${error}`);
  }
};

export const getAssignedProjects = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const { search } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { project_name: { $regex: search, $options: "i" } },
        { project_description: { $regex: search, $options: "i" } },
      ];
    }
    const totalProjects = await ProjectAssignModel.countDocuments();
    const project = await ProjectAssignModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalPages = Math.ceil(totalProjects / limit);
    if (!project) return res.status(400).json({ message: "No projects found" });
    res
      .status(200)
      .json({ page, limit, totalPages, totalProjects, projects: project });
  } catch (error) {
    console.log(`Error fetching assigned projects: ${error}`);
  }
};

export const getAssignedProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    const project = await ProjectAssignModel.findById(id);
    if (!project) {
      return res.status(400).json({ message: "Project not found" });
    }
    res.status(200).json({ project: project });
  } catch (error) {
    console.log(`Error fetching assigned project by Id: ${error}`);
  }
};

export const updateAssignedProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { project_name, project_description, assign_project_team } = req.body;
    const project = await ProjectAssignModel.findByIdAndUpdate(id, {
      project_name,
      project_description,
      assign_project_team,
    });
    if (!project) {
      return res.status(400).json({ message: "Project not found" });
    }
    return res
      .status(200)
      .json({ message: "Project update successfuly", data: project });
  } catch (error) {
    console.log(`Error updating assigned project: ${error}`);
  }
};

export const deleteAssignedProject = async (req, res) => {
  try {
    const userId = req.params.id;
    const project = await ProjectAssignModel.findById(userId);
    if (!project) {
      return res.status(400).json({ message: "Project not found" });
    }
    project.is_active = 0;
    project.deleted_at = new Date();
    await project.save();
    res.status(200).json({ message: "Project deleted successfully" });
  } catch (error) {
    console.log(`Error deleting assigned project: ${error}`);
  }
};
