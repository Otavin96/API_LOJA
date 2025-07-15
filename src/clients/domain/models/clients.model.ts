export enum StatusPermission {
  ADMIN = "admin",
  CLIENT = "client",
} 

export interface ClientsModel {
  id: string;
  username: string;
  password: string;
  roles?: StatusPermission;
  created_at: Date;
  updated_at: Date;
}
