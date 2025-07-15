import { ClientsRepository } from "@/clients/repositories/clients.repository";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { inject, injectable } from "tsyringe";

export namespace DeleteClientsUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ClientRepository")
      private clientsRepository: ClientsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError("Input data not provided or invalid");
      }

      return this.clientsRepository.delete(input.id);
    }
  }
}
