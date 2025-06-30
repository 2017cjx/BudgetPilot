import Category, { ICategory } from "../models/categories";

export class CategoryRepository {

    static async getAll(): Promise<ICategory[]> {
      return Category.find();
    }

    static async getById(id: string): Promise<ICategory | null> {
      return Category.findById(id);
    }

    static async create(category: ICategory): Promise<ICategory> {
      const newCategory = Category.create({
        categoryName: category.categoryName,
        userId: category.userId
      });

      return newCategory;
    }

    static async update(id: string, updatedCategory: ICategory): Promise<ICategory | null> {
      const updated = await Category.findByIdAndUpdate(
        id,
        {
          categoryName: updatedCategory.categoryName,
          userId: updatedCategory.userId
        },
        { new: true }
      );
      return updated;
    }

    static async delete(id: string) {
      const result = await Category.findByIdAndDelete(id);
      return result;
    }
}