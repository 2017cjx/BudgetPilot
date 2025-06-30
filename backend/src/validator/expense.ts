import Joi from 'joi';

export const expenseSchema = Joi.object({
  amount: Joi.number().required().messages({
    'number.base': 'Amount must be a number',
    'any.required': 'Amount is required'
  }),
  description: Joi.string().max(255).required().messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description must not exceed 255 characters',
    'any.required': 'Description is required'
  }),
  categoryId: Joi.string().required().messages({
    'string.base': 'Category ID must be a string',
    'any.required': 'Category ID is required'
  }),
  date: Joi.date().required().messages({
    'date.base': 'Date must be a valid date',
    'any.required': 'Date is required'
  }),
  userId: Joi.string().required().messages({
    'string.base': 'User ID must be a string',
    'any.required': 'User ID is required'
  })
});

export const updateExpenseSchema = Joi.object({
  amount: Joi.number().optional().messages({
    'number.base': 'Amount must be a number'
  }),
  description: Joi.string().max(255).optional().messages({
    'string.base': 'Description must be a string',
    'string.max': 'Description must not exceed 255 characters'
  }),
  categoryId: Joi.string()
    .optional()
    .messages({
      'string.base': 'Category ID must be a string'
    }),
  date: Joi.date().optional().messages({
    'date.base': 'Date must be a valid date'
  }),
  userId: Joi.string().optional().messages({
    'string.base': 'User ID must be a string'
  })
});

export const getExpenseByIdSchema = Joi.object({
  id: Joi.string().required().messages({
    'string.base': 'ID must be a string',
    'any.required': 'ID is required'
  }),
  userId: Joi.string().required().messages({
    'string.base': 'User ID must be a string',
    'any.required': 'User ID is required'
  })
});

export const getExpensesByCategorySchema = Joi.object({
  category: Joi.string().required().messages({
    'string.base': 'Category must be a string',
    'any.required': 'Category is required'
  }),
  userId: Joi.string().required().messages({
    'string.base': 'User ID must be a string',
    'any.required': 'User ID is required'
  })
});

export const getExpensesByUserIdSchema = Joi.object({
  userId: Joi.string().required().messages({
    'string.base': 'User ID must be a string',
    'any.required': 'User ID is required'
  })
});