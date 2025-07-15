import { container } from "tsyringe";
import { CategoriesTypeormRepository } from "../typeorm/repositories/categories-typeorm.repository";
import { dataSource } from "@/common/infrastructure/typeorm";
import { Category } from "../typeorm/entities/category.entities";
import { CreateCategoryUseCase } from "@/categories/application/usecases/create-categories.usecase";
import { GetCategoriesUseCase } from "@/categories/application/usecases/get-categories.usecase";
import { ListAllCategoriesUseCase } from "@/categories/application/usecases/listAll-categories.usecase";
import { UpdateCategoriesUseCase } from "@/categories/application/usecases/update-categories.usecase";
import { DeleteCategoriesUseCase } from "@/categories/application/usecases/delete-categories.usecase";

container.registerSingleton("CategoryRepository", CategoriesTypeormRepository);

container.registerSingleton(
  "CreateCategoryUseCase",
  CreateCategoryUseCase.UseCase
);

container.registerSingleton("GetCategoryUseCase", GetCategoriesUseCase.UseCase);

container.registerSingleton(
  "ListAllCategoryUseCase",
  ListAllCategoriesUseCase.UseCase
);

container.registerSingleton(
  "UpdateCategoriesUseCase",
  UpdateCategoriesUseCase.UseCase
);

container.registerSingleton(
  "DeleteCategoriesUseCase",
  DeleteCategoriesUseCase.UseCase
);

container.registerInstance(
  "CategoriesDefaultTypeormRepository",
  dataSource.getRepository(Category)
);
