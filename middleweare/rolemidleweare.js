export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
        // role Match Check
      if (!allowedRoles.includes(req.user.role.name)) {
        return res.status(403).json({
          message: `Access Denied. Allowed roles: ${allowedRoles.join(", ")}`,
        });
      }

      next();
    } catch (error) {
      console.log("Role Middleware Error:", error.message);
      res.status(500).json({ message: "Server Error" });
    }
  };
};
export default checkRole;