import { FormBodySchema } from "../schemas/formSchema/form.schema.js";
import { BaseModel } from "./baseModel.js";

export class FormModel extends BaseModel {
  async create(payload: FormBodySchema) {
    const value = Object.values(payload);
    const placeholder = value.map((_, i) => `$${i + 1}`).join(", ");
    const keys = Object.keys(payload).join(", ");
    const query = `INSERT INTO forms (${keys}) VALUES (${placeholder}) RETURNING *`;
    const result = await this._db.query(query, value);
    const forms = result.rows[0];
    return forms;
  }
}
