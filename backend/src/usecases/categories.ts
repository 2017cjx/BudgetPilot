import { CategoryRepository } from '../repositories/categories';
import { ICategory } from '../models/categories';

export class CategoryUsecases {
  static async createCategory (category: ICategory) {
    return await CategoryRepository.create(category);
  }

  static async getCategories () {
    return await CategoryRepository.getAll();
  }

  static async getCategoryById (categoryId: string) {
    return await CategoryRepository.getById(categoryId);
  }

  static async updateCategory (categoryId: string, categoryName: ICategory) {
    return await CategoryRepository.update(categoryId, categoryName);
  }

  static async deleteCategory (categoryId: string) {
    return await CategoryRepository.delete(categoryId);
  }
}