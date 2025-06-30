import { ExpenseUseCase } from "../usecases/expense";
import { ErrorResponse } from "../utils/errorResponse";
import { appResponse } from "../utils/appResponse";
import { expenseSchema } from "../validator/expense";
import asyncHandler from "../middlewares/async";

export const createExpense = asyncHandler(async (req, res, next) => {
  const userId = req.user?.id;

  if (!userId) {
    return next(new ErrorResponse("User ID is required", 400));
  }

  const { error, value } = expenseSchema.validate(req.body);

  if (error) {
    throw next(new ErrorResponse(error.details[0].message, 400));
  }

  const { amount, description, categoryId, date } = value;

  const expenseData: any = {
    amount,
    description,
    categoryId,
    date,
    userId
  };

  const expense = await ExpenseUseCase.createExpense(expenseData);

  return appResponse(res, 201, "Expense created successfully", expense);
});

export const getAllExpenses = asyncHandler(async (req, res, next) => {
  
})