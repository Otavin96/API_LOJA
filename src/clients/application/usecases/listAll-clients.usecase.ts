import { ClientsRepository } from "@/clients/repositories/clients.repository";
import { inject, injectable } from "tsyringe";
import { ClientOutput } from "../dtos/client-output.dto";

export namespace ListAllClientsUseCase {
  export type Output = ClientOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ClientRepository")
      private clientsRepository: ClientsRepository
    ) {}

    async execute(): Promise<Output[]> {
      return this.clientsRepository.listAll();
    }
  }
}
