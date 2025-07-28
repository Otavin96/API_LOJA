import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { LocalUploaderProvider } from "@/common/infrastructure/providers/storage-provider/local-uploader-provider";
import { ProductsRepository } from "@/products/repositories/products.repository";
import { inject, injectable } from "tsyringe";

export namespace DeleteProductsUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ProductRepository")
      private productsRepository: ProductsRepository,

      @inject("UploaderProvider")
      private uploader: LocalUploaderProvider
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError("Input data not provided or invalid");
      }

      const product = await this.productsRepository.findById(input.id);

      for (const imageUrl of product.images) {
        await this.uploader.delete(imageUrl as unknown as string);
      }

      return this.productsRepository.delete(input.id);
    }
  }
}
