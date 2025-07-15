import { ListAllClientsUseCase } from "@/clients/application/usecases/listAll-clients.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export async function listAllClientController(
  request: Request,
  response: Response
) {
  container.resolve("ClientRepository");

  const ListAllClientsUseCase: ListAllClientsUseCase.UseCase =
    container.resolve("ListAllClientsUseCase");

  const client = await ListAllClientsUseCase.execute();

  response.status(200).json(client);
}
