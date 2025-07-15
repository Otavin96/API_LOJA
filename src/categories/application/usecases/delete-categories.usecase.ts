import { CategoriesRepository } from "@/categories/repositories/categories.repository";
import { BadRequestError } from "@/common/domain/erros/badRequest-error";
import { inject, injectable } from "tsyringe";

export namespace DeleteCategoriesUseCase {
  export type Input = {
    id: string;
  };

  export type Output = void;

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

      return this.categoriesRepository.delete(input.id);
    }
  }
}
