import { Request, Response } from "express";
import { container } from "tsyringe";
import { CreateCategoryUseCase } from "@/categories/application/usecases/create-categories.usecase";
import { z } from "zod";

export async function createCategoryController(
  request: Request,
  response: Response
): Promise<Response> {
  // Retorna Response explicitamente
  try {
    const createCategoryBodySchema = z.object({
      name: z.string(),
      description: z.string(),
    });

    const { name, description } = createCategoryBodySchema.parse(request.body); // Usando parse direto

    container.resolve("CategoryRepository");
    const createCategoryUseCase: CreateCategoryUseCase.UseCase =
      container.resolve("CreateCategoryUseCase");
    const category = await createCategoryUseCase.execute({ name, description });

    return response.status(201).json(category);
  } catch (error) {
    console.error(error);
    return response.status(500).json({ message: "Internal Server Error" });
  }
}
