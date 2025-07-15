import { UpdateCategoriesUseCase } from "@/categories/application/usecases/update-categories.usecase";
import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function updateCategoryController(
  request: Request,
  response: Response
) {
  const updateCategorySchemaParam = z.object({
    id: z.string(),
  });

  const updateCategorySchemaBody = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
  });

  const { id } = dataValidation(updateCategorySchemaParam, request.params);

  const { name, description } = dataValidation(
    updateCategorySchemaBody,
    request.body
  );

  container.resolve("CategoryRepository");

  const updateCategoriesUseCase: UpdateCategoriesUseCase.UseCase =
    container.resolve("UpdateCategoriesUseCase");

  const category = await updateCategoriesUseCase.execute({
    id,
    name,
    description,
  });

  response.status(200).json(category);
}
