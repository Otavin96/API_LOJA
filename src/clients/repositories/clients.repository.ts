import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { ClientsModel, StatusPermission } from "../domain/models/clients.model";

export type CreateClientsProps = {
  username: string;
  password: string;
  roles?: StatusPermission;
};

export interface ClientsRepository
  extends RepositoryInterface<ClientsModel, CreateClientsProps> {
  findByUsername(username: string): Promise<ClientsModel>;
  authentication(username: string, password: string): Promise<void>;
}
