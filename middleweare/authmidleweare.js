import jwt from "jsonwebtoken";
import EmployeModel from "../models/EmployesModel.js";
export const authorize = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: "Unauthorized User" });
    }
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // DataBase mai check user
    const user = await EmployeModel.findOne({
      _id: decode.id,
      is_active: 1,
      deleted_at: null,
    });
    /* if we are soft deleting users then why are we using findbyid and not checking if user is deleted or not 
    . soft deleted user can still access all resources */
    if (!user) {
      return res.status(400).json({ message: "User not found or Inactive " });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(`Authorization realted error,${error}`);
  }
};
export default authorize;
