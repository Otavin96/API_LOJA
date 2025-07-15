import { ClientsModel } from "@/clients/domain/models/clients.model";
import {
  ClientsRepository,
  CreateClientsProps,
} from "@/clients/repositories/clients.repository";
import { NotFoundError } from "@/common/domain/erros/not-found-error";
import { inject, injectable } from "tsyringe";
import { Repository } from "typeorm";

@injectable()
export class ClientsTypeormRepository implements ClientsRepository {
  constructor(
    @inject("ClientsDefaultTypeormRepository")
    private clientsRepository: Repository<ClientsModel>
  ) {}

  async findByUsername(username: string): Promise<ClientsModel> {
    const client = await this.clientsRepository.findOneBy({ username });

    if (!client) {
      throw new NotFoundError(`Client not found using username: ${username}`);
    }

    return client;
  }

  async listAll(): Promise<ClientsModel[]> {
    return this.clientsRepository.find();
  }

  create(props: CreateClientsProps): ClientsModel {
    return this.clientsRepository.create(props);
  }

  async insert(model: ClientsModel): Promise<ClientsModel> {
    return this.clientsRepository.save(model);
  }
  async findById(id: string): Promise<ClientsModel> {
    return this._get(id);
  }

  async update(model: ClientsModel): Promise<ClientsModel> {
    await this._get(model.id);

    await this.clientsRepository.update({ id: model.id }, model);

    return model;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);

    await this.clientsRepository.delete(id);
  }

  protected async _get(id: string): Promise<ClientsModel> {
    const client = await this.clientsRepository.findOneBy({ id });

    if (!client) {
      throw new NotFoundError(`Client not found using ID ${id}`);
    }

    return client;
  }
}
