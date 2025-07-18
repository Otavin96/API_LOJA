import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { dataValidation } from "@/common/infrastructure/validation/zod/index";
import { CreateProductsUseCase } from "@/products/application/usecases/create_products.usecase";
import { Request, Response } from "express";
import { container } from "tsyringe";
import { z } from "zod";

export async function createProductController(
  request: Request,
  response: Response
) {
  const createProductBodySchema = z.object({
    name: z.string(),
    description: z.string(),
    price: z.coerce.number().positive(),
    quantity: z.coerce.number().positive(),
    category_id: z.string().uuid(),
  });

  const { name, description, price, quantity, category_id } = dataValidation(
    createProductBodySchema,
    request.body
  );

  const files = request.files as Express.Multer.File[] | undefined;

  console.log(files)

  if (!files || files.length === 0) {
    throw new BadRequestError("At least one image must be uploaded.");
  }

  const images = files.map((file) => ({
    filename: file.originalname,
    filetype: file.mimetype,
    filesize: file.size,
    body: file.buffer,
  }));

  const sku = Math.floor(Math.random() * 1000).toString();

  const createProductsUseCase: CreateProductsUseCase.UseCase =
    container.resolve("CreateProductsUseCase");

  const product = await createProductsUseCase.execute({
    name,
    description,
    sku,
    price,
    quantity,
    category_id,
    images,
  });

  response.status(201).json(product);
}
