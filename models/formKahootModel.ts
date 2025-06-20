import {
  FormKahootBodySchema,
  FormKahootQuerySchema,
  FormKahootUpdateBodySchema,
} from "../schemas/formKahootSchema/formKahoot.schema.js";
import { FormKahoot } from "../schemas/formKahootSchema/formKahoot.type.js";
import { createQueryParams } from "../utils/queryHelper.js";
import { BaseModel } from "./baseModel.js";

export class FormKahootModel extends BaseModel {
  async createFormKahoot(payload: FormKahootBodySchema) {
    const value = Object.values(payload);
    const placeholder = value.map((_, i) => `$${i + 1}`).join(", ");
    const keys = Object.keys(payload).join(", ");
    const query = `INSERT INTO form_kahoot (${keys}) VALUES (${placeholder}) RETURNING *`;
    const result = await this._db.query(query, value);
    return result.rows[0] as FormKahoot;
  }

  async getAllFormKahoots(form: FormKahootQuerySchema) {
    const { limit = 10, page = 1, ...filters } = form;
    const offset = (page - 1) * limit;
    const { conditions, values } = createQueryParams(filters);

    const query = `
      SELECT *, COUNT(*) OVER() as total
      FROM form_kahoot
      WHERE deleted_at IS NULL ${conditions}
      ORDER BY updated_at DESC NULLS LAST
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;

    const result = await this._db.query(query, [...values, limit, offset]);
    const rows = result.rows as (FormKahoot & { total: number })[];
    const total = rows[0]?.total ?? "0";

    return {
      data: rows,
      total: Number(total),
      limit: Number(limit ?? 0),
    };
  }

  async getFormKahootByTitle(name: string) {
    const query = `
            SELECT * FROM form_kahoot WHERE form_title = $1 AND deleted_at IS NULL
        `;
    const result = await this._db.query(query, [name]);
    return result.rows[0] as FormKahoot;
  }

  async updateFormKahoot(payload: FormKahootUpdateBodySchema) {
    const query = `
            UPDATE form_kahoot
            SET form_title = $1, form_description = $2, is_published = $3
            WHERE uuid = $4
            RETURNING *
        `;
    const result = await this._db.query(query, [
      payload.form_title,
      payload.form_description,
      payload.is_published,
      payload.uuid,
    ]);
    return result.rows[0] as FormKahoot;
  }

  async deleteFormKahoot(uuid: string) {
    const query = `
            UPDATE form_kahoot
            SET deleted_at = NOW()
            WHERE uuid = $1
            RETURNING *
        `;
    const result = await this._db.query(query, [uuid]);
    return result.rows[0] as FormKahoot;
  }
}
