export interface FormKahoot {
  id: number;
  uuid: string;
  form_title: string;
  form_description: string;
  is_published: boolean;
  published_single_choice_count: number;
  published_multiple_choice_count: number;
  published_true_false_count: number;
  duration: number;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface QuestionKahoot {
  id: number;
  uuid: string;
  form_id: number;
  question_text: string;
  question_type: "single_choice" | "multiple_choice" | "true_false";
  created_at: Date;
  updated_at: Date | null;
}

export interface OptionKahoot {
  id: number;
  question_id: number;
  option_text: string;
  is_correct: boolean;
  created_at: Date;
  updated_at: Date | null;
}

export interface AnswerSubmission {
  questionUuid: string;
  playerUuid: string;
  answered_at: number;
  selected_option: string;
  question_started_at: number;
}