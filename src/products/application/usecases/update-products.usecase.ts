import { inject, injectable } from "tsyringe";
import { ProductOutput } from "../dtos/product-output.dtoo";
import { ProductsRepository } from "@/products/repositories/products.repository";
import { CategoriesRepository } from "@/categories/repositories/categories.repository";
import { NotFoundError } from "@/common/domain/erros/not-found-error";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { LocalUploaderProvider } from "@/common/infrastructure/providers/storage-provider/local-uploader-provider";
export namespace UpdateProductsUseCase {
  export type Input = {
    id: string;
    name?: string;
    description?: string;
    sku?: string;
    price?: number;
    quantity?: number;
    images: {
      filename: string;
      filesize: number;
      filetype: string;
      body: Buffer;
    }[];
    category_id?: string;
  };

  export type Output = ProductOutput;

  export const MAX_UPLOAD_SIZE = 1024 * 1024 * 3; // 3MB

  export const ACCEPTED_IMAGE_TYPES = [
    "image/jpeg",
    "image/jpg",
    "image/png",
    "image/webp",
  ];

  @injectable()
  export class UseCase {
    constructor(
      @inject("ProductRepository")
      private productsRepository: ProductsRepository,

      @inject("CategoryRepository")
      private categoriesRepository: CategoriesRepository,

      @inject("UploaderProvider")
      private uploader: LocalUploaderProvider
    ) {}

    async execute(input: Input): Promise<Output> {
      let product = await this.productsRepository.findById(input.id);

      if (!product) {
        throw new NotFoundError("Product not found");
      }

      if (input.name) {
        product.name = input.name;
      }

      if (input.description) {
        product.description = input.description;
      }

      if (input.price !== undefined) {
        product.price = input.price;
      }

      if (input.quantity !== undefined) {
        product.quantity = input.quantity;
      }

      if (input.category_id) {
        const category = await this.categoriesRepository.findById(
          input.category_id
        );
        if (!category) {
          throw new NotFoundError("Category not found");
        }

        product.category_id = input.category_id;

        if (input.sku && product.name) {
          product.sku = `${product.name.slice(0, 3)}${category.name.slice(
            0,
            3
          )}${input.sku}`;
        }
      }

      // Atualiza imagens se houver novas
      if (input.images && input.images.length > 0) {
        // Exclui imagens antigas
        for (const imageUrl of product.images) {
          await this.uploader.delete(String(imageUrl));
        }

        // Faz upload das novas
        const uploadedImageUrls = [];
        for (const image of input.images) {
          if (!ACCEPTED_IMAGE_TYPES.includes(image.filetype)) {
            throw new BadRequestError(`Tipo inválido: ${image.filename}`);
          }
          if (image.filesize > MAX_UPLOAD_SIZE) {
            throw new BadRequestError(
              `Arquivo muito grande: ${image.filename}`
            );
          }

          const imageUrl = await this.uploader.upload(image);
          uploadedImageUrls.push(imageUrl);
        }

        product.images = uploadedImageUrls;
      }

      const updatedProduct = await this.productsRepository.update(product);

      return updatedProduct;
    }
  }
}
