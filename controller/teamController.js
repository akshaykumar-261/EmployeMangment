import TeamModel from "../models/teamModule.js";
export const createTeam = async (req, res) => {
  try {
    const { team_name, team_leade, technology, members } = req.body;
    const team = await TeamModel.create({
      team_name,
      team_leade,
      technology,
      members,
    });
    return res
      .status(201)
      .json({ message: "Team Created successfuly", data: team });
  } catch (error) {
    console.log(`Error creating team, ${error}`);
  }
};
export const updateTeam = async (req, res) => {
  try {
    const { id } = req.params;
    const { team_name, team_lead, technology, member } = req.body;
    const team = await TeamModel.findByIdAndUpdate(id, {
      team_name,
      team_lead,
      technology,
      member,
    });
    if (!team) {
      return res.status(400).json({ message: "Team Not Found" });
    }
    return res
      .status(200)
      .json({ message: "team update successfuly", data: team });
  } catch (error) {
    console.log(`Error updatng team,${error}`);
  }
};
export const deleteTeam = async (req, res) => {
  try {
    const userId = req.params.id;
    const team = await TeamModel.findById(userId);
    if (!team) {
      return res.status(404).json({ message: "Employee deleted successfuly" });
    }
    team.is_active = 0;
    team.deleted_at = new Date();
    await team.save();
    res.status(200).json({ message: "Team deleted successfully" });
  } catch (error) {
    console.log(`Error while geeting team list,${error}`);
  }
};

export const getTeam = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const { search } = req.query;
    const query = {};
    if (search) {
      query.$or = [{ team_name: { $regex: search, $options: "i" } }];
    }
    const totalProjects = await TeamModel.countDocuments();
    const project = await TeamModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalPages = Math.ceil(totalProjects / limit);
    if (!project) return res.status(400).json({ message: "No team found" });
    res
      .status(200)
      .json({ page, limit, totalPages, totalProjects, projects: project });
  } catch (error) {
    console.log(`Error fetching team: ${error}`);
  }
};
