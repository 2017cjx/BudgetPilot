import asyncHandler from "../middlewares/async";
import { CategoryUsecases } from "../usecases/categories";
import { appResponse } from "../utils/appResponse";
import { ErrorResponse } from "../utils/errorResponse";
import { categorySchema } from "../validator/category";

export const createCategory = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;
  
  if (!userId) {
    return next(new ErrorResponse("User ID is required", 400));
  }

  const { error, value } = categorySchema.validate(req.body);

  if (error) {
    throw next(new ErrorResponse(error.details[0].message, 400));
  }

  const { categoryName } = value;

  const categoryData: any = {
    categoryName,
    userId
  }

  const category = await CategoryUsecases.createCategory(categoryData);

  return appResponse(res, 201, "Category created successfully", category);
});

export const getAllCategories = asyncHandler(async (req, res, next) => { 
  const userId = req.user?.id;

  if (!userId) {
    return next(new ErrorResponse("User ID is required", 400));
  }

  const categories = await CategoryUsecases.getCategories();

  return appResponse(res, 200, "Categories retrieved successfully", categories);
});

export const getCategoryById = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;
  const categoryId = req.params.id;

  if (!userId) {
    return next(new ErrorResponse("User ID is required", 400));
  }

  if (!categoryId) {
    return next(new ErrorResponse("Category ID is required", 400));
  }

  const category = await CategoryUsecases.getCategoryById(categoryId);

  if (!category) {
    return next(new ErrorResponse("Category not found", 404));
  }

  return appResponse(res, 200, "Category retrieved successfully", category);
});

