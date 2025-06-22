import {
  FormHuaweiBodySchema,
  FormHuaweiQuerySchema,
  FormHuaweiQuestionQuerySchema,
  FormHuaweiUpdateBodySchema,
  OptionHuaweiSchema,
  PublishFormBodySchema,
  QuestionsHuaweiBodySchema,
} from "../schemas/formHuaweiSchema/formHuawei.schema.js";
import {
  FormHuawei,
  QuestionHuawei,
} from "../schemas/formHuaweiSchema/formHuawei.type.js";
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
  async getDetails(uuid: string) {
    const query = `SELECT * FROM form_huawei WHERE uuid = $1 and deleted_at is null`;
    const result = await this._db.query(query, [uuid]);
    const forms = result.rows[0];
    return forms as FormHuawei;
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

  async createQuestion(payload: QuestionsHuaweiBodySchema, formId: number) {
    const query = `INSERT INTO questions_huawei (type, point, difficulty, question, form_id) VALUES ($1, $2, $3, $4, $5) RETURNING *`;

    const questionResult = await this._db.query(query, [
      payload.type,
      payload.point,
      payload.difficulty,
      payload.question,
      formId,
    ]);

    const newQuestion = questionResult.rows[0] as QuestionHuawei;
    const questionId = newQuestion.id;

    let optionsToReturn = [];

    const optionsArray = payload.options as OptionHuaweiSchema[];
    const optionsQuery = `INSERT INTO options_huawei (question_id, option_text, is_correct) VALUES ($1, $2, $3) RETURNING *`;
    const optionsQueryPromises = optionsArray.map((option) =>
      this._db.query(optionsQuery, [
        questionId,
        option.option_text,
        option.is_correct,
      ])
    );
    const optionsResults = await Promise.all(optionsQueryPromises);
    optionsToReturn = optionsResults.map(
      (result) => result.rows[0]
    ) as OptionHuaweiSchema[];

    return {
      question: newQuestion,
      options: optionsToReturn,
    };
  }

  async publish(payload: PublishFormBodySchema) {
    const {
      essay_question,
      multiple_choise_question,
      single_choise_question,
      true_false_question,
      uuid,
      is_published,
    } = payload;
    const query = `UPDATE form_huawei SET is_published = $1, published_essay_count = $2, published_multiple_choice_count = $3, published_single_choice_count = $4, published_true_false_count = $5, WHERE uuid = $2 returning *`;
    const result = await this._db.query(query, [
      is_published,
      essay_question,
      multiple_choise_question,
      single_choise_question,
      true_false_question,
      uuid,
    ]);
    const forms = result.rows[0] as FormHuawei;
    return forms;
  }

  async getQuestion(q: FormHuaweiQuestionQuerySchema, form_id: number) {
    const { limit = 10, page = 1, ...filters } = q;
    const offset = (page - 1) * limit;
    const { conditions, values } = createQueryParams(filters);
    const query = `
      SELECT *, COUNT(*) OVER() as total
      FROM questions_huawei
      WHERE form_id = $${values.length + 3} ${conditions}
      ORDER BY updated_at DESC NULLS LAST
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;

    const result = await this._db.query(query, [
      ...values,
      limit,
      offset,
      form_id,
    ]);

    const rows = result.rows as FormHuaweiResponse[];
    const total = rows[0]?.total ?? "0";
    return {
      data: rows,
      total: Number(total),
      limit: Number(limit ?? 0),
    };
  }
}
