import { CreateQuestionsWithOptionsSchema } from "../schemas/formKahootSchema/createQuestionKahoot.schema.js";
import { BaseModel } from "./baseModel.js";

export class QuestionKahootModel extends BaseModel {
  // masih belum kelar, bkl diubah
  async createQuestionKahoot(payload: CreateQuestionsWithOptionsSchema) {
    const query = `INSERT INTO question_kahoot (question_text, question_type, duration) VALUES ($1, $2, $3) RETURNING *`;

    const result = await this._db.query(query, [
      payload.question_text,
      payload.question_type,
      payload.duration,
    ]);

    const questionId = result.rows[0].id;

    const optionsQuery = `INSERT INTO options_kahoot (question_id, option_text, is_correct) VALUES ($1, $2, $3) RETURNING *`;

    const optionsPromises = payload.options.map((option) =>
      this._db.query(optionsQuery, [
        questionId,
        option.option_text,
        option.is_correct,
      ])
    );

    const optionsResults = await Promise.all(optionsPromises);
    const options = optionsResults.map((result) => result.rows[0]);
    return {
      ...result.rows[0],
      options: options,
    };
  }
}
