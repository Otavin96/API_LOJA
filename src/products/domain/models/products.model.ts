import { Category } from "@/categories/infrastructure/typeorm/entities/category.entities";

export interface ProductsModel {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  images: string[];
  quantity?: number;
  category_id: Category;
  created_at: Date;
  updated_at: Date;
}
