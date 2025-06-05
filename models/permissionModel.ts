import pool from "../config/database.js";

interface Permission {
  id: number;
  route: string;
  created_at?: Date;
  updated_at?: Date;
  deleted_at?: Date | null;
}

export const createPermission = async (route: string): Promise<Permission> => {
  try {
    const query = "INSERT INTO permissions (route) VALUES ($1) RETURNING *";
    const result = await pool.query(query, [route]);
    return result.rows[0];
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getAllPermissions = async (): Promise<Permission[]> => {
  try {
    const query = "SELECT * FROM permissions WHERE deleted_at IS NULL";
    const result = await pool.query(query);
    return result.rows;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const getPermissionById = async (id: number): Promise<Permission | null> => {
  try {
    const query = "SELECT * FROM permissions WHERE id = $1";
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const updatePermission = async (id: number, route: string): Promise<Permission | null> => {
  try {
    const query = "UPDATE permissions SET route = $1 WHERE id = $2 RETURNING *";
    const result = await pool.query(query, [route, id]);
    return result.rows[0] || null;
  } catch (error) {
    throw new Error((error as Error).message);
  }
};

export const deletePermission = async (id: number): Promise<Permission | null> => {
  try {
    const query = "DELETE FROM permissions WHERE id = $1 RETURNING *";
    const result = await pool.query(query, [id]);
    return result.rows[0] || null;
  } catch (error) {
    throw new Error((error as Error).message);
  }
}; 