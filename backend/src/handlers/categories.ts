import asyncHandler from "../middlewares/async";
import { CategoryUsecases } from "../usecases/categories";
import { appResponse } from "../utils/appResponse";
import { ErrorResponse } from "../utils/errorResponse";
import { categorySchema } from "../validator/category";

export const createCategory = asyncHandler(async (req, res, next) => {
  const { error, value } = categorySchema.validate(req.body);

  if (error) {
    throw next(new ErrorResponse(error.details[0].message, 400));
  }

  const { categoryName } = value;

  const userId = req.user?.id;

  if (!userId) {
    return next(new ErrorResponse("User ID is required", 400));
  }

  const categoryData: any = {
    categoryName,
    userId
  }

  const category = await CategoryUsecases.createCategory(categoryData);

  return appResponse(res, 201, "Category created successfully", category);
});