export interface Role {
  id: number;
  uuid: string;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  permission_id: number[];
  role_name: string;
}
