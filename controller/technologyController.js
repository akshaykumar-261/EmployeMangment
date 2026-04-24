import TechnologyModel from "../models/technolgyModel.js";
import { TECHNOLOGY_MESSAGE } from "../utility/helper/commMessage.js";
import { STATUS } from "../utility/helper/statusCode.js";
import { sendResponse } from "../utility/helper/responseHandler.js";
import {
  getTechnologyList,
  technologyCreated,
  technologyDeleted,
  technologyUpdate,
} from "./technologyService.js";
export const createTechnology = async (req, res) => {
  try {
    const { frontend, backend, database } = req.body;
    const tech = await technologyCreated({
      frontend,
      backend,
      database,
    });
    return sendResponse(
      res,
      STATUS.SUCCESS,
      TECHNOLOGY_MESSAGE.TECHNOLOGY_CREATED,
      { data: tech },
    );
  } catch (error) {
    console.log(`Error creating technology: ${error}`);
    return sendResponse(
      res,
      STATUS.SERVER_ERROR,
      TECHNOLOGY_MESSAGE.SERVER_ERROR,
    );
  }
};
export const updateTech = async (req, res) => {
  try {
    const { id } = req.params;
    const { frontend, backend, database } = req.body;
    const tech = await technologyUpdate(id, {
      frontend,
      backend,
      database,
    });
    if (!tech) {
      return sendResponse(
        res,
        STATUS.BAD_REQUEST,
        TECHNOLOGY_MESSAGE.TECHNOLOGY_NOT_FOUND,
      );
    }
    return sendResponse(
      res,
      STATUS.SUCCESS,
      TECHNOLOGY_MESSAGE.TECHNOLOGY_UPDATE,
      {tech},
    );
  } catch (error) {
    console.log(`Error updatng team,${error}`);
    return sendResponse(
      res,
      STATUS.SERVER_ERROR,
      TECHNOLOGY_MESSAGE.SERVER_ERROR,
    );
  }
};

export const getTech = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const { search } = req.query;
    const { technology, totaltechnology, totalPages } = await getTechnologyList(
      {
        page,
        limit,
        search,
      },
    );
    if (!technology)
      return sendResponse(
        res,
        STATUS.BAD_REQUEST,
        TECHNOLOGY_MESSAGE.TECHNOLOGY_NOT_FOUND,
      );
    return sendResponse(
      res,
      STATUS.SUCCESS,
      TECHNOLOGY_MESSAGE.TECHNOLOGY_FETECH,
      { page, limit, totalPages, totaltechnology, technology },
    );
  } catch (error) {
    console.log(`Error fetching technology: ${error}`);
    return sendResponse(
      res,
      STATUS.SERVER_ERROR,
      TECHNOLOGY_MESSAGE.SERVER_ERROR,
    );
  }
};

export const deleteTech = async (req, res) => {
  try {
    const userId = req.params.id;
    const tech = await technologyDeleted(userId);
    if (!tech) {
      return sendResponse(
        res,
        STATUS.BAD_REQUEST,
        TECHNOLOGY_MESSAGE.TECHNOLOGY_NOT_FOUND,
      );
    }
    return sendResponse(
      res,
      STATUS.SUCCESS,
      TECHNOLOGY_MESSAGE.TECHNOLOGY_DLETED,
    );
  } catch (error) {
    console.log(`Error while deleting technology,${error}`);
    return sendResponse(
      res,
      STATUS.SERVER_ERROR,
      TECHNOLOGY_MESSAGE.SERVER_ERROR,
    );
  }
};
