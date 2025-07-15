import { inject, injectable } from "tsyringe";
import { ClientOutput } from "../dtos/client-output.dto";
import { ClientsRepository } from "@/clients/repositories/clients.repository";

export namespace UpdateClientsUseCase {
  export type Input = {
    id: string;
    username: string;
  };

  export type Output = ClientOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ClientRepository")
      private clientsRepository: ClientsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      let client = await this.clientsRepository.findById(input.id);

      if (input.username) {
        client.username = input.username;
      }

      const updatedClient = await this.clientsRepository.update(client);

      return updatedClient;
    }
  }
}
