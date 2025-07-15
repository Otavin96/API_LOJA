import { CategoriesModel } from "@/categories/domain/models/categories.model";
import {
  CategoriesRepository,
  CreateCategoriesProps,
} from "@/categories/repositories/categories.repository";
import { ConflictError } from "@/common/domain/erros/conflict-error";
import { NotFoundError } from "@/common/domain/erros/not-found-error";
import { SearchInput, SearchOutput } from "@/common/domain/repositories/repository.interface";
import { inject, injectable } from "tsyringe";
import { Repository } from "typeorm";

@injectable()
export class CategoriesTypeormRepository implements CategoriesRepository {
  constructor(
    @inject("CategoriesDefaultTypeormRepository")
    private categoriesRepository: Repository<CategoriesModel>
  ) {}
  search(props: SearchInput): Promise<SearchOutput<CategoriesModel>> {
    throw new Error("Method not implemented.");
  }

  async listAll(): Promise<CategoriesModel[]> {
    return this.categoriesRepository.find({});
  }

  // Encontrar categoria por nome
  async findByName(name: string): Promise<CategoriesModel> {
    const category = await this.categoriesRepository.findOneBy({ name }); // Adicionando await

    if (!category) {
      throw new NotFoundError(`Category not found using name ${name}`);
    }

    return category;
  }

  // Verificar se o nome já está em uso
  async conflictingName(name: string): Promise<void> {
    const category = await this.categoriesRepository.findOneBy({ name }); // Adicionando await

    if (category) {
      throw new ConflictError("Name already used on another category");
    }
  }

  // Criar categoria
  create(props: CreateCategoriesProps): CategoriesModel {
    return this.categoriesRepository.create(props);
  }

  // Inserir nova categoria
  async insert(model: CategoriesModel): Promise<CategoriesModel> {
    await this.conflictingName(model.name); // Verificando se o nome já está em uso

    return this.categoriesRepository.save(model); // Retorna a categoria salva, com id atribuído
  }

  // Encontrar categoria por ID
  async findById(id: string): Promise<CategoriesModel> {
    return this._get(id); // Buscando categoria pelo ID
  }

  // Atualizar categoria
  async update(model: CategoriesModel): Promise<CategoriesModel> {
    await this._get(model.id); // Verificando se a categoria existe

    await this.categoriesRepository.update({ id: model.id }, model); // Atualizando a categoria

    return model; // Retornando o modelo atualizado
  }

  // Deletar categoria
  async delete(id: string): Promise<void> {
    await this._get(id); // Verificando se a categoria existe

    await this.categoriesRepository.delete(id); // Deletando a categoria
  }

  // Método privado para buscar categoria por ID
  protected async _get(id: string): Promise<CategoriesModel> {
    // const category = await this.categoriesRepository.findOne({where: {id}, relations: ['']}, );
    const category = await this.categoriesRepository.findOneBy({ id }); // Adicionando await

    if (!category) {
      throw new NotFoundError(`Category not found using ID ${id}`);
    }

    return category;
  }
}
