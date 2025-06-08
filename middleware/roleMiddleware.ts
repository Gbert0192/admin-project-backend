// import { Request, Response, NextFunction } from "express";
// import { getRolesWithPermissions } from "../models/roleModels.js";

// interface Role {
//   id: number;
//   role_name: string;
//   permission_id: number;
//   created_at?: Date;
//   updated_at?: Date;
//   deleted_at?: Date | null;
// }

// interface Permission {
//   id: number;
//   route: string;
//   created_at?: Date;
//   updated_at?: Date;
//   deleted_at?: Date | null;
// }

// export const authorizeRoles = async (
//   req: Request,
//   res: Response,
//   next: NextFunction
// ) => {
//   try {
//     const roles = await getRolesWithPermissions();
//     const userRole = roles.find(
//       (role) => role.id === req.user?.role_id
//     ) as Role;
//     if (!userRole) {
//       throw new Error("Role not found");
//     }

//     // const userPermission = (await getPermissionById(
//     //   userRole.permission_id
//     // )) as Permission;
//     // if (!userPermission) {
//     //   throw new Error("Permission not found");
//     // }

//     // const currentPath = req.originalUrl;
//     // const routePatterns = userPermission.route.split(",").map((r) => r.trim());

//     // const hasAccess = routePatterns.some((pattern) => {
//     //   if (pattern.endsWith("*")) {
//     //     const prefix = pattern.slice(0, -1);
//     //     return currentPath.startsWith(prefix);
//     //   }
//     //   return pattern === currentPath;
//     // });

//     // if (!hasAccess) {
//     //   return res.status(403).json({
//     //     message: "Access denied. Role or permission not found.",
//     //   });
//     // }

//     next();
//   } catch (error) {
//     res.status(403).json({
//       message:
//         (error as Error).message ||
//         "Access denied. Role or permission not found.",
//     });
//   }
// };
