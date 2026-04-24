import TeamModel from "../models/teamModule.js";

export const teamCreated = (data) => {
  return TeamModel.create(data);
};

export const teamUpdate = (id, data) => {
  return TeamModel.findByIdAndUpdate(id, data, { new: true });
};

export const teamDeleted = (id) => {
  return TeamModel.findByIdAndUpdate(
    id,
    {
      is_active: false,
      deleted_at: new Date(),
    },
    { new: true },
  );
};

export const getTeamList = async ({ page, limit, search }) => {
  const skip = (page - 1) * limit;
  const query = {};
  if (search) {
    query.$or = [
      (query.$or = [{ team_name: { $regex: search, $options: "i" } }]),
    ];
  }
  const [team, totalTeam] = await Promise.all([
    TeamModel.find(query).skip(skip).limit(limit).sort({ created: -1 }),
    TeamModel.countDocuments(query),
  ]);
  return {
    team,
    totalTeam,
    teamPages: Math.ceil(totalTeam / limit),
  };
};
