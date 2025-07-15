import { inject, injectable } from "tsyringe";
import { CategoryOutput } from "../dtos/category-output.dto";
import { CategoriesRepository } from "@/categories/repositories/categories.repository";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";

export namespace UpdateCategoriesUseCase {
  export type Input = {
    id: string;
    name: string;
    description: string;
  };

  export type Output = CategoryOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("CategoryRepository")
      private categoriesRepository: CategoriesRepository
    ) {}

    async execute(input: Input): Promise<Output> {
      let category = await this.categoriesRepository.findById(input.id);

      if (input.name) {
        category.name = input.name;
      }

      if (input.description) {
        category.description = input.description;
      }

      const updatedCategory = await this.categoriesRepository.update(category);

      return updatedCategory;
    }
  }
}
