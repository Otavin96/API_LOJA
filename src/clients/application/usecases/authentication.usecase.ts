import { ClientsRepository } from "@/clients/repositories/clients.repository";
import { InvalidCredentialsError } from "@/common/domain/erros/invalid-credentials-error";
import { HashProvider } from "@/common/domain/providers/hash-provider";
import { inject, injectable } from "tsyringe";
import { ClientOutput } from "../dtos/client-output.dto";

export namespace AuthenticationUseCase {
  export type Input = {
    username: string;
    password: string;
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
      if (!input.username || !input.password) {
        throw new InvalidCredentialsError(
          "Credentials invalid. Email or Passwor not provided"
        );
      }

      const client = await this.clientsRepository.findByUsername(input.username);

      const passwordCompare = await this.hashProvider.compareHash(
        input.password,
        client.password
      );

      if (!passwordCompare) {
        throw new InvalidCredentialsError("Password invalid");
      }

      return client;
    }
  }
}
