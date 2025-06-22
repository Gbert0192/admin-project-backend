export interface FormHuawei {
  id: number;
  uuid: string;
  form_title: string;
  form_description: string;
  is_published: boolean;
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
