import { RepositoryInterface } from "@/common/domain/repositories/repository.interface";
import { CategoriesModel } from "../domain/models/categories.model";

export type CreateCategoriesProps = {
  name: string;
  description: string;
};

export interface CategoriesRepository
  extends RepositoryInterface<CategoriesModel, CreateCategoriesProps> {
  findByName(name: string): Promise<CategoriesModel>;
  conflictingName(name: string): Promise<void>;
  listAll(): Promise<CategoriesModel[]>
}
