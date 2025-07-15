import { ListAllCategoriesUseCase } from "@/categories/application/usecases/listAll-categories.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";

export async function listAllCategoryController(
  request: Request,
  response: Response
) {
  container.resolve("CategoryRepository");

  const listAllCategoriesUseCase: ListAllCategoriesUseCase.UseCase =
    container.resolve("ListAllCategoryUseCase");

  const category = await listAllCategoriesUseCase.execute();

  response.status(200).json(category);
}
