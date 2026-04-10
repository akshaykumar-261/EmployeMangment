import Joi from "joi";
export const createTeamValidation = Joi.object({
  team_name: Joi.string().max(100).required(),
  team_leade: Joi.string().required(),
  technology: Joi.string().required(),
  members: Joi.array()
    .items(
      Joi.object({
        employees: Joi.string().required(),
        role_in_team: Joi.string().required(),
      }),
    )
    .required(),
});
export const updateTeamValidation = Joi.object({
  team_name: Joi.string().max(100).allow(null, ""),
  team_leade: Joi.string().allow(null, ""),
  technology: Joi.string().allow(null, ""),
  members: Joi.array()
    .items(
      Joi.object({
        employees: Joi.string().required(),
        role_in_team: Joi.string().required(),
      }),
    )
    .allow(null, ""),
});
export const validateTeamRequest = (schema) => {
  return (req, res, next) => {
    const { error } = schema.validate(req.body);
    if (error) {
      return res.status(400).json({ error: error.details[0].message });
    }
    next();
  };
};
