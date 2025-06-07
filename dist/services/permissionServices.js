export const createPermissionService = (permissionModel) => async (routes) => {
    try {
        return permissionModel.createPermission(routes);
    }
    catch (error) {
        throw new Error(error.message);
    }
};
export const getAllPermissionsService = (permissionModel) => async () => {
    try {
        return permissionModel.getAllPermissions();
    }
    catch (error) {
        throw new Error(error.message);
    }
};
export const getPermissionByIdService = (permissionModel) => async (id) => {
    try {
        const permission = await permissionModel.getPermissionById(id);
        if (!permission) {
            throw new Error("Permission not found");
        }
        return permission;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
export const updatePermissionService = (permissionModel) => async (id, route) => {
    try {
        const permission = await permissionModel.updatePermission(id, route);
        if (!permission) {
            throw new Error("Permission not found");
        }
        return permission;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
export const deletePermissionService = (permissionModel) => async (id) => {
    try {
        const permission = await permissionModel.deletePermission(id);
        if (!permission) {
            throw new Error("Permission not found");
        }
        return permission;
    }
    catch (error) {
        throw new Error(error.message);
    }
};
//# sourceMappingURL=permissionServices.js.map