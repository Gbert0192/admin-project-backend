import {
  FormHuaweiBodySchema,
  FormHuaweiQuerySchema,
  FormHuaweiUpdateBodySchema,
} from "../schemas/formHuaweiSchema/formHuawei.schema.js";
import { FormHuawei } from "../schemas/formHuaweiSchema/formHuawei.type.js";
import { createQueryParams } from "../utils/queryHelper.js";
import { BaseModel } from "./baseModel.js";

interface FormHuaweiResponse extends FormHuawei {
  total: number;
}

export class FormHuaweiModel extends BaseModel {
  async create(payload: FormHuaweiBodySchema) {
    const value = Object.values(payload);
    const placeholder = value.map((_, i) => `$${i + 1}`).join(", ");
    const keys = Object.keys(payload).join(", ");
    const query = `INSERT INTO form_huawei (${keys}) VALUES (${placeholder}) RETURNING *`;
    const result = await this._db.query(query, value);
    const forms = result.rows[0];
    return forms;
  }
  async get(q: FormHuaweiQuerySchema) {
    const { limit = 10, page = 1, ...filters } = q;
    const offset = (page - 1) * limit;
    const { conditions, values } = createQueryParams(filters);
    const query = `
      SELECT *, COUNT(*) OVER() as total
      FROM form_huawei
      WHERE deleted_at IS NULL ${conditions}
      ORDER BY updated_at DESC NULLS LAST
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    const result = await this._db.query(query, [...values, limit, offset]);
    const rows = result.rows as FormHuaweiResponse[];
    const total = rows[0]?.total ?? "0";
    return {
      data: rows,
      total: Number(total),
      limit: Number(limit ?? 0),
    };
  }
  async getByTitle(name: string) {
    const query = `SELECT * FROM form_huawei WHERE form_title = $1 and deleted_at is null`;
    const result = await this._db.query(query, [name]);
    const forms = result.rows[0];
    return forms as FormHuawei;
  }

  async update(payload: FormHuaweiUpdateBodySchema) {
    const query = `UPDATE form_huawei SET form_title = $1, form_description = $2 WHERE uuid = $3 returning *`;
    const result = await this._db.query(query, [
      payload.form_title,
      payload.form_description,
      payload.uuid,
    ]);
    const forms = result.rows[0] as FormHuawei;
    return forms;
  }
  async delete(uuid: string) {
    const query = `UPDATE form_huawei SET deleted_at = NOW() WHERE uuid = $1 and deleted_at is null returning *`;
    const result = await this._db.query(query, [uuid]);
    const forms = result.rows[0] as FormHuawei;
    return forms;
  }
}
