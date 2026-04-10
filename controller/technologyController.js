import TechnologyModel from "../models/technolgyModel.js";
export const createTechnology = async (req, res) => {
  try {
    const { frontend, backend, database } = req.body;
    const tech = await TechnologyModel.create({
      frontend,
      backend,
      database,
    });
    return res
      .status(201)
      .json({ message: "Technology Created Successfully", data: tech });
  } catch (error) {
    console.log(`Error creating technology: ${error}`);
  }
};
export const updateTech = async (req, res) => {
  try {
    const { id } = req.params;
    const { frontend, backend, database } = req.body;
    const tech = await TechnologyModel.findByIdAndUpdate(id, {
      frontend,
      backend,
      database,
    });
    if (!tech) {
      return res.status(400).json({ message: "Technology Not Found" });
    }
    return res
      .status(200)
      .json({ message: "Technology update successfuly", data: team });
  } catch (error) {
    console.log(`Error updatng team,${error}`);
  }
};

export const getTech = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 3;
    const skip = (page - 1) * limit;
    const { search } = req.query;
    const query = {};
    if (search) {
      query.$or = [
        { frontend: { $regex: search, $options: "i" } },
        { backend: { $regex: search, $options: "i" } },
        { database: { $regex: search, $options: "i" } },
      ];
    }
    const totalProjects = await TechnologyModel.countDocuments();
    const project = await TechnologyModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 });
    const totalPages = Math.ceil(totalProjects / limit);
    if (!project)
      return res.status(400).json({ message: "No Technologies found" });
    res
      .status(200)
      .json({ page, limit, totalPages, totalProjects, projects: project });
  } catch (error) {
    console.log(`Error fetching technology: ${error}`);
  }
};

export const deleteTech = async (req, res) => {
  try {
    const userId = req.params.id;
    const team = await TechnologyModel.findById(userId);
    if (!team) {
      return res.status(404).json({ message: "Employee deleted successfuly" });
    }
    team.is_active = 0;
    team.deleted_at = new Date();
    await team.save();
    res.status(200).json({ message: "technology deleted successfully" });
  } catch (error) {
    console.log(`Error while deleting technology,${error}`);
  }
};
