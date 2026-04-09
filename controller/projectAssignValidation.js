import e from "express";
import Joi from "joi";
export const createAssignValidation = Joi.object({
    project_name: Joi.string().max(100).required(),
    project_description: Joi.string().max(500).required(),
    employees: Joi.array().items(
        Joi.object({
            employee: Joi.string().required(),
            role_in_project: Joi.string().required()
        })
    ).required()
});
export const updateAssignValidation = Joi.object({
    project_name: Joi.string().max(100).required(),
 project_description: Joi.string().max(500).required(),
    employees: Joi.array().items(
        Joi.object({
            employee: Joi.string().required(),
            role_in_project: Joi.string().required()
        })
    ).required()
});
export const validateAssignRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error)
        {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
} 