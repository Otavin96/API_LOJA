import { container } from "tsyringe";
import { dataSource } from "@/common/infrastructure/typeorm";
import { Client } from "../typeorm/entities/clients.entities";
import { CreateClientsUsecase } from "@/clients/application/usecases/create-clients.usecase";
import { ClientsTypeormRepository } from "../typeorm/repositories/clients-typeorm.repository";
import { ListAllClientsUseCase } from "@/clients/application/usecases/listAll-clients.usecase";
import { GetClientsUseCase } from "@/clients/application/usecases/get-clients.usecase";
import { UpdateClientsUseCase } from "@/clients/application/usecases/update-clients.usecase";
import { DeleteClientsUseCase } from "@/clients/application/usecases/delete-clients.usecase";
import { AuthenticationUseCase } from "@/clients/application/usecases/authentication.usecase";

container.registerSingleton("ClientRepository", ClientsTypeormRepository);

container.registerSingleton(
  "CreateClientsUseCase",
  CreateClientsUsecase.UseCase
);

container.registerInstance(
  "ClientsDefaultTypeormRepository",
  dataSource.getRepository(Client)
);

container.registerSingleton(
  "ListAllClientsUseCase",
  ListAllClientsUseCase.UseCase
);

container.registerSingleton("GetClientsUseCase", GetClientsUseCase.UseCase);

container.registerSingleton(
  "UpdateClientsUseCase",
  UpdateClientsUseCase.UseCase
);

container.registerSingleton(
  "DeleteClientsUseCase",
  DeleteClientsUseCase.UseCase
);

container.registerSingleton(
  "AuthenticationUseCase",
  AuthenticationUseCase.UseCase
);
