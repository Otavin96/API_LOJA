import { StatusPermission } from "@/clients/domain/models/clients.model";

export type ClientOutput = {
  id: string;
  username: string;
  password: string;
  roles?: StatusPermission
  created_at: Date;
  updated_at: Date;
};
