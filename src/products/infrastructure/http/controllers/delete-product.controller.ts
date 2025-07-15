import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { DeleteProductsUseCase } from "@/products/application/usecases/delete-products.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function deleteProductController(
  request: Request,
  response: Response
) {
  const deleteProductSchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(deleteProductSchemaParams, request.params);

  container.resolve("ProductRepository");

  const deleteProductsUseCase: DeleteProductsUseCase.UseCase =
    container.resolve("DeleteProductsUseCase");

  await deleteProductsUseCase.execute({ id });

  response
    .status(200)
    .json([{ message: "Produto deletado com sucesso!!" }, { id: id }]);
}
