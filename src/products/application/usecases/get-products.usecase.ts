import { inject, injectable } from "tsyringe";
import { ProductOutput } from "../dtos/product-output.dtoo";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { ProductsRepository } from "@/products/repositories/products.repository";

export namespace GetProductsUseCase {
  export type Input = {
    id: string;
  };

  export type Output = ProductOutput;

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

      return this.productsRepository.findById(input.id);
    }
  }
}
