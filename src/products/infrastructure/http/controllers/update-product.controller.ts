import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { UpdateProductsUseCase } from "@/products/application/usecases/update-products.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function updateProductController(
  request: Request,
  response: Response
) {
  const updateProductSchemaParam = z.object({
    id: z.string(),
  });

  const updateCategorySchemaBody = z.object({
    name: z.string().optional(),
    description: z.string().optional(),
    price: z.coerce.number().optional(),
    quantity: z.coerce.number().optional(),
    category_id: z.string().optional()
  });

  const { id } = dataValidation(updateProductSchemaParam, request.params);

  const { name, description, price, quantity, category_id } = dataValidation(
    updateCategorySchemaBody,
    request.body
  );

  const files = request.files as Express.Multer.File[];

  let images

  if (files) {
    images = files.map((file) => ({
      filename: file.originalname,
      filetype: file.mimetype,
      filesize: file.size,
      body: file.buffer,
    }));
  }

  const sku = String(Math.floor(Math.random() * 1000));

  const updateProductsUseCase: UpdateProductsUseCase.UseCase =
    container.resolve("UpdateProductsUseCase");

  const product = await updateProductsUseCase.execute({
    id,
    name,
    sku,
    description,
    price,
    quantity,
    category_id,
    images,
  });

  response.status(200).json(product);
}
