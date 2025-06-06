import { BaseModel } from "./baseModel.js";

interface Permission {
  id: number;
  route: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export class PermissionModel extends BaseModel {
  async createPermission(routes: string[]): Promise<Permission> {
    try {
      const query = "INSERT INTO permissions (route) VALUES ($1) RETURNING *";
      const result = await this._db.query(query, [routes]);
      return result.rows[0];
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getAllPermissions(): Promise<Permission[]> {
    try {
      const query = "SELECT * FROM permissions WHERE deleted_at IS NULL";
      const result = await this._db.query(query);
      return result.rows;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async getPermissionById(id: number): Promise<Permission | null> {
    try {
      const query = "SELECT * FROM permissions WHERE id = $1";
      const result = await this._db.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error((error as Error).message);  
    }
  }

  async updatePermission(id: number, route: string): Promise<Permission | null> {
    try {
      const query = "UPDATE permissions SET route = $1 WHERE id = $2 RETURNING *";
      const result = await this._db.query(query, [route, id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }

  async deletePermission(id: number): Promise<Permission | null> {
    try {
      const query = "DELETE FROM permissions WHERE id = $1 RETURNING *";
      const result = await this._db.query(query, [id]);
      return result.rows[0] || null;
    } catch (error) {
      throw new Error((error as Error).message);
    }
  }
}
