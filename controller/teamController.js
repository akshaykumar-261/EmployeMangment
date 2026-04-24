import TeamModel from "../models/teamModule.js";
import {
  getTeamList,
  teamCreated,
  teamDeleted,
  teamUpdate,
} from "./teamService.js";
import { TEAM_MESSAGES } from "../utility/helper/commMessage.js";
import { sendResponse } from "../utility/helper/responseHandler.js";
import { STATUS } from "../utility/helper/statusCode.js";
export const createTeam = async (req, res) => {
  try {
    const { team_name, team_leade, technology, members } = req.body;
    const team = await teamCreated({
      team_name,
      team_leade,
      technology,
      members,
    });
    return sendResponse(res, STATUS.SUCCESS, TEAM_MESSAGES.TEAM_CREATED);
  } catch (error) {
    console.log(`Error creating team, ${error}`);
    return sendResponse(res, STATUS.SERVER_ERROR, TEAM_MESSAGES.SERVER_ERROR);
  }
};
export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { team_name, team_lead, technology, member } = req.body;
    const team = await teamUpdate(id, {
      team_name,
      team_lead,
      technology,
      member,
    });
    if (!team) {
      return sendResponse(
        res,
        STATUS.BAD_REQUEST,
        TEAM_MESSAGES.TEAM_NOT_FOUND,
      );
    }
    return sendResponse(res, STATUS.SUCCESS, TEAM_MESSAGES.TEAM_UPDATE, {
      data: team,
    });
  } catch (error) {
    console.log(`Error updatng team,${error}`);
    return sendResponse(res, STATUS.SERVER_ERROR, TEAM_MESSAGES.SERVER_ERROR);
  }
};
export const deleteTeam = async (req, res) => {
  try {
    const userId = req.params.id;
    const team = await teamDeleted(userId);
    if (!team) {
      return sendResponse(
        res,
        STATUS.BAD_REQUEST,
        TEAM_MESSAGES.TEAM_NOT_FOUND,
      );
    }

    return sendResponse(res.STATUS.SUCCESS, TEAM_MESSAGES.TEAM_DELETED);
  } catch (error) {
    console.log(`Error while geeting team list,${error}`);
    return sendResponse(res, STATUS.SERVER_ERROR, TEAM_MESSAGES.SERVER_ERROR);
  }
};

export const getTeam = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const { search } = req.query;
    const { team, totalTeam, teamPages } = await getTeamList({
      page,
      limit,
      search,
    });
    if (!team)
      return sendResponse(
        res,
        STATUS.BAD_REQUEST,
        TEAM_MESSAGES.TEAM_NOT_FOUND,
      );
    return sendResponse(res, STATUS.SUCCESS, TEAM_MESSAGES.TEAM_FETCH, {
      page,
      limit,
      totalTeam,
      teamPages,
      team,
    });
  } catch (error) {
    console.log(`Error fetching team: ${error}`);
    return sendResponse(res, STATUS.SERVER_ERROR, TEAM_MESSAGES.SERVER_ERROR);
  }
};
