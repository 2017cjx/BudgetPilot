import Expenses, { IExpense } from '../models/expenses';
import { ErrorResponse } from '../utils/errorResponse';

export class ExpensesRepository {
  static async create (expenseData: IExpense) {
    const expense: IExpense = new Expenses({
      amount: expenseData.amount,
      description: expenseData.description,
      categoryId: expenseData.categoryId,
      date: expenseData.date,
      userId: expenseData.userId
    });

    try {
      const newExpense = await expense.save();
      return newExpense;
    } catch (error) {
      throw new ErrorResponse('Error creating expense', 500);
    }
  }

  static async getAll (userId: string) {
    try {
      const expenses = await Expenses.find({ userId });
      return expenses;
    } catch (error) {
      throw new ErrorResponse('Error fetching expenses', 500);
    }
  }

  static async getById (id: string, userId: string) {
    try {
      const expense = await Expenses.findOne({ _id: id, userId });
      if (!expense) {
        throw new ErrorResponse('Expense not found', 404);
      }
      return expense;
    } catch (error) {
      throw new ErrorResponse('Error fetching expense', 500);
    }
  }

  static async getByCategory (category: string, userId: string) {
    try {
      const expenses = await Expenses.find({ category, userId });
      if (expenses.length === 0) {
        throw new ErrorResponse('No expenses found for this category', 404);
      }
      return expenses;
    }
    catch (error) {
      throw new ErrorResponse('Error fetching expenses by category', 500);
    }
  }

  static async getByUserId (userId: string) {
    try {
      const expenses = await Expenses.find({ userId });
      if (expenses.length === 0) {
        throw new ErrorResponse('No expenses found for this user', 404);
      }
      return expenses;
    }
    catch (error) {
      throw new ErrorResponse('Error fetching expenses by user ID', 500);
    }
  }

  static async update (id: string, userId: string, updateData: Partial<IExpense>) {
    try {
      const updatedExpense = await Expenses.findOneAndUpdate(
        { _id: id, userId },
        updateData,
        { new: true }
      );
      if (!updatedExpense) {
        throw new ErrorResponse('Expense not found', 404);
      }
      return updatedExpense;
    } catch (error) {
      throw new ErrorResponse('Error updating expense', 500);
    }
  }

  static async delete (id: string, userId: string) {
    try {
      const deletedExpense = await Expenses.findOneAndDelete({ _id: id, userId });
      if (!deletedExpense) {
        throw new ErrorResponse('Expense not found', 404);
      }
      return deletedExpense;
    } catch (error) {
      throw new ErrorResponse('Error deleting expense', 500);
    }
  }
}