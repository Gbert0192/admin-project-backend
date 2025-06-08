export interface Role {
  id: number;
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  uuid: string;
  permission_id: number[];
  role_name: string;
}
