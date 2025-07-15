import { inject, injectable } from "tsyringe";
import { CategoryOutput } from "../dtos/category-output.dto";
import { CategoriesRepository } from "@/categories/repositories/categories.repository";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";

export namespace ListAllCategoriesUseCase {
  export type Output = CategoryOutput;

  @injectable()
  export class UseCase {
    constructor(
      @inject("CategoryRepository")
      private categoriesRepository: CategoriesRepository
    ) {}

    async execute(): Promise<Output[]> {
      return this.categoriesRepository.listAll();
    }
  }
}
