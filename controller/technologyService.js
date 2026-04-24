import TechnologyModel from "../models/technolgyModel.js";

export const technologyCreated = (data) => {
  return TechnologyModel.create(data);
};

export const technologyUpdate = (id, data) => {
  return TechnologyModel.findByIdAndUpdate(id, data, { new: true });
};

export const technologyDeleted = (id) => {
  return TechnologyModel.findByIdAndUpdate(
    id,
    {
      is_active: false,
      delete_at: new Date(),
    },
    { new: true },
  );
};

export const getTechnologyList = async ({ page, limit, search }) => {
  const skip = (page - 1) * limit;
  const query = {};
  if (search) {
    query.$or = [
      { frontend: { $regex: search, $options: "i" } },
      { backend: { $regex: search, $options: "i" } },
      { database: { $regex: search, $options: "i" } },
    ];
  }
  const [technology, totaltechnology] = await Promise.all([
    TechnologyModel.find(query).skip(skip).limit(limit).sort({ created: -1 }),
    TechnologyModel.countDocuments(query),
  ]);
  return {
    technology,
    totaltechnology,
    totalPages: Math.ceil(totaltechnology / limit),
  };
};
