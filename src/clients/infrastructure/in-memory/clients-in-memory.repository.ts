import { ClientsModel } from "@/clients/domain/models/clients.model";
import { ClientsRepository } from "@/clients/repositories/clients.repository";
import { InMemoryRepository } from "@/common/domain/repositories/in-memory.repository";
import { NotFoundError } from "@/common/domain/erros/not-found-error";

export class ClientsInMemoryRepository
  extends InMemoryRepository<ClientsModel>
  implements ClientsRepository
{
  async authentication(email: string, password: string): Promise<void> {
    const client = this.items.find((item) => item.email === email);

    if (client?.email && client.password) {
      console.log("Usuário logado com sucesso!");
    }
  }
  findEmailsByProductId(productId: string): Promise<string[]> {
    throw new Error("Method not implemented.");
  }
  async findByEmail(email: string): Promise<ClientsModel> {
    const client = this.items.find((item) => item.email === email);

    if (!client) {
      throw new NotFoundError(`Client not found using email ${email}`);
    }

    return client;
  }
  async listAll(): Promise<ClientsModel[]> {
    return this.items;
  }
}
