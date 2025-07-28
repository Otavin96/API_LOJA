import { ProductOutput } from "../dtos/product-output.dtoo";
import { inject, injectable } from "tsyringe";
import { ProductsRepository } from "@/products/repositories/products.repository";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { CategoriesRepository } from "@/categories/repositories/categories.repository";
import { LocalUploaderProvider } from "@/common/infrastructure/providers/storage-provider/local-uploader-provider";

export namespace CreateProductsUseCase {
  export type Input = {
    name: string;
    description: string;
    sku: string;
    price: number;
    quantity?: number;
    images: {
      filename: string;
      filesize: number;
      filetype: string;
      body: Buffer;
    }[];
    category_id: string;
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
      const { name, description, price, category_id, images, sku } = input;

      // Validação dos campos básicos
      if (!name) throw new BadRequestError("Product name is required");
      if (!description) throw new BadRequestError("Description is required");
      if (!category_id) throw new BadRequestError("Category is required");
      if (price <= 0) throw new BadRequestError("Price must be greater than 0");

      // Verifica se há imagens
      if (!images || images.length === 0) {
        throw new BadRequestError("At least one image is required");
      }

      // Validação das imagens
      for (const image of images) {
        if (!ACCEPTED_IMAGE_TYPES.includes(image.filetype)) {
          throw new BadRequestError(
            `.jpg, .jpeg, .png and .webp files are accepted. "${image.filename}" is invalid.`
          );
        }

        if (image.filesize > MAX_UPLOAD_SIZE) {
          throw new BadRequestError(
            `File "${image.filename}" exceeds the 3MB size limit.`
          );
        }
      }

      // Verifica se já existe nome conflitante
      await this.productsRepository.conflictingName(name);

      // Busca a categoria
      const category = await this.categoriesRepository.findById(category_id as unknown as string);
      if (!category) throw new BadRequestError("Category not found");

      // Geração do SKU
      const skuFinal =
        name.slice(0, 3).toUpperCase() +
        category.name.slice(0, 3).toUpperCase() +
        sku;

      // Faz upload de todas as imagens e coleta as URLs/paths
      const uploadedImageUrls: string[] = [];

      for (const image of images) {
        const imageUrl = await this.uploader.upload({
          filename: image.filename,
          filetype: image.filetype,
          body: image.body,
        });

        uploadedImageUrls.push(imageUrl);
      }

      // Criação do produto
      const product = this.productsRepository.create({
        name,
        description,
        price,
        sku: skuFinal,
        quantity: input.quantity,
        category_id,
        images: uploadedImageUrls,
      });

      const createdProduct = await this.productsRepository.insert(product);

      return createdProduct;
    }
  }
}
