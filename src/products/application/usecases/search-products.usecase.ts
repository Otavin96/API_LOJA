import { SearchInputDto } from "../dtos/search-input.dto";
import {
  PaginationOutputDto,
  PaginationOutputMapper,
} from "../dtos/pagination-output.dto";
import { ProductsModel } from "@/products/domain/models/products.model";
import { inject, injectable } from "tsyringe";
import { ProductsRepository } from "@/products/repositories/products.repository";

export namespace SearchProductsUseCase {
  export type Input = SearchInputDto;

  export type Output = PaginationOutputDto<ProductsModel>;

  @injectable()
  export class UseCase {
    constructor(
      @inject("ProductRepository")
      private productsRepository: ProductsRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      const searchResult = await this.productsRepository.search(input);
      return PaginationOutputMapper.toOutput(searchResult.items, searchResult);
    }
  }
}
