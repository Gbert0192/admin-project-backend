export interface FormKahoot {
  id: number;
  uuid: string;
  form_title: string;
  form_description: string;
  is_published: boolean;
  created_at: Date;
  updated_at: Date | null;
  deleted_at: Date | null;
}
