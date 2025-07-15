import { inject, injectable } from "tsyringe";
import { ProductOutput } from "../dtos/product-output.dtoo";
import { ProductsRepository } from "@/products/repositories/products.repository";
import { CategoriesRepository } from "@/categories/repositories/categories.repository";
import { NotFoundError } from "@/common/domain/erros/not-found-error";
import { ClientsRepository } from "@/clients/repositories/clients.repository";
import { sendMessage } from "@/common/infrastructure/producer/sendMessage";
export namespace UpdateProductsUseCase {
  export type Input = {
    id: string;
    name?: string;
    description?: string;
    sku?: string;
    price?: number;
    quantity?: number;
    category_id?: string;
  };

  export type Output = ProductOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ProductRepository")
      private productsRepository: ProductsRepository,

      @inject("CategoryRepository")
      private categoriesRepository: CategoriesRepository,

      @inject("ClientRepository")
      private clientsRepository: ClientsRepository
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

      if (input.price) {
        product.price = input.price;
      }

      if (input.quantity) {
        product.quantity = input.quantity;
      }

      if (input.category_id) {
        const category = await this.categoriesRepository.findById(
          input.category_id
        );

        product.sku = `${product.name.slice(0, 3)}${category.name.slice(0, 3)}${
          input.sku
        }`;
      }

      const updatedProduct = await this.productsRepository.update(product);

      return updatedProduct;
    }
  }
}
