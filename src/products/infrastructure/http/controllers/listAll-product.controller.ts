import { ListAllProductsUseCase } from "@/products/application/usecases/listAll-products.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export async function listAllProductController(
  request: Request,
  response: Response
) {
  container.resolve("ProductRepository");

  const listAllProductsUseCase: ListAllProductsUseCase.UseCase =
    container.resolve("ListAllProductsUseCase");

  const product = await listAllProductsUseCase.execute();

  response.status(200).json(product);
}
