import Joi from 'joi';

export const registerUser = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required().messages({
    'string.email': 'Please provide a valid email address'
  }),
  password: Joi.string().min(8).required().messages({
    'string.min': 'Password must be at least 8 characters long',
    'any.required': 'Password is required'
  }),
})

export const loginUser = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().required()
})

export const resetPass = Joi.object({
  email: Joi.string().email().required(),
  newPassword: Joi.string().min(8).required(),
  confirmNewPassword: Joi.string().valid(Joi.ref('newPassword')).required()
}).messages({
  'any.only': 'New password and confirm password must match'
});

export const forgetPass = Joi.object({
  email: Joi.string().email().required()
}).messages({
  'string.email': 'Please provide a valid email address'
});