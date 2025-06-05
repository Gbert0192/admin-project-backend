export interface User {
  id: number;
  uuid: string;
  student_id: string;
  name: string;
  password: string;
  role_id: number;
  created_at: Date;
  updated_at: Date;
  deleted_at: Date;
}
