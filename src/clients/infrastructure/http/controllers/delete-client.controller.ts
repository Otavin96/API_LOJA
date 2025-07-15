import { DeleteClientsUseCase } from "@/clients/application/usecases/delete-clients.usecase";
import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function deleteClientController(
  request: Request,
  response: Response
) {
  const deleteClientSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(deleteClientSchemaParams, request.params);

  container.resolve("ClientRepository");

  const deleteClientsUseCase: DeleteClientsUseCase.UseCase = container.resolve(
    "DeleteClientsUseCase"
  );

  await deleteClientsUseCase.execute({ id });

  response
    .status(200)
    .json([{ message: "Cliente deletado com sucesso!!" }, { id: id }]);
}
