import { ExpensesRepository } from '../repositories/expenses';
import { IExpense } from '../models/expenses';

export class ExpenseUseCase {
  static async createExpense(expense: IExpense) {
    try {
      const newExpense = await ExpensesRepository.create(expense);
      return newExpense;
    } catch (error) {
      throw error;
    }
  }

  static async getAllExpenses(userId: string) {
    try {
      const expenses = await ExpensesRepository.getAll(userId);
      return expenses;
    } catch (error) {
      throw error;
    }
  }

  static async getExpenseById(id: string, userId: string) {
    try {
      const expense = await ExpensesRepository.getById(id, userId);
      return expense;
    } catch (error) {
      throw error;
    }
  }

  static async getExpensesByCategory(category: string, userId: string) {
    try {
      const expenses = await ExpensesRepository.getByCategory(category, userId);
      return expenses;
    } catch (error) {
      throw error;
    }
  }

  static async getExpensesByUserId(userId: string) {
    try {
      const expenses = await ExpensesRepository.getByUserId(userId);
      return expenses;
    } catch (error) {
      throw error;
    }
  }
}