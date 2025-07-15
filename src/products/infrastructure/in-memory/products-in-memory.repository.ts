import { ConflictError } from "@/common/domain/erros/conflict-error";
import { NotFoundError } from "@/common/domain/erros/not-found-error";
import { InMemoryRepository } from "@/common/domain/repositories/in-memory.repository";
import { ProductsModel } from "@/products/domain/models/products.model";
import { ProductsRepository } from "@/products/repositories/products.repository";

export class ProductsInMemoryRepository
  extends InMemoryRepository<ProductsModel>
  implements ProductsRepository
{
  async conflictingName(name: string): Promise<void> {
    const product = this.items.find((item) => item.name === name);

    if (product) {
      throw new ConflictError("Name already used on another product");
    }
  }

  async findByName(name: string): Promise<ProductsModel> {
    const product = this.items.find((item) => item.name === name);

    if (!product) {
      throw new NotFoundError(`Product not found using name ${name}`);
    }

    return product;
  }
}
