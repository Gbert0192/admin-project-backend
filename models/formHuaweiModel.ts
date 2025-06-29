import {
  FormHuaweiBodySchema,
  FormHuaweiQuerySchema,
  FormHuaweiQuestionQuerySchema,
  FormHuaweiUpdateBodySchema,
  OptionHuaweiSchema,
  QuestionsHuaweiBodySchema,
  QuestionsHuaweiUpdateBodySchema,
} from "../schemas/formHuaweiSchema/formHuawei.schema.js";
import {
  FormHuawei,
  OptionHuawei,
  QuestionHuawei,
} from "../schemas/formHuaweiSchema/formHuawei.type.js";
import { createQueryParams } from "../utils/queryHelper.js";
import { BaseModel } from "./baseModel.js";

interface FormHuaweiResponse extends FormHuawei {
  total: number;
  essay_count: number;
  single_choice_count: number;
  multiple_choice_count: number;
  true_false_count: number;
}

interface FormHuaweiQuestionResponse extends QuestionHuawei {
  options: OptionHuaweiSchema[];
  total: number;
}

interface QuestionIdMap {
  id: number;
  uuid: string;
}
export class FormHuaweiModel extends BaseModel {
  async create(payload: FormHuaweiBodySchema) {
    const value = Object.values(payload);
    const placeholder = value.map((_, i) => `$${i + 1}`).join(", ");
    const keys = Object.keys(payload).join(", ");
    const query = `INSERT INTO form_huawei (${keys}) VALUES (${placeholder}) RETURNING *`;
    const result = await this._db.query(query, value);
    const forms = result.rows[0];
    return forms as FormHuawei;
  }

  async getPublished(userId: number) {
    const query = `
    SELECT 
      fh.*
    FROM 
      form_huawei fh
    WHERE 
      fh.is_published = true 
      AND fh.deleted_at IS NULL
      AND NOT EXISTS (
        SELECT 1 
        FROM huawei_quiz_attempts hqa
        WHERE 
          hqa.form_huawei_id = fh.id AND hqa.user_id = $1
      );
  `;

    const result = await this._db.query(query, [userId]);
    return result.rows as FormHuawei[];
  }
  async get(q: FormHuaweiQuerySchema) {
    const { limit = 10, page = 1, ...filters } = q;
    const offset = (page - 1) * limit;
    const { conditions, values } = createQueryParams(filters);

    const query = `
      SELECT
        fh.*,
        COUNT(*) OVER() as total,
        COUNT(CASE WHEN qh.type = 'ESSAY' THEN 1 END) AS essay_count,
        COUNT(CASE WHEN qh.type = 'SINGLE_CHOICE' THEN 1 END) AS single_choice_count,
        COUNT(CASE WHEN qh.type = 'MULTIPLE_CHOICE' THEN 1 END) AS multiple_choice_count,
        COUNT(CASE WHEN qh.type = 'TRUE_FALSE' THEN 1 END) AS true_false_count
      FROM
        form_huawei AS fh
      LEFT JOIN
        questions_huawei AS qh ON fh.id = qh.form_id
      WHERE
        fh.deleted_at IS NULL ${conditions}
      GROUP BY
        fh.id, fh.form_title, fh.created_at, fh.updated_at, fh.deleted_at 
      ORDER BY
        GREATEST(fh.updated_at, fh.created_at) DESC NULLS LAST
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;

    const result = await this._db.query(query, [...values, limit, offset]);
    const rows = result.rows;
    const total = rows[0]?.total ?? "0";

    return {
      data: rows as FormHuaweiResponse[],
      total: Number(total),
      limit: Number(limit ?? 0),
    };
  }

  async getDetail(uuid: string) {
    const query = `
      SELECT
        fh.*
      FROM
        form_huawei AS fh
      LEFT JOIN
        questions_huawei AS qh ON fh.id = qh.form_id
      WHERE
        fh.deleted_at IS NULL and fh.uuid = $1 and is_published = true
      GROUP BY
        fh.id, fh.form_title, fh.created_at, fh.updated_at, fh.deleted_at 
      ORDER BY
        GREATEST(fh.updated_at, fh.created_at) DESC NULLS LAST`;

    const result = await this._db.query(query, [uuid]);
    const rows = result.rows[0];
    return rows as FormHuawei;
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
    const query = `UPDATE form_huawei SET form_title = $1, form_description = $2, updated_at = now() WHERE uuid = $3 and is_published is false returning *`;
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
      (result) => result.rows[0] as OptionHuaweiSchema
    );

    return {
      question: newQuestion,
      options: optionsToReturn,
    };
  }

  async updateQuestion(payload: QuestionsHuaweiUpdateBodySchema) {
    const updateQuestionQuery = `
        UPDATE questions_huawei
        SET type = $1, point = $2, difficulty = $3, question = $4, updated_at = now()
        WHERE uuid = $5
        RETURNING *;
    `;
    const questionUpdateResult = await this._db.query(updateQuestionQuery, [
      payload.type,
      payload.point,
      payload.difficulty,
      payload.question,
      payload.uuid,
    ]);
    const updatedQuestion = questionUpdateResult.rows[0] as QuestionHuawei;
    const questionsOptions = await this._db.query(
      `SELECT * FROM options_huawei WHERE question_id = $1`,
      [updatedQuestion.id]
    );
    const options = questionsOptions.rows as OptionHuawei[];
    const optionIdsToDelete = options.map((option) => option.id);

    const optionsDeleteQueryAny = `DELETE FROM options_huawei WHERE id = ANY($1::int[])`;
    await this._db.query(optionsDeleteQueryAny, [optionIdsToDelete]);

    let optionsToReturn = [];

    const optionsArray = payload.options as OptionHuaweiSchema[];
    const optionsQuery = `INSERT INTO options_huawei (question_id, option_text, is_correct) VALUES ($1, $2, $3) RETURNING *`;
    const optionsQueryPromises = optionsArray.map((option) =>
      this._db.query(optionsQuery, [
        updatedQuestion.id,
        option.option_text,
        option.is_correct,
      ])
    );
    const optionsResults = await Promise.all(optionsQueryPromises);
    optionsToReturn = optionsResults.map(
      (result) => result.rows[0] as OptionHuaweiSchema
    );

    return {
      question: updatedQuestion,
      options: optionsToReturn,
    };
  }

  async getQuestion(q: FormHuaweiQuestionQuerySchema, form_id: number) {
    const { limit = 10, page = 1, ...filters } = q;
    const offset = (page - 1) * limit;
    const { conditions, values } = createQueryParams(filters);
    const query = `
      SELECT
      q.*,
      COUNT(*) OVER() as total,
      COALESCE(
        json_agg(
          json_build_object(
            'id', o.id,
            'option_text', o.option_text,
            'is_correct', o.is_correct
          )
        ) FILTER (WHERE o.id IS NOT NULL), '[]'
      ) AS options
      FROM questions_huawei q
      LEFT JOIN options_huawei o ON o.question_id = q.id
      WHERE q.form_id = $${values.length + 3} ${conditions}
      GROUP BY q.id
      ORDER BY GREATEST(q.updated_at, q.created_at) DESC NULLS LAST
      LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;

    const result = await this._db.query(query, [
      ...values,
      limit,
      offset,
      form_id,
    ]);

    const rows = result.rows as FormHuaweiQuestionResponse[];
    const total = rows[0]?.total ?? "0";
    return {
      data: rows,
      total: Number(total),
      limit: Number(limit ?? 0),
    };
  }

  async publish(payload: {
    uuid: string;
    durations: number;
    is_published: boolean;
    essay_question: number;
    multiple_choice_question: number;
    single_choice_question: number;
    true_false_question: number;
  }) {
    const {
      essay_question,
      multiple_choice_question,
      single_choice_question,
      true_false_question,
      uuid,
      is_published,
      durations,
    } = payload;
    const query = `UPDATE form_huawei SET is_published = $1, published_essay_count = $2, published_multiple_choice_count = $3, published_single_choice_count = $4, published_true_false_count = $5, durations = $6, updated_at = now() WHERE uuid = $7 returning *`;
    const result = await this._db.query(query, [
      is_published,
      essay_question,
      multiple_choice_question,
      single_choice_question,
      true_false_question,
      durations,
      uuid,
    ]);
    const forms = result.rows[0] as FormHuawei;
    return forms;
  }
  async deleteQuestion(uuid: string) {
    const query = `DELETE FROM questions_huawei WHERE uuid = $1 returning *`;
    const data = await this._db.query(query, [uuid]);
    return data.rows[0] as FormHuawei;
  }

  async unPublish(uuid: string) {
    const query = `UPDATE form_huawei SET is_published = false, updated_at = now() WHERE uuid = $1 returning *`;
    const data = await this._db.query(query, [uuid]);
    return data.rows[0] as FormHuawei;
  }

  async getQuizQuestion(form_id: number) {
    const query = `
      WITH RankedQuestions AS (
        SELECT
          q.*,
          ROW_NUMBER() OVER(PARTITION BY q.type ORDER BY RANDOM()) as random_rank
        FROM
          questions_huawei q
        WHERE
          q.form_id = $1
      )
      SELECT
        rq.uuid,
        rq.question,
        rq.type,
        rq.difficulty,
        rq.point,
        rq.created_at,
        COALESCE(
          JSON_AGG(
            JSON_BUILD_OBJECT(
              'id', opt.id,
              'option_text', opt.option_text,
              'is_correct', opt.is_correct
            )
          ) FILTER (WHERE opt.id IS NOT NULL),
          '[]'::json
        ) AS options
      FROM
        RankedQuestions rq
      JOIN
        form_huawei fh ON rq.form_id = fh.id
      LEFT JOIN
        options_huawei opt ON rq.id = opt.question_id
      WHERE
        CASE
          WHEN rq.type = 'ESSAY' THEN rq.random_rank <= fh.published_essay_count
          WHEN rq.type = 'MULTIPLE_CHOICE' THEN rq.random_rank <= fh.published_multiple_choice_count
          WHEN rq.type = 'SINGLE_CHOICE' THEN rq.random_rank <= fh.published_single_choice_count
          WHEN rq.type = 'TRUE_FALSE' THEN rq.random_rank <= fh.published_true_false_count
          ELSE false
        END
      GROUP BY
        rq.id,
        rq.uuid,
        rq.question,
        rq.type,
        rq.difficulty,
        rq.point,
        rq.created_at
      ORDER BY RANDOM();
    `;
    const result = await this._db.query(query, [form_id]);
    const rows = result.rows as FormHuaweiQuestionResponse[];
    return rows;
  }

  async getIdQuestionsByUuidBulk(uuids: string[]) {
    const query = `SELECT id, uuid FROM questions_huawei WHERE uuid = ANY($1::uuid[]);`;
    const result = await this._db.query(query, [uuids]);
    return result.rows as QuestionIdMap[];
  }
}
