import { CategoriesModel } from "@/categories/domain/models/categories.model";
import { CategoriesRepository } from "@/categories/repositories/categories.repository";
import { ConflictError } from "@/common/domain/erros/conflict-error";
import { NotFoundError } from "@/common/domain/erros/not-found-error";
import { InMemoryRepository } from "@/common/domain/repositories/in-memory.repository";

export class CategoriesInMemoryRepository
  extends InMemoryRepository<CategoriesModel>
  implements CategoriesRepository
{
  async listAll(): Promise<CategoriesModel[]> {
    return this.items;
  }

  async conflictingName(name: string): Promise<void> {
    const category = this.items.find((item) => item.name === name);

    if (category) {
      throw new ConflictError("Name already used on another category");
    }
  }

  async findByName(name: string): Promise<CategoriesModel> {
    const category = this.items.find((item) => item.name === name);

    if (!category) {
      throw new NotFoundError(`Category not found using name ${name}`);
    }

    return category;
  }
}
