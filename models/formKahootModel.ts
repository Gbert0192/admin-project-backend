import {
  FormKahootBodySchema,
  FormKahootQuerySchema,
  FormKahootUpdateBodySchema,
  OptionsKahootSchema,
  QuestionKahootQuerySchema,
  QuestionsKahootBodySchema,
  QuestionsKahootUpdateBodySchema,
} from "../schemas/formKahootSchema/formKahoot.schema.js";
import {
  FormKahoot,
  OptionKahoot,
  QuestionKahoot,
} from "../schemas/formKahootSchema/formKahoot.type.js";
import { createQueryParams } from "../utils/queryHelper.js";
import { BaseModel } from "./baseModel.js";

interface FormKahootResponse extends FormKahoot {
  total: number;
}

interface FormKahootQuestionResponse extends QuestionKahoot {
  options: OptionsKahootSchema[];
  total: number;
}


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
    const rows = result.rows as FormKahootResponse[];
    const total = rows[0]?.total ?? "0";

    return {
      data: rows,
      total: Number(total),
      limit: Number(limit ?? 0),
    };
  }

   async getAllDataFormKahoots(uuid: string) {
        const query = `SELECT * FROM form_kahoot WHERE uuid = $1 and deleted_at is null`;
        const result = await this._db.query(query, [uuid]);
        const forms = result.rows[0];
        return forms as FormKahoot;
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
            SET form_title = $1, form_description = $2, is_published = $3, updated_at = NOW()
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

  // Questions
  async createQuestionKahoot(
    payload: QuestionsKahootBodySchema,
    formId: number
  ) {
    const query = `
            INSERT INTO questions_kahoot (form_id, question_text, question_type)
            VALUES ($1, $2, $3) RETURNING *
        `;
    const questionResult = await this._db.query(query, [
      formId,
      payload.question_text,
      payload.question_type,
    ]);

    const newQuestion = questionResult.rows[0] as QuestionKahoot;
    const questionId = newQuestion.id;

    let optionsToReturn = [];

    const optionsArray = payload.options as OptionsKahootSchema[];
    const optionsQuery = `INSERT INTO options_kahoot (question_id, option_text, is_correct) VALUES ($1, $2, $3) RETURNING *`;
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
    ) as OptionsKahootSchema[];

    return {
      question: newQuestion,
      options: optionsToReturn,
    };
  }

  async getQuestionsKahoot(q: QuestionKahootQuerySchema, form_id: number) {
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
          FROM questions_kahoot q
          LEFT JOIN options_kahoot o ON o.question_id = q.id
          WHERE q.form_id = $${values.length + 3} ${conditions}
          GROUP BY q.id
          ORDER BY q.updated_at DESC NULLS LAST
          LIMIT $${values.length + 1} OFFSET $${values.length + 2}`;
    
        const result = await this._db.query(query, [
          ...values,
          limit,
          offset,
          form_id,
        ]);
    
        const rows = result.rows as FormKahootQuestionResponse[];
        const total = rows[0]?.total ?? "0";
        return {
          data: rows,
          total: Number(total),
          limit: Number(limit ?? 0),
        };
  }

  async updateQuestionKahoot(payload: QuestionsKahootUpdateBodySchema) {
    const updateQuestionQuery = `UPDATE questions_kahoot SET question_text = $1, question_type = $2 WHERE uuid = $3 RETURNING *`;
    const questionUpdateResult = await this._db.query(updateQuestionQuery, [
      payload.question_text,
      payload.question_type,
      payload.uuid,
    ]);

    const updatedQuestion = questionUpdateResult.rows[0] as QuestionKahoot;
    const questionsOptions = await this._db.query(`SELECT * FROM options_kahoot WHERE question_id = $1`, [updatedQuestion.id]);
    const options = questionsOptions.rows as OptionKahoot[];
    const optionIdsToDelete = options.map((option) => option.id);

    const optionsDeleteQueryAny = `DELETE FROM options_kahoot WHERE id = ANY($1::int[])`;
    await this._db.query(optionsDeleteQueryAny, [optionIdsToDelete]);

    let optionsToReturn = [];

        const optionsArray = payload.options as OptionsKahootSchema[];
    const optionsQuery = `INSERT INTO options_kahoot (question_id, option_text, is_correct) VALUES ($1, $2, $3) RETURNING *`;
    const optionsQueryPromises = optionsArray.map((option) =>
      this._db.query(optionsQuery, [
        updatedQuestion.id,
        option.option_text,
        option.is_correct,
      ])
    );

    const optionsResults = await Promise.all(optionsQueryPromises);
    optionsToReturn = optionsResults.map(
      (result) => result.rows[0]
    ) as OptionsKahootSchema[];

    return {
      question: updatedQuestion,
      options: optionsToReturn,
    };
    
  }
}
