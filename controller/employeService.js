import EmployeModel from "../models/EmployesModel.js";
import ProjectAssignModel from "../models/projectAssignModule.js";

export const findEmploye = (email) => {
  return EmployeModel.findOne({ email });
};

export const createEmp = (data) => {
  return EmployeModel.create(data);
};

export const findEmpAndDelete = (id) => {
    return EmployeModel.findByIdAndUpdate(id, {
        is_active: false,
        deleted_at: new Date(),
    },{new:true},)
};
export const updateEmployeById = (id, data) => {
  return EmployeModel.findByIdAndUpdate(id, data, { new: true });
};
export const getEmployeeList = async ({ page = 1, limit = 10 }) => {
  const parsedLimit = parseInt(limit);
  const skip = (page - 1) * parsedLimit;
  const result = await EmployeModel.aggregate([
    {
      $match: {
        is_active: true,
        deleted_at: null,
      },
    },
    {
      $facet: {
        employees: [
          { $sort: { createdAt: -1 } },
          { $skip: skip },
          { $limit: parseInt(limit) },
        ],
        totalCount: [{ $count: "count" }],
      },
    },
  ]);
  const employees = result[0]?.employees || [];
  const totalEmployees = result[0]?.totalCount[0]?.count || 0;
  const totalPages = Math.ceil(totalEmployees / parsedLimit);
  return {
    employees,
    totalEmployees,
    totalPages,
  };
};
