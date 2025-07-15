import { Category } from "@/categories/infrastructure/typeorm/entities/category.entities";
import { ConflictError } from "@/common/domain/erros/conflict-error";
import { NotFoundError } from "@/common/domain/erros/not-found-error";
import {
  SearchInput,
  SearchOutput,
} from "@/common/domain/repositories/repository.interface";
import { ProductsModel } from "@/products/domain/models/products.model";
import {
  CreateProductsProps,
  ProductsRepository,
} from "@/products/repositories/products.repository";
import { inject, injectable } from "tsyringe";
import { ILike, Repository } from "typeorm";

@injectable()
export class ProductsTypeormRepository implements ProductsRepository {
  sortableFields: string[] = ["name", "createdAt"];

  constructor(
    @inject("ProductsDefaultTypeormRepository")
    private productsRepository: Repository<ProductsModel>
  ) {}

  async listProductByCategory(category_id: Category): Promise<ProductsModel[]> {
    const products = await this.productsRepository.find({
      where: { category_id },
      relations: ["category_id"],
    });

    if (!products) {
      throw new NotFoundError(`Products not found using ${category_id}`);
    }

    return products;
  }

  async listAll(): Promise<ProductsModel[]> {
    return this.productsRepository.find({ relations: ["category_id"] });
  }

  async findByName(name: string): Promise<ProductsModel> {
    const product = await this.productsRepository.findOneBy({ name });

    if (!product) {
      throw new NotFoundError(`Product not found using name ${name}`);
    }

    return product;
  }

  async conflictingName(name: string): Promise<void> {
    const product = await this.productsRepository.findOneBy({ name });

    if (product) {
      throw new ConflictError(`Name already used on another product`);
    }
  }

  create(props: CreateProductsProps): ProductsModel {
    return this.productsRepository.create(props);
  }

  async insert(model: ProductsModel): Promise<ProductsModel> {
    await this.conflictingName(model.name);

    return this.productsRepository.save(model);
  }

  async findById(id: string): Promise<ProductsModel> {
    return this._get(id);
  }

  async update(model: ProductsModel): Promise<ProductsModel> {
    await this._get(model.id);

    await this.productsRepository.update({ id: model.id }, model);

    return model;
  }

  async delete(id: string): Promise<void> {
    await this._get(id);

    await this.productsRepository.delete(id);
  }

  async search(props: SearchInput): Promise<SearchOutput<ProductsModel>> {
    const validSort = this.sortableFields.includes(props.sort ?? "") || false;
    const dirOps = ["asc", "desc"];
    const validSortDir =
      (props.sort_dir && dirOps.includes(props.sort_dir.toLowerCase() ?? "")) ||
      false;
    const orderByField: string = validSort
      ? (props.sort ?? "createdAt")
      : "createdAt";
    const orderByDir = validSortDir ? props.sort_dir : "desc";

    const [products, total] = await this.productsRepository.findAndCount({
      ...(props.filter && { where: { name: ILike(props.filter) } }),
      order: { [orderByField]: orderByDir },
      skip: ((props.page ?? 1) - 1) * (props.per_page ?? 5),
      take: props.per_page,
    });

    return {
      items: products,
      per_page: props.per_page ?? 5,
      total,
      current_page: props.page ?? 1,
      sort: orderByField,
      sort_dir: orderByDir ?? "asc",
      filter: props.filter ?? null,
    };
  }

  protected async _get(id: string): Promise<ProductsModel> {
    const product = await this.productsRepository.findOne({
      where: { id },
      relations: ["category_id"],
    });

    if (!product) {
      throw new NotFoundError(`Product not found using ID ${id}`);
    }

    return product;
  }
}
