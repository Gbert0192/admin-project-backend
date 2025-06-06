import { BaseModel } from "./baseModel.js";
export class UserModel extends BaseModel {
    constructor() {
        super(...arguments);
        this.deleteUserById = async (id) => {
            try {
                const query = "UPDATE users SET deleted_at = NOW() WHERE id = $1 RETURNING *";
                const { rows } = await this._db.query(query, [id]);
                return rows[0];
            }
            catch (error) {
                throw new Error(error.message);
            }
        };
    }
    async getUsers() {
        try {
            const query = "SELECT * FROM users where deleted_at is null";
            const result = await this._db.query(query);
            return result.rows;
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getUserById(id) {
        try {
            const query = "SELECT * FROM users WHERE id = $1";
            const { rows } = await this._db.query(query, [id]);
            return rows[0];
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
    async getUserByStudentId(id) {
        try {
            const query = "SELECT * FROM users WHERE student_id = $1";
            const res = await this._db.query(query, [id]);
            return res.rows[0];
        }
        catch (error) {
            throw new Error(error.message);
        }
    }
}
//# sourceMappingURL=userModel.js.map