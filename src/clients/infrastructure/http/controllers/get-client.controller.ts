import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { GetClientsUseCase } from "@/clients/application/usecases/get-clients.usecase";

export async function getClientController(
  request: Request,
  response: Response
) {
  const getClientParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(getClientParamsSchema, request.params);

  container.resolve("ClientRepository");

  const getClientsUseCase: GetClientsUseCase.UseCase =
    container.resolve("GetClientsUseCase");

  const client = await getClientsUseCase.execute({ id });

  response.status(200).json(client);
}
