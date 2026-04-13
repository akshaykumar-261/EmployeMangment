export const checkRole = (...allowedRoles) => {
  return (req, res, next) => {
    try {
      // safety check
      if (!req.user) {
        return res.status(401).json({ message: "Unauthorized" });
      }
        // role Match Check
      if (!allowedRoles.includes(req.user.roles)) {
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