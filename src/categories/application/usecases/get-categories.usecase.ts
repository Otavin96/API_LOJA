import { inject, injectable } from "tsyringe";
import { CategoryOutput } from "../dtos/category-output.dto";
import { CategoriesRepository } from "@/categories/repositories/categories.repository";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";

export namespace GetCategoriesUseCase {
  export type Input = {
    id: string;
  };

  export type Output = CategoryOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("CategoryRepository")
      private categoriesRepository: CategoriesRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.id) {
        throw new BadRequestError("Input data not provided or invalid");
      }

      return this.categoriesRepository.findById(input.id);
    }
  }
}
