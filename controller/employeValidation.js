import Joi from "joi";
export const createEmployeValidation = Joi.object({
    name: Joi.string().max(100).required(),
    lastname: Joi.string().max(100).optional().allow(null,""),
    email: Joi.string().email().required(),
    phone: Joi.string().max(10).required(),
    address: Joi.string().max(200).required(),
    salary: Joi.number().optional(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
    department: Joi.string().required(),
    is_active: Joi.number().valid(0, 1).optional(),
});
export const userIdValidator = Joi.object({
    id: Joi.string().required(),
});
 export const loginValidation = Joi.object({
     email: Joi.string().email().required(),
     password: Joi.string().min(6).required(),
 });
export const updateEmployeValidation = Joi.object({
    id: Joi.string().required(),
    name: Joi.string().max(100).required(),
    lastname: Joi.string().max(100).optional().allow(null, ""),
    email: Joi.string().email().required(),
    phone: Joi.string().max(10).required(),
    address: Joi.string().max(200).required(),
    salary: Joi.number().optional(),
    password: Joi.string().min(6).required(),
    role: Joi.string().required(),
    department: Joi.string().required(),
 })
export const validateRequest = (schema) => {
    return (req, res, next) => {
        const { error } = schema.validate(req.body);
        if (error) {
            return res.status(400).json({ error: error.details[0].message });
        }
        next();
    };
};

