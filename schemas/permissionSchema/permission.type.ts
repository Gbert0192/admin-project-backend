export interface Permission {
  id: number;
  route: string | null;
  method: string[];
  created_at: string;
  updated_at: string | null;
  deleted_at: string | null;
  uuid: string | null;
  permission_name: string | null;
}
