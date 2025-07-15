import { inject, injectable } from "tsyringe";
import { ClientOutput } from "../dtos/client-output.dto";
import { ClientsRepository } from "@/clients/repositories/clients.repository";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { BcryptjsHashProvider } from "@/common/infrastructure/providers/hash-provider/bcryptjs-hash.provider";
import { HashProvider } from "@/common/domain/providers/hash-provider";
import { StatusPermission } from "@/clients/domain/models/clients.model";

export namespace CreateClientsUsecase {
  export type Input = {
    username: string;
    password: string;
    roles: StatusPermission
  };

  export type Output = ClientOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ClientRepository")
      private clientsRepository: ClientsRepository,

      @inject("HashProvider")
      private hashProvider: HashProvider
    ) {}

    async execute(input: Input): Promise<Output> {
      if (

        !input.username ||
        !input.password
      ) {
        throw new BadRequestError("Input data not provided or invalid");
      }

      const passwordHash = await this.hashProvider.generateHash(input.password);

      const client = this.clientsRepository.create(input);

      if(!client.roles) {
        client.roles = StatusPermission.CLIENT
      }

      Object.assign(client, { password: passwordHash });

      const createdClient: ClientOutput =
        await this.clientsRepository.insert(client);

      return createdClient;
    }
  }
}
