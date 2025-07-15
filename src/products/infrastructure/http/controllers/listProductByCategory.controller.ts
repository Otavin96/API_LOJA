import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { GetProductsUseCase } from "@/products/application/usecases/get-products.usecase";
import { ListProductByCategoryUseCase } from "@/products/application/usecases/listProductsByCategory.usecase";

export async function listProductByCategoryController(
  request: Request,
  response: Response
) {
  const listProductByCategoryParamsSchema = z.object({
    category_id: z.string(),
  });

  const { category_id } = dataValidation(listProductByCategoryParamsSchema, request.params);

  container.resolve("ProductRepository");

  const listProductByCategoryUseCase: ListProductByCategoryUseCase.UseCase =
    container.resolve("ListProductByCategoryUseCase");

  const products = await listProductByCategoryUseCase.execute({ category_id });

  response.status(200).json(products);
}
