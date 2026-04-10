import jwt from "jsonwebtoken";
import EmployeModel from "../models/EmployesModel.js";
export const authorize = async (req, res) => {
  try {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      return res.status(401).send({ message: "Unauthorized User" });
    }
    const token = authHeader.split(" ")[1];
    const decode = jwt.verify(token, process.env.JWT_SECRET);
    // DataBase mai check user
    const user = await EmployeModel.findById(decode.id);
    if (!user) {
      return res.status(400).json({ message: "User not Exit" });
    }
    req.user = user;
    next();
  } catch (error) {
    console.log(`Authorization realted error,${error}`);
  }
};
export default authorize; 
