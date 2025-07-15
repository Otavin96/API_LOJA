import { inject, injectable } from "tsyringe";
import { ProductOutput } from "../dtos/product-output.dtoo";
import { ProductsRepository } from "@/products/repositories/products.repository";

export namespace ListAllProductsUseCase {
  export type Output = ProductOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ProductRepository")
      private productsRepository: ProductsRepository
    ) {}

    async execute(): Promise<Output[]> {
      return this.productsRepository.listAll();
    }
  }
}
