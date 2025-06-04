import { getPermissionById } from "../models/permissionModel.js";
import { getRoleById } from "../models/roleModels.js";

export const authorizeRoles = () => {
  return async (req, res, next) => {
    const userRole = await getRoleById(req.user.role_id);
    const userPermission = await getPermissionById(userRole.permission_id);

    const currentPath = req.originalUrl;
    const routePatterns = userPermission.route.split(",").map((r) => r.trim());

    const hasAccess = routePatterns.some((pattern) => {
      if (pattern.endsWith("*")) {
        const prefix = pattern.slice(0, -1);
        return currentPath.startsWith(prefix);
      }
      return pattern === currentPath;
    });

    if (!hasAccess) {
      return res.status(403).json({
        message: "Access denied. Role or permission not found.",
      });
    }

    next();
  };
};
