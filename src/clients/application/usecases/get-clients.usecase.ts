import { inject, injectable } from "tsyringe";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { ClientOutput } from "../dtos/client-output.dto";
import { ClientsRepository } from "@/clients/repositories/clients.repository";

export namespace GetClientsUseCase {
  export type Input = {
    id: string;
  };

  export type Output = ClientOutput;

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

      return this.clientsRepository.findById(input.id);
    }
  }
}
