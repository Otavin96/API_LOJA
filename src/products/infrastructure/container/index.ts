import { container } from "tsyringe";
import { ProductsTypeormRepository } from "../typeorm/repositories/products-typeorm.repository";
import { dataSource } from "@/common/infrastructure/typeorm";
import { Product } from "../typeorm/entities/products.entities";
import { CreateProductsUseCase } from "@/products/application/usecases/create_products.usecase";
import { ListAllProductsUseCase } from "@/products/application/usecases/listAll-products.usecase";
import { GetProductsUseCase } from "@/products/application/usecases/get-products.usecase";
import { UpdateProductsUseCase } from "@/products/application/usecases/update-products.usecase";
import { DeleteProductsUseCase } from "@/products/application/usecases/delete-products.usecase";
import { ListProductByCategoryUseCase } from "@/products/application/usecases/listProductsByCategory.usecase";
import { SearchProductsUseCase } from "@/products/application/usecases/search-products.usecase";

container.registerSingleton("ProductRepository", ProductsTypeormRepository);

container.registerInstance(
  "ProductsDefaultTypeormRepository",
  dataSource.getRepository(Product)
);

container.registerSingleton(
  "CreateProductsUseCase",
  CreateProductsUseCase.UseCase
);

container.registerSingleton(
  "ListAllProductsUseCase",
  ListAllProductsUseCase.UseCase
);

container.registerSingleton(
  "ListProductByCategoryUseCase",
  ListProductByCategoryUseCase.UseCase
);

container.registerSingleton("GetProductsUseCase", GetProductsUseCase.UseCase);

container.registerSingleton(
  "UpdateProductsUseCase",
  UpdateProductsUseCase.UseCase
);

container.registerSingleton(
  "DeleteProductsUseCase",
  DeleteProductsUseCase.UseCase
);

container.registerSingleton(
  "SearchProductsUseCase",
  SearchProductsUseCase.UseCase
);
