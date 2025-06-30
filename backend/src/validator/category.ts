import Joi from "joi";

export const categorySchema = Joi.object({
  categoryName: Joi.string()
    .min(3)
    .max(30)
    .required()
    .messages({
      "string.base": "Category name must be a string",
      "string.empty": "Category name cannot be empty",
      "string.min": "Category name must be at least 3 characters long",
      "string.max": "Category name must not exceed 30 characters",
      "any.required": "Category name is required"
    })
});