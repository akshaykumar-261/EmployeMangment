import ProjectAssignModel from "../models/projectAssignModule.js";
import TeamModel from "../models/teamModule.js";
import {
  createProject,
  deleteProjectById,
  getProjectById,
  getProjects,
  updateProjectById,
} from "./projectAssignService.js";
import { empMESSAGE, PROJECT_MESSAGES } from "../utility/helper/commMessage.js";
import { sendResponse } from "../utility/helper/responseHandler.js";
import { STATUS } from "../utility/helper/statusCode.js";
export const assignProject = async (req, res) => {
  try {
    const { project_name, project_description, assign_project_team } = req.body;
    const project = await createProject({
      project_name,
      project_description,
      assign_project_team,
    });
    return sendResponse(res, STATUS.CREATED, PROJECT_MESSAGES.PROJECT_CREATED, {
      project,
    });
  } catch (error) {
    console.log(`Error assigining project: ${error}`);
    return sendResponse(
      res,
      STATUS.SERVER_ERROR,
      PROJECT_MESSAGES.SERVER_ERROR,
    );
  }
};
export const getAllProjects = async (req, res) => {
  /* why are we still using wrong naming , for getting user independent results naming should
   following getAllProjects or getProjectsLIst */
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const { search } = req.query;
    const { projects, totalProjects, totalPages } = await getProjects({
      page,
      limit,
      search,
    });
    if (!projects)
      return sendResponse(
        res,
        STATUS.NOT_FOUND,
        PROJECT_MESSAGES.PROJECT_NOT_FOUND,
      );
    return sendResponse(
      res,
      STATUS.SUCCESS,
      PROJECT_MESSAGES.PROJECT_FETECHED,
      { page, limit, totalPages, totalProjects, projects },
    );
  } catch (error) {
    console.log(`Error fetching assigned projects: ${error}`);
    return sendResponse(res, STATUS.SERVER_ERROR);
  }
};

export const getAssignedProjectById = async (req, res) => {
  try {
    const { id } = req.params;
    /*  why no validation on id , what if id is null/undefined passed in api */
    const project = await getProjectById(id);
    if (!project) {
      return sendResponse(
        res,
        STATUS.BAD_REQUEST,
        PROJECT_MESSAGES.PROJECT_NOT_FOUND,
      );
    }
    res.status(200).json({ project: project });
    return sendResponse(
      res,
      STATUS.SUCCESS,
      PROJECT_MESSAGES.PROJECT_FETECHED_SINGLE,
    );
  } catch (error) {
    console.log(`Error fetching assigned project by Id: ${error}`);
    return sendResponse(
      res,
      STATUS.SERVER_ERROR,
      PROJECT_MESSAGES.SERVER_ERROR,
    );
  }
};

export const updateAssignedProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { project_name, project_description, assign_project_team } = req.body;
    const project = await updateProjectById(id, {
      project_name,
      project_description,
      assign_project_team,
    });
    if (!project) {
      return sendResponse(
        res,
        STATUS.BAD_REQUEST,
        PROJECT_MESSAGES.BAD_REQUEST,
      );
    }
    return sendResponse(res, STATUS.SUCCESS, PROJECT_MESSAGES.PROJECT_UPDATED);
  } catch (error) {
    console.log(`Error updating assigned project: ${error}`);
    return sendResponse(
      res,
      STATUS.SERVER_ERROR,
      PROJECT_MESSAGES.SERVER_ERROR,
    );
  }
};

export const deleteAssignedProject = async (req, res) => {
  try {
    const userId = req.params.id;
    /* no need to perform extra queries , findByIdAndUpdate will serve both purpose for checking and updating as well */
    const project = await deleteProjectById(id);
    if (!project) {
      return sendResponse(
        res,
        STATUS.BAD_REQUEST,
        PROJECT_MESSAGES.NO_PROJECT_FOUND,
      );
    }
  } catch (error) {
    console.log(`Error deleting assigned project: ${error}`);
    return sendResponse(
      res,
      STATUS.SERVER_ERROR,
      PROJECT_MESSAGES.SERVER_ERROR,
    );
  }
};
