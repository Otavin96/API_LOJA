import { randomUUID } from "node:crypto";
import { RepositoryInterface } from "./repository.interface";
import { NotFoundError } from "../erros/not-found-error";

export type ModelProps = {
  id?: string;
  [key: string]: any;
};

export type CreateProps = {
  [key: string]: any;
};

export abstract class InMemoryRepository<Model extends ModelProps>
  implements RepositoryInterface<Model, CreateProps>
{
  items: Model[] = [];
  sortableFields: string[] = [];

  create(props: CreateProps): Model {
    const model = {
      id: randomUUID(),
      created_at: new Date(),
      updated_at: new Date(),
      ...props,
    };

    return model as unknown as Model;
  }

  async insert(model: Model): Promise<Model> {
    this.items.push(model);

    return model;
  }

  async listAll(): Promise<Model[]> {
    return this.items;
  }

  async findById(id: string): Promise<Model> {
    return this._get(id);
  }
  async update(model: Model): Promise<Model> {
    await this._get(model.id as unknown as string);

    const index = this.items.findIndex((item) => item.id === model.id);
    this.items[index] = model;

    return model;
  }
  async delete(id: string): Promise<void> {
    await this._get(id);
    const index = this.items.findIndex((item) => item.id === id);
    this.items.splice(index, 1);
  }

  protected async _get(id: string): Promise<Model> {
    const model = this.items.find((item) => item.id === id);

    if (!model) {
      throw new NotFoundError(`Model not found using ID ${id}`);
    }

    return model;
  }
}
