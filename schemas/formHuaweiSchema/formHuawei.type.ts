export interface FormHuawei {
  id: number;
  uuid: string;
  form_title: string;
  form_description: string;
  is_published: boolean;
  published_essay_count: number;
  published_multiple_choice_count: number;
  published_single_choice_count: number;
  published_true_false_count: number;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}

export interface QuestionHuawei {
  id: number;
  uuid: string;
  form_id: number;
  type: "SINGLE_CHOICE" | "MULTIPLE_CHOICE" | "TRUE_FALSE" | "ESSAY";
  point: number;
  difficulty: "EASY" | "MEDIUM" | "HOT";
  question: string;
  created_at: Date;
  updated_at: Date | null;
}

export interface OptionHuawei {
  id: number;
  question_id: number;
  option_text: string;
  is_correct: boolean;
  created_at: Date;
  updated_at: Date | null;
}
