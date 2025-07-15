import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { GetProductsUseCase } from "@/products/application/usecases/get-products.usecase";

export async function getProductController(
  request: Request,
  response: Response
) {
  const getProductParamsSchema = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(getProductParamsSchema, request.params);

  container.resolve("ProductRepository");

  const getProductsUseCase: GetProductsUseCase.UseCase =
    container.resolve("GetProductsUseCase");

  const product = await getProductsUseCase.execute({ id });

  response.status(200).json(product);
}
