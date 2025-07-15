import { inject, injectable } from "tsyringe"
import { CategoryOutput } from "../dtos/category-output.dto"
import { CategoriesRepository } from "@/categories/repositories/categories.repository"
import { BadRequestError } from "@/common/domain/erros/badRequest-error"


export namespace CreateCategoryUseCase {
  export type Input = {
    name: string
    description: string
  }

  export type Output = CategoryOutput

  @injectable()
  export class UseCase {
    constructor(
      @inject('CategoryRepository')
      private categoriesRepository: CategoriesRepository,
    ) {}

    async execute(input: Input): Promise<Output> {
      if (!input.name || !input.description) {
        throw new BadRequestError('Input data not provided or invalid')
      }

      await this.categoriesRepository.conflictingName(input.name)

      const category = this.categoriesRepository.create(input)
      const CreatedCategory: CategoryOutput =
        await this.categoriesRepository.insert(category)

      return CreatedCategory
    }
  }
}