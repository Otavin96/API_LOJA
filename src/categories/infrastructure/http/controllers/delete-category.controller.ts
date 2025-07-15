import { DeleteCategoriesUseCase } from "@/categories/application/usecases/delete-categories.usecase";
import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function deleteCategoryController(
  request: Request,
  response: Response
) {
  const deleteCategorySchemaParams = z.object({
    id: z.string(),
  });

  const { id } = dataValidation(deleteCategorySchemaParams, request.params);

  container.resolve("CategoryRepository");

  const deleteCategoryUsecase: DeleteCategoriesUseCase.UseCase =
    container.resolve("DeleteCategoriesUseCase");

  await deleteCategoryUsecase.execute({ id });

  response
    .status(200)
    .json([{ message: "Categoria deletada com sucesso!!" }, { id: id }]);
}
