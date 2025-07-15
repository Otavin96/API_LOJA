import { BadRequestError } from "@/common/domain/erros/badRequest-error";
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
      private productsRepository: ProductsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError("Input data not provided or invalid");
      }

      return this.productsRepository.delete(input.id);
    }
  }
}
