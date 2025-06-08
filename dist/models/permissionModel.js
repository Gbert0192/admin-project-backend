import { BaseModel } from "./baseModel.js";
export class PermissionModel extends BaseModel {
    async createPermission(routes) {
        try {
            const query = "INSERT INTO permissions (route) VALUES ($1) RETURNING *";
            const result = await this._db.query(query, [routes]);
            return result.rows[0];
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getAllPermissions() {
        try {
            const query = "SELECT * FROM permissions WHERE deleted_at IS NULL";
            const result = await this._db.query(query);
            return result.rows;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getPermissionById(id) {
        try {
            const query = "SELECT * FROM permissions WHERE id = $1";
            const result = await this._db.query(query, [id]);
            return result.rows[0] || null;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async updatePermission(id, route) {
        try {
            const query = "UPDATE permissions SET route = $1 WHERE id = $2 RETURNING *";
            const result = await this._db.query(query, [route, id]);
            return result.rows[0] || null;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async deletePermission(id) {
        try {
            const query = "DELETE FROM permissions WHERE id = $1 RETURNING *";
            const result = await this._db.query(query, [id]);
            return result.rows[0] || null;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
//# sourceMappingURL=permissionModel.js.map