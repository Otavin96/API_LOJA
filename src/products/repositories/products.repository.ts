import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { ProductsModel } from "../domain/models/products.model";
import { Category } from "@/categories/infrastructure/typeorm/entities/category.entities";

export type CreateProductsProps = {
  name: string;
  description: string;
  sku: string;
  price: number;
  quantity?: number;
  images: string[];
  category_id: Category;
};

export interface ProductsRepository
  extends RepositoryInterface<ProductsModel, CreateProductsProps> {
  findByName(name: string): Promise<ProductsModel>;
  conflictingName(name: string): Promise<void>;
  listProductByCategory(category_id: Category): Promise<ProductsModel[]>;
}
