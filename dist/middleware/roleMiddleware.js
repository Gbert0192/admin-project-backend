import { getPermissionById } from "../models/permissionModel.js";
import { getRolesWithPermissions } from "../models/roleModels.js";
export const authorizeRoles = () => {
    return async (req, res, next) => {
        try {
            const roles = await getRolesWithPermissions();
            const userRole = roles.find(role => role.id === req.user?.role_id);
            if (!userRole) {
                throw new Error("Role not found");
            }
            const userPermission = await getPermissionById(userRole.permission_id);
            if (!userPermission) {
                throw new Error("Permission not found");
            }
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
        }
        catch (error) {
            res.status(403).json({
                message: error.message || "Access denied. Role or permission not found.",
            });
        }
    };
};
//# sourceMappingURL=roleMiddleware.js.map