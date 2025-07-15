import { StatusPermission } from "@/clients/domain/models/clients.model";

export type GenerateAuthKeyProps = {
  access_token: string;
};

export type VerifyAuthKeyProps = {
  client_id: string;
  roles: StatusPermission
};

export interface AuthProvider {
  generateAuthKey(client_id: string, roles: StatusPermission | undefined): GenerateAuthKeyProps;
  verifyAuthKey(token: string): VerifyAuthKeyProps;
}
