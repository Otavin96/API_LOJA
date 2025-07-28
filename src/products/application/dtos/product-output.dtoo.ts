import { Category } from "@/categories/infrastructure/typeorm/entities/category.entities";

export type ProductOutput = {
  id: string;
  name: string;
  sku: string;
  description: string;
  price: number;
  quantity?: number;
  images: string[];
  category_id: string;
  created_at: Date;
  updated_at: Date;
};
