import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";
import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { GetClientsUseCase } from "@/clients/application/usecases/get-clients.usecase";
import { GetEmailClientsUseCase } from "@/clients/application/usecases/getEmail-clients.usecase";

export async function getEmailClientController(
  request: Request,
  response: Response
) {
  const getEMailClientParamsSchema = z.object({
    email: z.string(),
  });

  const { email } = dataValidation(getEMailClientParamsSchema, request.params);

  container.resolve("ClientRepository");

  const getEmailClientsUseCase: GetEmailClientsUseCase.UseCase =
    container.resolve("GetEmailClientsUseCase");

  const client = await getEmailClientsUseCase.execute({ email });

  response.status(200).json(client);
}
