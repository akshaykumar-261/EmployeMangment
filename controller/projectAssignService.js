import ProjectAssignModel from "../models/projectAssignModule.js";

export const createProject = (data) => {
  return ProjectAssignModel.create(data);
};

export const getProjects = async ({ page, limit, search }) => {
  const skip = (page - 1) * limit;
  const query = {};
  if (search) {
    query.$or = [
      { project_name: { $regex: search, $options: "i" } },
      { project_description: { $regex: search, $options: "i" } },
    ];
  }
  const [projects, totalProjects] = await Promise.all([
    ProjectAssignModel.find(query)
      .skip(skip)
      .limit(limit)
      .sort({ createdAt: -1 }),
    ProjectAssignModel.countDocuments(query),
  ]);
  return {
    projects,
    totalProjects,
    totalPages: Math.ceil(totalProjects / limit),
  };
};

export const getProjectById = (id) => {
  return ProjectAssignModel.findById(id);
};

export const updateProjectById = (id, data) => {
  return ProjectAssignModel.findByIdAndUpdate(id, data, { new: true });
};

export const deleteProjectById = (id) => {
  return ProjectAssignModel.findByIdAndUpdate(
    id,
    {
      is_active: false,
      deleted_at: new Date(),
    },
    { new: true },
  );
};
